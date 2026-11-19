import type {
	GetUserInput,
	GetUserResponse,
	SpinwheelClients,
	SpinwheelRequestOptions,
} from "./types";

/**
 * User Management API — Optimize > User Management
 *
 * Always uses the secure API endpoint.
 */
export class UserManagementAPI {
	constructor(private clients: SpinwheelClients) {}

	/**
	 * Retrieve a user's full hydrated profile.
	 *
	 * @param input - Either `userId` (Spinwheel's ID) or `extUserId` (your external ID)
	 * @see https://docs.spinwheel.io/reference/get-user-profile
	 */
	async get(
		{ unmask = [], ...input }: GetUserInput,
		requestOptions?: SpinwheelRequestOptions,
	): Promise<GetUserResponse> {
		const searchParams = new URLSearchParams(input);
		for (const field of unmask) {
			searchParams.append("unmask", field);
		}

		return this.clients.secureClient
			.get("v1/users", { searchParams, ...requestOptions })
			.json<GetUserResponse>();
	}
}
