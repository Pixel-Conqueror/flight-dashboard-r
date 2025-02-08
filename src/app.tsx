import { Container, Group } from "@mantine/core";
import "@mantine/core/styles.css";
import "./app.css";
import FilterSidebar from "./components/flight_sidebar";
import { FlightTable } from "./components/flight_table";
import { Navbar } from "./components/navbar/navbar";

export const App = () => (
  <Group>
    <Navbar />
    <FilterSidebar />
    <Container>
      <FlightTable />
    </Container>
  </Group>
);
