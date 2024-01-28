import { userTokenName } from "@/shared/constants";
import { serverEndpoint } from "@/shared/endpoint/server-endpoint";
import { cookies } from "next/headers";

export async function POST() {
  try {
    await serverEndpoint().post("/logout", {});
    cookies().delete(userTokenName);

    return Response.json({ message: "Logged-out successfully" });
  } catch (error: any) {
    return Response.json(
      { message: error.response?.data?.error },
      { status: 400 }
    );
  }
}
