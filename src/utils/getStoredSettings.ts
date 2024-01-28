import { getSettings } from "@/modules/home/services/home-service";
import { Currency, Settings } from "@/modules/home/utils/types";
import { settingsArPath, settingsEnPath } from "@/shared/constants";
import { fileExists, getJsonFile, putJsonFile } from "@mongez/fs";

type Data = {
  settings: Settings | undefined;
  currencies: Currency[] | undefined;
};

export async function getStoredSettings(
  locale: "en" | "ar"
): Promise<Data | undefined> {
  let settings: Settings | undefined;
  let currencies: Currency[] | undefined;

  const settingsPath = locale === "en" ? settingsEnPath : settingsArPath;

  if (!fileExists(settingsPath)) {
    const data = await getSettings();
    settings = data?.settings;
    currencies = data?.currencies;

    putJsonFile(settingsPath, data);
  } else {
    const data = getJsonFile(settingsPath);
    settings = data?.settings;
    currencies = data?.currencies;
  }

  return { settings, currencies };
}
