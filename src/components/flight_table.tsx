import { Container, Loader, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

type Flight = {
  id: string;
  destination: string;
  departure: string;
};

// Fetch function without axios
async function fetchFlights(): Promise<Flight[]> {
  const response = await fetch("http://localhost:5555/flights");
  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }
  // return response.json();
  // return fake data
  return [
    { id: "1", destination: "New York", departure: "2024-01-01" },
    { id: "2", destination: "Los Angeles", departure: "2024-01-02" },
    { id: "3", destination: "Chicago", departure: "2024-01-03" },
  ];
}

export function FlightTable() {
  const { data, error, isLoading } = useQuery<Flight[]>({
    queryKey: ["flights"],
    queryFn: fetchFlights,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error instanceof Error) {
    return <Text c="red">Error: {error.message}</Text>;
  }

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destination</th>
            <th>Departure</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.destination}</td>
              <td>{flight.departure}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
