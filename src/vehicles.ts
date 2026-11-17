import type {
	ParseLicensePlateInput,
	ParseLicensePlateResponse,
	SpinwheelClients,
	SpinwheelRequestOptions,
} from "./types";

/**
 * Vehicles API — Marketplace Data > Vehicles
 */
export class VehiclesAPI {
	constructor(private clients: SpinwheelClients) {}

	/**
	 * Look up vehicle details (year, make, model, trim, VIN, ...) by license plate and state.
	 *
	 * @see https://docs.spinwheel.io/reference/parse-license-plate
	 */
	async parseLicensePlate(
		input: ParseLicensePlateInput,
		requestOptions?: SpinwheelRequestOptions,
	): Promise<ParseLicensePlateResponse> {
		const licensePlate = encodeURIComponent(input.licensePlate);

		return this.clients.client
			.get(
				`v1/md/vehicles/licensePlate/${licensePlate}/state/${input.state}`,
				requestOptions,
			)
			.json<ParseLicensePlateResponse>();
	}
}
