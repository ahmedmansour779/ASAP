"use client";

import { useLocaleCodeChange } from "@/hooks/useLocale";
import { getCurrentLocaleCode } from "@mongez/localization";
import Image from "next/image";

export default function LanguageButton() {
  const changeLocaleCode = useLocaleCodeChange();
  const currentLocaleCode = getCurrentLocaleCode();

  return (
    <button
      onClick={changeLocaleCode}
      title="change locale"
      aria-label="change locale"
      className="flex items-center  gap-2 rounded-full bg-secondary-main px-3 py-2.5 uppercase transition-colors hover:bg-primary-lighter hover:text-primary-main">
      <Image
        src={`/assets/${currentLocaleCode === "en" ? "ar" : "en"}.png`}
        alt="language image"
        width={25}
        height={25}
        className="aspect-square h-full shrink-0 rounded-full object-cover"
      />
      {currentLocaleCode === "en" ? "ar" : "en"}
    </button>
  );
}
