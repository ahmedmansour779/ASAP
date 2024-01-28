"use client";

import { cn } from "@/lib/utils";
import { trans } from "@mongez/localization";
import { searchFilterAtom } from "../atoms/search-filter-atom";

type Tab = "any" | "rent" | "sale";

const tabsButtons: { label: string; value: Tab }[] = [
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
    value: "sale",
  },
];

export default function SearchTabs() {
  const tab = searchFilterAtom.use("saleType");

  return (
    <div className="flex items-center gap-4">
      {tabsButtons.map((tabButton, index) => (
        <button
          key={index}
          onClick={() => searchFilterAtom.change("saleType", tabButton.value)}
          className={cn(
            "rounded-t-xl bg-secondary-main p-3 text-xs font-medium transition-colors duration-300 hover:bg-primary-main hover:text-primary-white sm:min-w-[105px] sm:p-4",
            tab === tabButton.value && "bg-primary-main text-primary-white"
          )}>
          {trans(tabButton.label)}
        </button>
      ))}
    </div>
  );
}
