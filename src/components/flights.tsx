import { LineChart } from "@mantine/charts";
import { Paper, Text } from "@mantine/core";
import { useFlights } from "../hooks/use_flights";

export function FlightsChart() {
	const data = useFlights();
	const flights = data?.flights;

	const chartData = flights?.map((flight) => ({
		horodatage: new Date(flight.horodatage).toLocaleTimeString(),
		"Retard au départ": flight.retard_depart,
		"Retard à l'arrivée": flight.retard_arrivee,
	}));

	if (!chartData) return null;

	return (
		<Paper p="md" radius="md" withBorder>
			<Text size="lg" fw={500}>
				Évolution des retards des vols
			</Text>
			<Text size="sm" c="dimmed" mb="md">
				Si les valeurs sont négatives, les vols sont en avance.
			</Text>

			<LineChart
				h={300}
				data={chartData}
				dataKey="horodatage"
				series={[
					{ name: "Retard au départ", color: "blue.6" },
					{ name: "Retard à l'arrivée", color: "red.6" },
				]}
				curveType="monotone"
				yAxisLabel="Retard en minutes"
				xAxisLabel="Heure"
				tooltipProps={{
					content: ({ payload }) => {
						if (!payload?.length) return null;
						return (
							<div>
								<Text fw={500} mb={5}>
									{payload[0].payload.horodatage}
								</Text>
								{payload.map((entry) => (
									<Text key={entry.name} c={entry.color}>
										{entry.name}: {entry.value} min
									</Text>
								))}
							</div>
						);
					},
				}}
			/>
		</Paper>
	);
}
