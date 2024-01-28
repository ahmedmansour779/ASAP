import { clientEndpoint } from "@/shared/endpoint/client-endpoint";
import { routeEndpoint } from "@/shared/endpoint/route-endpoint";

export function signIn(body: any) {
  return routeEndpoint().post("/auth/login", body);
}

export function signUp(body: any) {
  return routeEndpoint().post("/auth/sign-up", body);
}

export function forgetPassword(body: any) {
  return clientEndpoint().post("/forget-password", body);
}

export function resetPassword(body: any) {
  return clientEndpoint().post("/reset-password", body);
}
