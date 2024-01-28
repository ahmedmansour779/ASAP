"use client";

import { headerMenuAtom } from "@/atoms/header-menu-atom";
import { useMedia } from "@/hooks/useMedia";
import { cn } from "@/lib/utils";
import { MenuIcon } from "@/shared/icons/icons";
import { useEffect } from "react";
import LanguageButton from "../../components/LanguageButton";
import NavLinks from "../../components/NavLinks";
import ActionButtons from "./ActionButtons";
import CurrencyButton from "./CurrencyButton";
import HeaderWishListButton from "./HeaderWishListButton";

export default function Mobile() {
  const isMenuOpen = headerMenuAtom.use("opened");
  const { isSmallerScreen } = useMedia();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="flex items-center gap-4 ltr:ml-auto rtl:mr-auto ">
        {isSmallerScreen && <LanguageButton />}
        <button
          onClick={headerMenuAtom.toggle}
          className="rounded-xl bg-primary-lighter px-2.5 py-3 transition-colors lg:hidden">
          <MenuIcon />
        </button>
      </div>
      <div
        className={cn(
          "relative w-full overflow-hidden transition-all duration-300 lg:hidden",
          isMenuOpen ? "mt-8 h-[462px] pt-4" : "h-0"
        )}>
        <div className="absolute top-4 flex items-center gap-3 ltr:right-4 rtl:left-0">
          {/* <HeaderSearchButton /> */}
          <CurrencyButton onClose={headerMenuAtom.close} />
          <HeaderWishListButton />
        </div>
        <NavLinks />
        <div className="mt-8 flex w-full gap-2 border-t-2 border-primary-border pb-2 pt-8">
          <ActionButtons />
        </div>
      </div>
    </>
  );
}
