"use client";

import { cn } from "@/lib/utils";
import { URLS } from "@/shared/urls";
import { debounce } from "@/utils/utils";
import { getCurrentLocaleCode, trans } from "@mongez/localization";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

export default function SearchProperties() {
  const router = useRouter();
  const localeCode = getCurrentLocaleCode();
  const searchParams = useSearchParams();

  const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (!value) {
      router.push(`/${localeCode}${URLS.properties.href}`);
      return;
    }

    router.push(`/${localeCode}${URLS.properties.href}?name=${value}`);
  });

  return (
    <div className="order-2 w-full max-w-[450px] lg:order-1">
      <input
        type="text"
        defaultValue={searchParams.get("name") || ""}
        placeholder={trans("searchAnyProperty")}
        onChange={handleInputChange}
        className={cn(
          "w-full rounded-full border border-secondary-dark bg-[#F9F9F9] px-6 py-3 tracking-wide outline-none placeholder:text-primary-text/60 focus-within:border-primary-main"
        )}
      />
    </div>
  );
}
