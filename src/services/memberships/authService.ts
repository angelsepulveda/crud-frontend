import { fetchWithAuth } from "../../utils/apIToken";

const API_URL = "https://localhost:7148/api";

export const authService = {
	async logout (): Promise<void> {
		const response = await fetchWithAuth(`${API_URL}/auth/logout`, {
			method: "POST",
		});

		if (!response.ok) {
			throw new Error("Failed to logout");
		}

		// Destruir el token
		localStorage.removeItem("token");
	},
};
