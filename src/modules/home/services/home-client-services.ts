import { clientEndpoint } from "@/shared/endpoint/client-endpoint";

export async function getPopularAmenities() {
  return clientEndpoint().get("/amenities/popular");
}
