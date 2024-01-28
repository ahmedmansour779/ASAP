"use client";

import { useLocaleCode } from "@/hooks/useLocale";
import { translations } from "@/shared/locales";
import { setCurrentLocaleCode } from "@mongez/localization";

export default function ClientLocalization() {
  const localeCode = useLocaleCode();

  translations();
  setCurrentLocaleCode(localeCode);

  return <></>;
}
