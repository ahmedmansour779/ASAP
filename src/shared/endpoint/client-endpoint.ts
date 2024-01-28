import { userAtom } from "@/modules/profile/atoms/user-atom";
import { guestData } from "../user/guest";
import { endpoint } from "./endpoint";

export function clientEndpoint() {
  const token = userAtom.get("accessToken") || guestData.accessToken;

  return endpoint({
    Authorization: `Bearer ${token}`,
  });
}
