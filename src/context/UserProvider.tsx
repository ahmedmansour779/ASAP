"use client";

import { Currency } from "@/modules/home/utils/types";
import { currencyAtom } from "@/modules/layout/atoms/currency-atom";
import { User, userAtom } from "@/modules/profile/atoms/user-atom";
import { useEffect } from "react";

export type UserProviderProps = {
  user: User;
  baseCurrency: Currency | undefined;
  currencies: Currency[];
  defaultCurrency: Currency | undefined;
  children?: React.ReactNode;
};

export default function UserProvider({
  user,
  baseCurrency,
  currencies,
  defaultCurrency,
  children,
}: UserProviderProps) {
  useEffect(() => {
    userAtom.update(user);
    currencyAtom.merge({
      baseCurrency,
      selectedCurrency: defaultCurrency,
      currencies,
    });
  }, [user, baseCurrency, currencies, defaultCurrency]);

  return <>{children}</>;
}
