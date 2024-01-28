"use client";

import BaseLink from "@/components/BaseLink";
import { cn } from "@/lib/utils";
import { URLS } from "@/shared/urls";
import { getCurrentLocaleCode, trans } from "@mongez/localization";
import { usePathname } from "next/navigation";

const profileLinks = [
  {
    href: URLS.profile.href,
    label: "profile",
  },
  {
    href: URLS.changePassword.href,
    label: "changePassword",
  },
  {
    href: URLS.wishlist.href,
    label: "wishlist",
  },
];

export default function ProfileNavSection() {
  const currentLocale = getCurrentLocaleCode();
  const pathname = usePathname();

  return (
    <div className="container">
      <div className="mx-auto flex w-[615px] max-w-full flex-col items-center justify-center gap-4 rounded-xl bg-primary-white px-8 py-4 text-center sm:flex-row sm:rounded-full md:gap-10">
        {profileLinks.map((link, index) => {
          const active = `/${currentLocale}${link.href}` === pathname;
          return (
            <BaseLink
              key={index}
              href={link.href}
              className={cn(active && "font-medium text-primary-main")}>
              {trans(link.label)}
            </BaseLink>
          );
        })}
      </div>
    </div>
  );
}
