import { LoadingOverlay, Stack, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import {
	useIsFetching,
	useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import { FlightsChart } from "./components/flights";
import { Form } from "./components/form";
import { FlightStats } from "./components/stats";

export function App() {
	const isFetching = useIsFetching();
	const isLoading = isFetching > 0;
	const error = useQueryErrorResetBoundary();

	if (error instanceof Error) {
		return <Text c="red">Error: {error.message}</Text>;
	}

	return (
		<Stack p="xl" gap="md" style={{ position: "relative" }}>
			<LoadingOverlay
				visible={isLoading}
				zIndex={1000}
				overlayProps={{ radius: "sm", blur: 2 }}
			/>
			<Form />
			<FlightStats />
			<FlightsChart />
		</Stack>
	);
}
