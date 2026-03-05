import ky from "ky";
import { ConnectAPI } from "./connect";
import { DebtProfileAPI } from "./debt-profile";
import type { SpinwheelClients, SpinwheelConfig } from "./types";
import { UserManagementAPI } from "./user-management";

export type { SpinwheelConfig } from "./types";
export type * from "./types";

const BASE_URLS = {
	production: {
		standard: "https://api.spinwheel.io",
		secure: "https://secure-api.spinwheel.io",
	},
	sandbox: {
		standard: "https://sandbox-api.spinwheel.io",
		secure: "https://secure-sandbox-api.spinwheel.io",
	},
} as const;

/**
 * Spinwheel SDK
 *
 * Domain-based client for the Spinwheel credit data and debt profile API.
 *
 * @example
 * ```typescript
 * const spinwheel = new SpinwheelSDK({
 *   apiKey: "your-api-key",
 *   sandbox: true,
 * });
 *
 * // Connect a user
 * const { data } = await spinwheel.connect.preverifiedPhone({
 *   phoneNumber: "+14155552671",
 *   dateOfBirth: "1990-01-15",
 *   extUserId: "your-user-id",
 *   audit: {
 *     verificationDate: "2025-01-01",
 *     userConsentDate: "2025-01-01",
 *     verificationType: "SMS",
 *   },
 * });
 *
 * // Trigger a credit pull
 * await spinwheel.debtProfile.fetch(data.userId, {
 *   creditReport: { sourceBureau: "TransUnion", type: "1_BUREAU.FULL" },
 *   creditScore: { sourceBureau: "TransUnion", model: "VANTAGE_SCORE_3_0" },
 * });
 *
 * // Retrieve hydrated profile
 * const profile = await spinwheel.userManagement.get({ userId: data.userId });
 * ```
 */
export class SpinwheelSDK {
	readonly connect: ConnectAPI;
	readonly debtProfile: DebtProfileAPI;
	readonly userManagement: UserManagementAPI;

	constructor(config: SpinwheelConfig) {
		const urls = config.sandbox ? BASE_URLS.sandbox : BASE_URLS.production;

		const clients: SpinwheelClients = {
			client: ky.create({
				prefixUrl: urls.standard,
				headers: {
					Authorization: `Bearer ${config.apiKey}`,
				},
			}),
			secureClient: ky.create({
				prefixUrl: urls.secure,
				headers: {
					Authorization: `Bearer ${config.apiKey}`,
				},
			}),
		};

		this.connect = new ConnectAPI(clients);
		this.debtProfile = new DebtProfileAPI(clients);
		this.userManagement = new UserManagementAPI(clients);
	}
}
