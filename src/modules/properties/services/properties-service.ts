import { serverEndpoint } from "@/shared/endpoint/server-endpoint";
import { GenericObject, PaginationInfo } from "@/shared/types";
import { Filter, Property, PropertyDetails, SortOption } from "../utils/types";

type GetPropertiesReturnType = {
  properties: Property[];
  paginationInfo: PaginationInfo;
  filters: Filter[];
  sortOptions: SortOption[];
};

export async function getProperties(
  params: GenericObject = {}
): Promise<GetPropertiesReturnType | undefined> {
  try {
    const { data } = await serverEndpoint().get("/properties", { params });

    return {
      properties: data.properties,
      paginationInfo: data.paginationInfo,
      filters: data.filters,
      sortOptions: data.sortOptions,
    };
  } catch (error) {
    return undefined;
  }
}

export async function getSingleProperty(
  id: number
): Promise<PropertyDetails | undefined> {
  try {
    const { data } = await serverEndpoint().get("/properties/" + id);

    return data.property;
  } catch (error) {
    return undefined;
  }
}

export async function getWishlist(): Promise<
  { properties: Property[]; paginationInfo: PaginationInfo } | undefined
> {
  try {
    const { data } = await serverEndpoint().get("/wishlist");

    return { properties: data.properties, paginationInfo: data.paginationInfo };
  } catch (error: any) {
    return undefined;
  }
}
