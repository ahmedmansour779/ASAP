"use client";

import BaseLink from "@/components/BaseLink";
import { useMedia } from "@/hooks/useMedia";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/shared/icons/icons";
import { URLS, Url } from "@/shared/urls";
import { trans } from "@mongez/localization";
import { useState } from "react";

type LinksColumnProps = {
  linksList: Partial<keyof Url>[];
  title: string;
};

export default function LinksColumn({ linksList, title }: LinksColumnProps) {
  const { isSmallerScreen } = useMedia(500);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={cn("mx-auto", isSmallerScreen && "h-fit w-full")}>
      <div
        className={"flex items-center justify-between font-medium capitalize"}
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {trans(title)}
        {isSmallerScreen && (
          <ArrowIcon className={cn(isMenuOpen && "rotate-180")} />
        )}
      </div>
      <ul
        className={cn(
          "space-y-4 overflow-hidden text-sm font-medium text-primary-text/70",
          isSmallerScreen ? (isMenuOpen ? "mt-6 h-fit" : "h-0") : "mt-6"
        )}>
        {linksList.map((url, index) => (
          <li key={index}>
            <BaseLink
              href={URLS[url].href}
              className="transition-colors hover:text-primary-text hover:underline">
              {trans(url)}
            </BaseLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
