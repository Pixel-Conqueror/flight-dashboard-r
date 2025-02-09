import { useContext } from "react";
import { SearchFormContext } from "../contexts/search_form_context";

export const useSearchForm = () => useContext(SearchFormContext);
