import type {
	ConnectNetworkTokenInput,
	ConnectNetworkTokenResponse,
	ConnectPreverifiedPhoneInput,
	ConnectPreverifiedPhoneResponse,
	SpinwheelClients,
} from "./types";

/**
 * Connect API — Discover > Connect
 *
 * Handles user connection flows (preverified phone, network tokens).
 */
export class ConnectAPI {
	constructor(private clients: SpinwheelClients) {}

	/**
	 * Connect a user that has already been pre-verified by phone number/SMS.
	 * Requires Spinwheel Support approval to enable.
	 *
	 * @see https://docs.spinwheel.io/reference/connect-preverified-phone-number
	 */
	async preverifiedPhone(
		input: ConnectPreverifiedPhoneInput,
	): Promise<ConnectPreverifiedPhoneResponse> {
		return this.clients.client
			.post("v1/users/connect/preverified/phoneNumber", { json: input })
			.json<ConnectPreverifiedPhoneResponse>();
	}

	/**
	 * Connect a user using a network token obtained from user verification.
	 *
	 * @see https://docs.spinwheel.io/reference/create-network-user
	 */
	async networkToken(
		input: ConnectNetworkTokenInput,
	): Promise<ConnectNetworkTokenResponse> {
		return this.clients.client
			.post("v1/users/connect/network", { json: input })
			.json<ConnectNetworkTokenResponse>();
	}
}
