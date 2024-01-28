import { clientEndpoint } from "@/shared/endpoint/client-endpoint";
import { GenericObject } from "@/shared/types";

export function sendContactMessage(body: GenericObject) {
  return clientEndpoint().post("/contact-us", body);
}
