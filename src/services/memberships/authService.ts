import { fetchWithAuth } from "../../utils/apIToken";

const API_URL = import.meta.env.VITE_API_URL;

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

	async loginWithGoogle (token: string): Promise<string> {
		const response = await fetch(`${API_URL}/auth/login-google`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token }),
		});

		if (!response.ok) {
			throw new Error("Error en la autenticación");
		}

		const data = await response.json();
		return data.token;
	},
};
