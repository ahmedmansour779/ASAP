import { User } from "@/modules/profile/atoms/user-atom";
import { userTokenName } from "@/shared/constants";
import { parse } from "@/shared/parse";
import { cookies } from "next/headers";

export function getIsAuthorized() {
  const cookieStore = cookies();
  const user: User = parse(cookieStore.get(userTokenName)?.value);

  if (!user) {
    return false;
  }

  return user.type === "user";
}
