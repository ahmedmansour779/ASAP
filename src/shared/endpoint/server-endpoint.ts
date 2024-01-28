import { cookies } from "next/headers";
import { userTokenName } from "../constants";
import { parse } from "../parse";
import { guestData } from "../user/guest";
import { endpoint } from "./endpoint";

export function serverEndpoint() {
  const cookieStore = cookies();
  const user = cookieStore.get(userTokenName);
  const token = parse(user?.value).accessToken;

  return endpoint({
    Authorization: `Bearer ${token || guestData.accessToken}`,
  });
}
