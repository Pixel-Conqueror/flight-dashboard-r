export type Flight = {
	aeroport_arrivee: string;
	aeroport_depart: string;
	annee: number;
	code_compagnie: string;
	distance_vol: number;
	duree_vol: number;
	heure: number;
	heure_arrivee: number;
	heure_arrivee_prevue: number;
	heure_depart: number;
	heure_depart_prevue: number;
	horodatage: string;
	id_vol: number;
	jour: number;
	minute: number;
	mois: number;
	numero_immatriculation: string;
	numero_vol: number;
	retard_arrivee: number;
	retard_depart: number;
};
export type Flights = Flight[];

export type Airline = {
	code: string;
	nom: string;
};
export type Airlines = Airline[];

export type Metrics = {
	total_flights: number;
	average_delay: number;
	delayed_flights_percentage: number;
};

export type SearchFormContextType = {
	airline: string | null;
	year: string | null;
	setAirline: (airline: string | null) => void;
	setYear: (year: string | null) => void;
	reset: () => void;
};
