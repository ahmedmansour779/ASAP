"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { NavigateArrowIcon } from "@/shared/icons/icons";
import { cache } from "@/utils/cache/cache-configurations";
import { useEffect, useRef } from "react";
import { currencyAtom } from "../../atoms/currency-atom";

export type Currency = "EGP" | "USD";

type CurrencyButtonProps = {
  onClose?: () => void;
};

export default function CurrencyButton({ onClose }: CurrencyButtonProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const selectedCurrency = currencyAtom.use("selectedCurrency");
  const currencies = currencyAtom.use("currencies");

  const { setIsOpen, isOpen } = useClickOutside(menuRef);

  useEffect(() => {
    const cachedCurrency = cache().get("currency");

    if (cachedCurrency) {
      currencyAtom.change("selectedCurrency", cachedCurrency as Currency);
    } else {
      cache().set("currency", "egp");
    }
  }, []);

  return (
    <div ref={menuRef} className="relative w-full shrink-0 lg:w-auto">
      <button
        className="flex w-full items-center gap-3 rounded-full bg-secondary-main px-4 py-2.5"
        title="My account"
        aria-label="my account"
        onClick={() => setIsOpen(!isOpen)}>
        {selectedCurrency?.code}
        <NavigateArrowIcon
          className={cn(
            "h-2.5 w-2.5 rotate-180 transition-transform",
            isOpen && "rotate-0"
          )}
        />
      </button>
      {isOpen && (
        <ul className="absolute top-[calc(100%+10px)] min-w-[200px] animate-show-menu space-y-2 rounded-xl bg-primary-white p-2 shadow-[0px_15px_66px_0px_rgba(0,0,0,0.21)] ltr:right-0 rtl:left-0">
          {currencies?.map((currency, index) => (
            <li key={index} className="">
              <button
                className={cn(
                  "w-full rounded-lg px-4 py-2 transition-colors hover:bg-secondary-main",
                  currency.code === selectedCurrency.code && "bg-secondary-main"
                )}
                onClick={() => {
                  cache().set("currency", currency);
                  currencyAtom.change("selectedCurrency", currency);
                  onClose?.();
                  setIsOpen(false);
                }}>
                {currency.code}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
