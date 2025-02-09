import { useQuery } from "@tanstack/react-query";
import { getFlights } from "../lib/queries";
import { Flights, Metrics } from "../types";
import { useSearchForm } from "./use_search_form";

export const useFlights = () => {
	const { airline, month } = useSearchForm();
	const flights = useQuery<{ metrics: Metrics; flights: Flights }>({
		queryKey: ["flights", airline, month],
		queryFn: () => getFlights(airline, month),
	});

	return flights.data;
};
