import { clientEndpoint } from "@/shared/endpoint/client-endpoint";
import { routeEndpoint } from "@/shared/endpoint/route-endpoint";
import { GenericObject } from "@/shared/types";

export function getPropertyPopularTypes() {
  return clientEndpoint().get("/property-types/popular");
}

export function getPropertyTypes() {
  return clientEndpoint().get("/property-types");
}

export function getPropertyCompounds() {
  return clientEndpoint().get("/compounds");
}

export function getPropertyDistricts() {
  return clientEndpoint().get("/districts");
}

export function getPropertyViews() {
  return clientEndpoint().get("/property-views");
}

export function getPropertyFurnishings() {
  return clientEndpoint().get("/property-furnishings");
}

export function getPropertyModels() {
  return clientEndpoint().get("/property-models");
}

export function getPropertyCities() {
  return clientEndpoint().get("/cities");
}

export function getPropertyNearByPlaces() {
  return clientEndpoint().get("/near-by-places");
}

export function getProperties(params: GenericObject = {}) {
  return clientEndpoint().get("/properties", { params });
}

// export function addToWishlist(id: number) {
//   return clientEndpoint().post("/wishlist/" + id);
// }

// export async function deleteFromWishlist(id: number) {
//   return clientEndpoint().delete("/wishlist/" + id);
// }

export function addToWishlist(id: number, accessToken: string) {
  return routeEndpoint().post(`/wishlist/${id}`, {
    accessToken,
  });
}

export async function deleteFromWishlist(id: number, accessToken: string) {
  return routeEndpoint().delete(`/wishlist/${id}?accessToken=${accessToken}`);
}
