import { cn } from "@/lib/utils";
import { RightArrowIcon } from "@/shared/icons/icons";
import { URLS } from "@/shared/urls";
import { trans } from "@mongez/localization";
import Image from "next/image";
import { Fragment } from "react";
import BaseLink from "../BaseLink";

export type BreadcrumbsProps = {
  title: string;
  navLinks: { url?: string; title: string }[];
  imageUrl?: string;
};
export default function Breadcrumbs({
  navLinks,
  imageUrl,
  title,
}: BreadcrumbsProps) {
  return (
    <section
      className={cn(
        "relative h-[300px]",
        !imageUrl && "bg-gradient-to-t from-transparent to-primary-lighter"
      )}>
      {imageUrl && (
        <>
          <Image
            priority
            src={imageUrl}
            alt="breadcrumb section images"
            width={1440}
            height={500}
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/80 to-black/30"></span>
        </>
      )}
      <div
        className={cn(
          "container relative flex h-full flex-col items-center justify-center gap-6",
          imageUrl ? "text-primary-white" : "text-primary-text"
        )}>
        <h1 className="text-center text-2xl font-medium">{trans(title)}</h1>
        <div className="flex flex-wrap items-center gap-2 capitalize">
          <BaseLink
            href={URLS.home.href}
            className="opacity-50 transition-opacity hover:opacity-100">
            {trans("home")}
          </BaseLink>
          <RightArrowIcon className="shrink-0 rtl:rotate-180" />
          {navLinks.map((navLink, index) =>
            navLink.url ? (
              <Fragment key={index}>
                <BaseLink
                  href={navLink.url}
                  className="opacity-50 transition-opacity hover:opacity-100">
                  {trans(navLink.title)}
                </BaseLink>
                <RightArrowIcon className="shrink-0 rtl:rotate-180" />
              </Fragment>
            ) : (
              <div key={index}>{trans(navLink.title)}</div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
