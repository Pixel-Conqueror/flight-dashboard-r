import { MantineProvider } from "@mantine/core";
import "@mantine/dates/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { SearchFormContextProvider } from "./contexts/search_form_context";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider>
			<QueryClientProvider client={queryClient}>
				<SearchFormContextProvider>
					<App />
				</SearchFormContextProvider>
			</QueryClientProvider>
		</MantineProvider>
	</React.StrictMode>,
);
