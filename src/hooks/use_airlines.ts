import { useQuery } from "@tanstack/react-query";
import { getAirlines } from "../lib/queries";
import { Airlines } from "../types";

export const useAirlines = () => {
	const airlines = useQuery<Airlines>({
		queryKey: ["airlines"],
		queryFn: getAirlines,
	});

	return airlines.data;
};
