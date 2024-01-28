"use client";

import { useLocaleCode } from "@/hooks/useLocale";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

type BaseLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export default function BaseLink({ href, children, ...props }: BaseLinkProps) {
  const localeCode = useLocaleCode();
  const updatedHref = `/${localeCode}${href}`;

  return (
    <Link {...props} href={updatedHref}>
      {children}
    </Link>
  );
}
