import { clientEndpoint } from "@/shared/endpoint/client-endpoint";

export function addToNewsletter(email: string) {
  return clientEndpoint().post("/newsletter/subscribe", { email });
}
