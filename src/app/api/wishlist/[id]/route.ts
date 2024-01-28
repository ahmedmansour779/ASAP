import { userTokenName } from "@/shared/constants";
import { serverEndpoint } from "@/shared/endpoint/server-endpoint";
import { GenericObject } from "@mongez/reinforcements";
import { cookies } from "next/headers";

export async function POST(request: Request, { params }: GenericObject) {
  try {
    const { accessToken } = await request.json();
    const response = await serverEndpoint().post("/wishlist/" + params.id, {});

    if (!response) {
      return Response.json(
        { error: "Couldn't add to wishlist" },
        { status: 400 }
      );
    }

    cookies().set(
      userTokenName,
      JSON.stringify({ ...response.data.user, accessToken })
    );

    return Response.json({ data: response.data });
  } catch (error) {
    return Response.json(error);
  }
}

export async function DELETE(request: Request, { params }: GenericObject) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get("accessToken");
    const response = await serverEndpoint().delete("/wishlist/" + params.id);

    if (!response) {
      return Response.json(
        { error: "Couldn't delete from wishlist" },
        { status: 400 }
      );
    }

    cookies().set(
      userTokenName,
      JSON.stringify({ ...response.data.user, accessToken })
    );

    return Response.json({ data: response.data });
  } catch (error) {
    return Response.json(error);
  }
}
