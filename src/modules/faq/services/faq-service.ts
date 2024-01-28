import { serverEndpoint } from "@/shared/endpoint/server-endpoint";
import { Question } from "../utils/types";

export async function getQuestions(): Promise<Question[] | undefined> {
  try {
    const { data } = await serverEndpoint().get("/faq");

    return data.faq;
  } catch (error) {
    return undefined;
  }
}
