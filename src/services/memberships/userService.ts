import { TRegisterUserPayload, TUserDto } from "../../models/memberships/user";
import { mapperErrorUser } from "../../utils/memberships/userIUtil";

const API_URL = "https://localhost:7148/api";

export const userService = {
	async getAll (): Promise<TUserDto[]> {
		const response = await fetch(`${API_URL}/users`);
		if (!response.ok) {
			throw new Error("Failed to fetch users");
		}
		return response.json();
	},

	async create (data: TRegisterUserPayload): Promise<TUserDto | string> {
		const response = await fetch(`${API_URL}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			return mapperErrorUser(response, "Failed to register user")
		}
		return response.json();
	},

	async update (data: TUserDto): Promise<TUserDto> {
		const response = await fetch(`${API_URL}/users`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			return mapperErrorUser(response, "Failed to update user")
		}
		return response.json();
	},

	async delete (id: string): Promise<void> {
		const response = await fetch(`${API_URL}/users/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Failed to delete user");
		}
	},
};

