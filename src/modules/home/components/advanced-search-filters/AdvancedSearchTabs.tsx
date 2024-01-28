import { cn } from "@/lib/utils";
import { trans } from "@mongez/localization";
import React from "react";
import { advancedSearchFilterAtom } from "../../atoms/advanced-search-filter-atom";

const tabsButtons = [
  {
    label: "anyEstate",
    value: "any",
  },
  {
    label: "forRent",
    value: "rent",
  },
  {
    label: "forSale",
    value: "buy",
  },
];

export default function AdvancedSearchTabs() {
  const tab = advancedSearchFilterAtom.use("saleType");

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      {tabsButtons.map((tabButton, index) => (
        <button
          type="button"
          key={index}
          onClick={() =>
            advancedSearchFilterAtom.change("saleType", tabButton.value)
          }
          className={cn(
            "rounded-xl bg-secondary-main p-3 text-xs font-medium transition-colors duration-300 hover:bg-primary-main hover:text-primary-white sm:min-w-[105px] sm:p-4",
            tab === tabButton.value && "bg-primary-main text-primary-white"
          )}>
          {trans(tabButton.label)}
        </button>
      ))}
    </div>
  );
}
