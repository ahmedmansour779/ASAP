"use client";

import { useMedia } from "@/hooks/useMedia";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import LanguageButton from "../../components/LanguageButton";
import MyAccountButton, {
  RegisterLinks,
  UserActions,
} from "../../components/MyAccountButton";
import CurrencyButton from "./CurrencyButton";
import HeaderWishListButton from "./HeaderWishListButton";

export default function ActionButtons({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const { isSmallerScreen } = useMedia(1024);

  return (
    <div
      className={cn(
        "mx-auto flex w-[290px] max-w-full flex-col items-center gap-3 lg:mx-0 lg:w-auto lg:flex-row",
        className
      )}>
      {!isSmallerScreen ? (
        <>
          <LanguageButton />
          {/* <HeaderSearchButton /> */}
          <CurrencyButton />
          <HeaderWishListButton />
          <MyAccountButton />
        </>
      ) : (
        <>
          <UserActions />
          <RegisterLinks />
        </>
      )}
    </div>
  );
}
