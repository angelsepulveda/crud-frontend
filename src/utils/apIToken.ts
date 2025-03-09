export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
	const token = localStorage.getItem("token");
	const headers = {
		...options.headers,
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};

	const response = await fetch(url, {...options, headers});
	return response;
};
