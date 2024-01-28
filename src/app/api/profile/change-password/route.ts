import { userTokenName } from "@/shared/constants";
import { serverEndpoint } from "@/shared/endpoint/server-endpoint";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get("accessToken");
    const body = await request.json();

    const response = await serverEndpoint().post("/change-password", body);

    if (!response) {
      return Response.json(
        { message: "Couldn't change your password" },
        { status: 400 }
      );
    }

    cookies().set(
      userTokenName,
      JSON.stringify({ ...response.data.user, accessToken })
    );

    return Response.json({ message: "Your password has been updated" });
  } catch (error: any) {
    return Response.json(
      { message: error.response?.data?.error },
      { status: 400 }
    );
  }
}
