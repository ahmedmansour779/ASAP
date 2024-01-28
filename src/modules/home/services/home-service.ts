import { serverEndpoint } from "@/shared/endpoint/server-endpoint";
import { Amenity, Currency, Settings } from "../utils/types";

export async function getAmenities(): Promise<Amenity[] | undefined> {
  try {
    const { data } = await serverEndpoint().get("/amenities/popular");

    return data?.amenities;
  } catch (error) {
    return undefined;
  }
}

export async function getSettings(): Promise<
  { settings: Settings; currencies: Currency[] } | undefined
> {
  try {
    const response = await serverEndpoint().get("/settings", {
      params: {
        ws: true,
      },
    });

    return {
      settings: response.data.settings,
      currencies: response.data.currencies,
    };
  } catch (error) {
    return undefined;
  }
}
