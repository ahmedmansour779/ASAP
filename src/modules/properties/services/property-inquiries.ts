import { clientEndpoint } from "@/shared/endpoint/client-endpoint";
import { GenericObject } from "@/shared/types";

export async function postInquiries(
  id: number,
  body: GenericObject
): Promise<undefined> {
  return clientEndpoint().post("/property-inquiries/" + id, body);
}
