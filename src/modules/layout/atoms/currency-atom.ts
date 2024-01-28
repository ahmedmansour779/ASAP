import { Currency } from "@/modules/home/utils/types";
import { atom } from "@mongez/react-atom";

type CurrencyAtom = {
  selectedCurrency: Currency;
  baseCurrency: Currency;
  currencies: Currency[];
};

export const currencyAtom = atom<CurrencyAtom>({
  key: "currency",
  default: {
    currencies: [],
  },
});
