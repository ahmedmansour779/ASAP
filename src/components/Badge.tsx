import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import BaseLink from "./BaseLink";

type BadgeProps = {
  children: ReactNode;
  url?: string;
  className?: string;
};

export default function Badge({ children, url, className }: BadgeProps) {
  return url ? (
    <BaseLink
      href={url}
      className={cn(
        "w-fit rounded-full bg-primary-lighter px-6 py-[10px] capitalize text-primary-main transition-colors hover:bg-primary-main hover:text-primary-white",
        className
      )}>
      {children}
    </BaseLink>
  ) : (
    <div
      className={cn(
        "w-fit rounded-full bg-primary-lighter px-6 py-[10px] capitalize text-primary-main",
        className
      )}>
      {children}
    </div>
  );
}
