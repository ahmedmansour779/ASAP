"use client";

import { usePathname, useRouter } from "next/navigation";

export function useLocaleCode() {
  const pathname = usePathname();

  if (!pathname) {
    return "";
  }

  return pathname?.split("/")[1];
}

export function useLocaleCodeChange() {
  const currentLocaleCode = useLocaleCode();
  const pathname = usePathname();
  const router = useRouter();

  return () => {
    const newLocaleCode = currentLocaleCode === "en" ? "ar" : "en";

    router.push(pathname.replace(`/${currentLocaleCode}`, `/${newLocaleCode}`));
  };
}

export function useDirection() {
  return useLocaleCode() === "ar" ? "rtl" : "ltr";
}
