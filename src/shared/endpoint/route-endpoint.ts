import Endpoint from "@mongez/http";
import { BASE_URL } from "../flags";

export function routeEndpoint() {
  return new Endpoint({
    baseURL: `${BASE_URL}/api`,
  });
}
