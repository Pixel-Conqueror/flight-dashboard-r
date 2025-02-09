import { createContext, useState } from "react";
import { SearchFormContextType } from "../types";

export const SearchFormContext = createContext<SearchFormContextType>({
	airline: null,
	month: null,
	setAirline: () => {},
	setMonth: () => {},
	reset: () => {},
});

export function SearchFormContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [airline, setAirline] = useState<string | null>(null);
	const [month, setMonth] = useState<string | null>(null);

	const handleReset = () => {
		setAirline(null);
		setMonth(null);
	};

	return (
		<SearchFormContext.Provider
			value={{ airline, month, setAirline, setMonth, reset: handleReset }}
		>
			{children}
		</SearchFormContext.Provider>
	);
}
