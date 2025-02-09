async function makeRequest(
	path: string,
	params?: Record<string, string | null>,
) {
	const url = new URL(`${import.meta.env.VITE_API_URL}/${path}`);
	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value) {
				url.searchParams.set(key, value);
			}
		});
	}

	console.log(url.toString());
	const response = await fetch(url, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return response.json();
}

export const getAirlines = async () => makeRequest("airlines");

export const getFlights = async (airline: string | null, year: string | null) =>
	makeRequest("flights", { code: airline, year });
