"use server";

import { settingsKey } from "@/shared/constants";
import { cookies } from "next/headers";

export async function getSettings() {
  const cookiesStore = cookies();
  const settings = cookiesStore.get(settingsKey);

  return settings;
}
