import Endpoint from "@mongez/http";
import { getCurrentLocaleCode } from "@mongez/localization";
import { BASE_API_URL } from "../flags";
import { GenericObject } from "../types";

// "client-id": "asapeg.com",

//297554

export function endpoint(headers?: GenericObject) {
  const endpoint = new Endpoint({
    baseURL: BASE_API_URL || "",
    headers: {
      Accept: "application/json",
      "client-id": "asapeg.com",
      ...headers,
    },
  });

  endpoint.events.beforeSending((config) => {
    if (!config.params) {
      config.params = {};
    }

    config.params.locale = getCurrentLocaleCode();
  });

  return endpoint;
}
