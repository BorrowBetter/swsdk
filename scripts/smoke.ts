/**
 * Smoke test for the Spinwheel SDK.
 *
 * Run with: npm run smoke
 * Requires: SPINWHEEL_API_KEY in .env or environment
 */

import "dotenv-flow/config";
import { SpinwheelSDK } from "../src/index";

function getApiKey(): string {
	const key = process.env.SPINWHEEL_API_KEY;
	if (!key) throw new Error("SPINWHEEL_API_KEY is not set");
	return key;
}

async function main() {
	console.log("=".repeat(60));
	console.log("Spinwheel SDK Smoke Test");
	console.log("=".repeat(60));

	const sdk = new SpinwheelSDK({
		apiKey: getApiKey(),
		sandbox: true,
	});

	const extUserId = `smoke-${crypto.randomUUID()}`;
	const today = new Date().toISOString().split("T")[0] as string;

	// 1. Connect user
	console.log("\n[1] Connecting user (preverified phone)...");
	console.log(`    extUserId: ${extUserId}`);

	const connectResult = await sdk.connect.preverifiedPhone({
		phoneNumber: "+14084567890",
		dateOfBirth: "1990-01-01",
		extUserId,
		audit: {
			verificationDate: today,
			userConsentDate: today,
			verificationType: "SMS",
		},
	});

	console.log(
		`    Status: ${connectResult.status.code} — ${connectResult.status.desc}`,
	);

	if (connectResult.status.code >= 400) {
		console.error("    FAILED:", connectResult.status.messages);
		process.exit(1);
	}

	const userId = connectResult.data.userId;
	console.log(`    userId: ${userId}`);

	// 2. Fetch user (initial state)
	console.log("\n[2] Fetching user (initial state)...");
	const initialUser = await sdk.userManagement.get({ userId });
	console.log(
		`    Status: ${initialUser.status.code} — ${initialUser.status.desc}`,
	);
	console.log(`    isBorrower: ${initialUser.data.isBorrower}`);
	if (initialUser.data.profile) {
		const { firstName, lastName, creditScore } = initialUser.data.profile;
		console.log(`    Profile: ${firstName ?? "N/A"} ${lastName ?? "N/A"}`);
		console.log(`    Credit Score: ${creditScore ?? "not available yet"}`);
	}

	// 3. Trigger debt profile fetch
	console.log("\n[3] Triggering debt profile fetch (TransUnion)...");
	let debtFetchOk = false;
	try {
		await sdk.debtProfile.fetch(userId, {
			creditReport: { sourceBureau: "TransUnion", type: "1_BUREAU.FULL" },
			creditScore: { sourceBureau: "TransUnion", model: "VANTAGE_SCORE_3_0" },
		});
		console.log("    Initiated successfully (async — processing in background)");
		debtFetchOk = true;
	} catch (error) {
		if (
			error instanceof Error &&
			"response" in error &&
			(error as { response: Response }).response.status === 403
		) {
			console.log(
				"    SKIPPED: Account not enabled for debt profile (contact Spinwheel support)",
			);
		} else {
			throw error;
		}
	}

	// 4. Re-fetch user after debt pull
	if (debtFetchOk) {
		console.log("\n[4] Waiting 2s then re-fetching user...");
		await new Promise((resolve) => setTimeout(resolve, 2000));
	} else {
		console.log("\n[4] Re-fetching user...");
	}

	const updatedUser = await sdk.userManagement.get({ userId });
	console.log(
		`    Status: ${updatedUser.status.code} — ${updatedUser.status.desc}`,
	);
	if (updatedUser.data.profile?.creditScore) {
		console.log(`    Credit Score: ${updatedUser.data.profile.creditScore}`);
	}

	const summaries = [
		["Credit Cards", updatedUser.data.creditCardSummary],
		["Personal Loans", updatedUser.data.personalLoanSummary],
		["Auto Loans", updatedUser.data.autoLoanSummary],
		["Home Loans", updatedUser.data.homeLoanSummary],
		["Student Loans", updatedUser.data.studentLoanSummary],
	] as const;

	for (const [label, summary] of summaries) {
		if (summary) {
			const balance =
				"currentOutstandingBalance" in summary
					? summary.currentOutstandingBalance
					: null;
			console.log(`    ${label}: $${balance ?? "N/A"} outstanding`);
		}
	}

	if (updatedUser.data.creditReports?.length) {
		console.log("\n    Credit Reports:");
		for (const report of updatedUser.data.creditReports) {
			console.log(`      ${report.sourceBureau} (${report.type}) — id: ${report.id}`);
			for (const score of report.creditScoreDetails ?? []) {
				console.log(`        Score: ${score.creditScore} (${score.model})`);
			}
		}
	}

	console.log(`\n${"=".repeat(60)}`);
	console.log("Smoke test passed.");
	console.log("=".repeat(60));
}

main().catch(async (error: unknown) => {
	console.error("\nERROR:", error instanceof Error ? error.message : error);

	if (
		error !== null &&
		typeof error === "object" &&
		"response" in error &&
		error.response instanceof Response
	) {
		try {
			const body = await error.response.json();
			console.error("\nAPI Response:", JSON.stringify(body, null, 2));
		} catch {
			// already consumed or not JSON
		}
	}

	process.exit(1);
});
