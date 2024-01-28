import { userTokenName } from "@/shared/constants";
import { serverEndpoint } from "@/shared/endpoint/server-endpoint";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await serverEndpoint().post("/register", body);

    if (!response) {
      return Response.json({ error: "Couldn't sign-up" }, { status: 400 });
    }

    cookies().set(userTokenName, JSON.stringify(response.data.user));

    return Response.json({ data: response.data });
  } catch (error: any) {
    return Response.json({ error: error.response.data }, { status: 400 });
  }
}
