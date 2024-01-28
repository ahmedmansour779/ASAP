import { cn } from "@/lib/utils";
import { currencyAtom } from "@/modules/layout/atoms/currency-atom";
import { convertPrice } from "@/utils/convertPrice";
import { formatPrice } from "@/utils/formatPrice";
import { trans } from "@mongez/localization";
import React from "react";
import { Property, PropertyDetails } from "../utils/types";

type PropertyPriceProps = {
  property: Property | PropertyDetails;
  className?: string;
};

export default function PropertyPrice({
  property,
  className,
}: PropertyPriceProps) {
  const { selectedCurrency, baseCurrency } = currencyAtom.useValue();
  let priceValue: any = property.price;
  let currencyCode = selectedCurrency?.code;

  if (!property.currency) {
    priceValue = convertPrice({
      amount: property.price,
      from: baseCurrency,
      to: selectedCurrency,
      format: true,
    });
  } else {
    currencyCode = property.currency.code;
    priceValue = formatPrice(property.price);
  }

  return (
    <div
      className={cn(
        "text-xl font-bold capitalize text-primary-main",
        className
      )}>
      {priceValue} {currencyCode}
      {property.saleType === "rent" && (
        <span className="ml-1 text-base font-medium">/ {trans("month")}</span>
      )}
    </div>
  );
}
