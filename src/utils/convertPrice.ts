import { Currency } from "@/modules/home/utils/types";
import { formatPrice } from "./formatPrice";

type ConvertPriceOptions = {
  amount: number;
  from: Currency;
  to: Currency;
  format?: boolean;
};

export function convertPrice({
  amount,
  from,
  to,
  format = false,
}: ConvertPriceOptions) {
  const convertedAmount = (amount * to.value) / from.value;

  return format ? formatPrice(convertedAmount, to.code) : convertedAmount;
}
