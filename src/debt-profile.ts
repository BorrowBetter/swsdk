import type { FetchDebtProfileOptions, SpinwheelClients } from "./types";

/**
 * Debt Profile API — Discover > Debt Profile
 *
 * Triggers asynchronous credit pulls. After calling `fetch`, use
 * `userManagement.get()` to retrieve the resulting hydrated user data.
 */
export class DebtProfileAPI {
	constructor(private clients: SpinwheelClients) {}

	/**
	 * Trigger a credit pull for a user's debt profile.
	 *
	 * This is an async operation — the credit pull happens in the background.
	 * Poll `userManagement.get(userId)` to retrieve results once complete.
	 *
	 * Note: Your implementation must display the Spinwheel End User Agreement:
	 * "By continuing you agree to the Spinwheel End User Agreement. Further,
	 * you are providing written instructions to Spinwheel Solutions, Inc.
	 * authorizing it to obtain your credit profile from any consumer reporting agency."
	 *
	 * @see https://docs.spinwheel.io/reference/fetch-debt-profile
	 */
	async fetch(userId: string, options: FetchDebtProfileOptions): Promise<void> {
		const { liabilityType, ...json } = options;
		const searchParams = new URLSearchParams();

		if (liabilityType) {
			searchParams.set("liabilityType", liabilityType);
		}

		await this.clients.client.post(`v1/users/${userId}/debtProfile`, {
			searchParams,
			json,
		});
	}
}
