"use client";

import { headerMenuAtom } from "@/atoms/header-menu-atom";
import BaseLink from "@/components/BaseLink";
import { useMedia } from "@/hooks/useMedia";
import { cn } from "@/lib/utils";
import { NavigateArrowIcon } from "@/shared/icons/icons";
import { URLS, Url } from "@/shared/urls";
import { getCurrentLocaleCode, trans } from "@mongez/localization";
import { usePathname } from "next/navigation";
import React, { HTMLAttributes } from "react";

const headerUrls: Partial<keyof Url>[] = [
  "home",
  "aboutUs",
  "properties",
  "rent",
  "buy",
  "blog",
  "contactUs",
];

type NavLinksProps = HTMLAttributes<HTMLDivElement>;

export default function NavLinks({ className }: NavLinksProps) {
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleCode();
  const { isSmallerScreen } = useMedia(1025);

  return (
    <div
      className={cn(
        "flex max-w-[700px] flex-1 shrink-0 flex-col justify-between gap-4 lg:flex-row lg:items-center",
        className
      )}>
      {headerUrls.map((url, index) => {
        const href = URLS[url].href;
        const currentPathname = `/${currentLocale}${href === "/" ? "" : href}`;
        const active = pathname === currentPathname;

        return (
          <BaseLink
            key={index}
            href={href}
            onClick={headerMenuAtom.close}
            className={cn(
              "relative w-fit transition-colors hover:text-primary-main lg:py-2",
              active && "font-medium text-primary-main"
            )}>
            {trans(url)}
            {active && !isSmallerScreen && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <NavigateArrowIcon className="text-primary-main" />
              </span>
            )}
          </BaseLink>
        );
      })}
    </div>
  );
}
