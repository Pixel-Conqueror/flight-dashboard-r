import { Button, Flex, Select } from "@mantine/core";
import { useAirlines } from "../hooks/use_airlines";
import { useSearchForm } from "../hooks/use_search_form";

const MIN_MONTH = 1;
const MAX_MONTH = 12;
const INPUT_WIDTH = 250;

const months = Array.from(
	{ length: MAX_MONTH - MIN_MONTH + 1 },
	(_, i) => MIN_MONTH + i,
).reverse();

export function Form() {
	const airlines = useAirlines();
	const { airline, month, setAirline, setMonth, reset } = useSearchForm();

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
					label="Mois"
					value={month}
					onChange={(value) => setMonth(value)}
					data={months.map((month) => ({
						value: month.toString(),
						label: month.toString(),
					}))}
					clearable
					placeholder="Sélectionnez un mois"
					w={INPUT_WIDTH}
				/>
				<Button type="reset" variant="subtle">
					Réinitialiser
				</Button>
			</Flex>
		</form>
	);
}
