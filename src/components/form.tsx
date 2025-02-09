import { Button, Flex, Select } from "@mantine/core";
import { useAirlines } from "../hooks/use_airlines";
import { useSearchForm } from "../hooks/use_search_form";

const MIN_YEAR = new Date("1900-01-01");
const MAX_YEAR = new Date();
const INPUT_WIDTH = 250;

const years = Array.from(
	{ length: MAX_YEAR.getFullYear() - MIN_YEAR.getFullYear() + 1 },
	(_, i) => MIN_YEAR.getFullYear() + i,
).reverse();

export function Form() {
	const airlines = useAirlines();
	const { airline, year, setAirline, setYear, reset } = useSearchForm();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit} onReset={reset}>
			<Flex wrap="wrap" gap="md" align="flex-end">
				<Select
					label="Compagnie"
					data={airlines?.map((airline) => ({
						value: airline.code,
						label: airline.nom,
					}))}
					value={airline}
					onChange={(value) => setAirline(value)}
					clearable
					placeholder="Sélectionnez une compagnie"
					w={INPUT_WIDTH}
				/>
				<Select
					label="Année"
					value={year}
					onChange={(value) => setYear(value)}
					data={years.map((year) => ({
						value: year.toString(),
						label: year.toString(),
					}))}
					clearable
					placeholder="Sélectionnez une année"
					w={INPUT_WIDTH}
				/>
				<Button type="reset" variant="subtle">
					Réinitialiser
				</Button>
			</Flex>
		</form>
	);
}
