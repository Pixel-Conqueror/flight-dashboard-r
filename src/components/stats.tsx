import {
	Center,
	Group,
	Paper,
	RingProgress,
	SimpleGrid,
	Text,
} from "@mantine/core";
import { TbAlertCircle, TbClock, TbPlane } from "react-icons/tb";
import { useFlights } from "../hooks/use_flights";

const icons = {
	plane: TbPlane,
	clock: TbClock,
	alert: TbAlertCircle,
};

export function FlightStats() {
	const data = useFlights();
	const metrics = data?.metrics;

	const totalFlights = metrics?.total_flights.toString();
	const averageDelay = metrics?.average_delay ?? 0;
	const delayedFlightsPercentage = metrics?.delayed_flights_percentage ?? 0;

	const stats = [
		{
			label: "Nombre total de vols",
			stats: totalFlights,
			progress: 100,
			color: "blue",
			icon: "plane" as const,
		},
		{
			label: "Retard moyen (minutes)",
			stats: averageDelay,
			progress: Math.min(averageDelay, 100),
			color: averageDelay > 15 ? "red" : "yellow",
			icon: "clock" as const,
		},
		{
			label: "Vols retardés",
			stats: `${delayedFlightsPercentage}%`,
			progress: delayedFlightsPercentage,
			color:
				delayedFlightsPercentage > 50
					? "red"
					: delayedFlightsPercentage > 25
						? "yellow"
						: "green",
			icon: "alert" as const,
		},
	];

	const statCards = stats.map((stat) => {
		const Icon = icons[stat.icon];
		return (
			<Paper withBorder radius="md" p="xs" key={stat.label}>
				<Group>
					<RingProgress
						size={80}
						roundCaps
						thickness={8}
						sections={[{ value: stat.progress, color: stat.color }]}
						label={
							<Center>
								<Icon size="1.4rem" />
							</Center>
						}
					/>
					<div>
						<Text c="dimmed" size="xs" tt="uppercase" fw={700}>
							{stat.label}
						</Text>
						<Text fw={700} size="xl">
							{stat.stats}
						</Text>
					</div>
				</Group>
			</Paper>
		);
	});

	return <SimpleGrid cols={{ base: 1, sm: 3 }}>{statCards}</SimpleGrid>;
}
