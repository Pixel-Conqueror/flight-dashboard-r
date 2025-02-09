import { createContext, useState } from "react";
import { SearchFormContextType } from "../types";

export const SearchFormContext = createContext<SearchFormContextType>({
	airline: null,
	year: null,
	setAirline: () => {},
	setYear: () => {},
	reset: () => {},
});

export function SearchFormContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [airline, setAirline] = useState<string | null>(null);
	const [year, setYear] = useState<string | null>(null);

	const handleReset = () => {
		setAirline(null);
		setYear(null);
	};

	return (
		<SearchFormContext.Provider
			value={{ airline, year, setAirline, setYear, reset: handleReset }}
		>
			{children}
		</SearchFormContext.Provider>
	);
}
