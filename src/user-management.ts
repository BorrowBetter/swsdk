import type { GetUserResponse, SpinwheelClients } from "./types";

type GetUserInput = { userId: string } | { extUserId: string };

/**
 * User Management API — Optimize > User Management
 *
 * Handles user profile retrieval with unmasked sensitive fields.
 * Always uses the secure API endpoint.
 */
export class UserManagementAPI {
	constructor(private clients: SpinwheelClients) {}

	/**
	 * Retrieve a user's full hydrated profile with unmasked account number and SSN.
	 *
	 * @param input - Either `userId` (Spinwheel's ID) or `extUserId` (your external ID)
	 * @see https://docs.spinwheel.io/reference/get-user-profile
	 */
	async get(input: GetUserInput): Promise<GetUserResponse> {
		const searchParams = new URLSearchParams(input);
		searchParams.append("unmask", "accountNumber");
		searchParams.append("unmask", "ssn");

		return this.clients.secureClient
			.get("v1/users", { searchParams })
			.json<GetUserResponse>();
	}
}
