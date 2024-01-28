import { clientEndpoint } from "@/shared/endpoint/client-endpoint";
import { GenericObject } from "@/shared/types";

export function getPosts(params: GenericObject = {}) {
  return clientEndpoint().get("/posts", { params });
}
