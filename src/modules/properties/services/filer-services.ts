import { clientEndpoint } from "@/shared/endpoint/client-endpoint";

export function getPropertiesFilters() {
  return clientEndpoint().get("/properties-filters");
}
