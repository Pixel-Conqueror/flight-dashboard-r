import { Box, Button, Select, TextInput } from "@mantine/core";

const FilterSidebar = () => (
  <Box>
    <TextInput
      label="Numéro de vol"
      placeholder="Entrer le numéro de vol"
      mb="sm"
    />
    <Select
      label="Status"
      placeholder="Choisir un status"
      data={[
        { value: "À l'heure", label: "À l'heure" },
        { value: "Retardé", label: "Retardé" },
        { value: "Annulé", label: "Annulé" },
      ]}
      mb="sm"
    />
    <Button fullWidth>Rechercher</Button>
  </Box>
);

export default FilterSidebar;
