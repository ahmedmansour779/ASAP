import { serverEndpoint } from "@/shared/endpoint/server-endpoint";
import { GenericObject, PaginationInfo } from "@/shared/types";
import { Blog } from "../utils/types";

export async function getPosts(
  params: GenericObject = {}
): Promise<{ posts: Blog[]; paginationInfo: PaginationInfo } | undefined> {
  try {
    const { data } = await serverEndpoint().get("/posts", { params });

    return { posts: data.posts, paginationInfo: data.paginationInfo };
  } catch (error) {
    return undefined;
  }
}

export async function getPost(id: string | number): Promise<Blog | undefined> {
  try {
    const { data } = await serverEndpoint().get("/posts/" + id);

    return data.post;
  } catch (error) {
    return undefined;
  }
}
