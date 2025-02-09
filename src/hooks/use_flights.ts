import { useQuery } from "@tanstack/react-query";
import { getFlights } from "../lib/queries";
import { Flights, Metrics } from "../types";
import { useSearchForm } from "./use_search_form";

export const useFlights = () => {
	const { airline, year } = useSearchForm();
	const flights = useQuery<{ metrics: Metrics; flights: Flights }>({
		queryKey: ["flights", airline, year],
		queryFn: () => getFlights(airline, year),
	});

	return flights.data;
};
