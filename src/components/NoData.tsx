import { URLS } from "@/shared/urls";
import { trans } from "@mongez/localization";
import React from "react";
import BaseLink from "./BaseLink";

type NoDataProps = {
  backToHome?: boolean;
  message?: string;
};

export default function NoData({ message, backToHome }: NoDataProps) {
  return (
    <div className="container my-10 flex flex-col items-center justify-center gap-6 py-28 text-center text-2xl font-semibold capitalize">
      <div className="max-w-[380px] text-center">
        {message || trans("NoData")}
      </div>
      {backToHome && (
        <BaseLink
          href={URLS.home.href}
          className="w-60 max-w-full rounded-lg bg-primary-main px-6 py-4 text-sm text-primary-white hover:bg-primary-main/80">
          {trans("goToHome")}
        </BaseLink>
      )}
    </div>
  );
}
