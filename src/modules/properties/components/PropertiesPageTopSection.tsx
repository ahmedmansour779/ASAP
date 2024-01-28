"use client";

import { storedSortOptions } from "@/shared/constants";
import { FilterIcon } from "@/shared/icons/icons";
import { cache } from "@/utils/cache/cache-configurations";
import { useEffect, useState } from "react";
import { sideFilerPopupAtom } from "../atoms/properties-side-filter-atom";
import { Filter, SortOption } from "../utils/types";
import SearchProperties from "./SearchProperties";
import SortBy from "./SortBy";

type PropertiesPageTopSectionProps = {
  sortOptions: SortOption[];
  filters: Filter[];
};

export default function PropertiesPageTopSection({
  sortOptions,
}: PropertiesPageTopSectionProps) {
  const [options, setOptions] = useState<SortOption[]>(sortOptions);

  useEffect(() => {
    const cachedOptions: SortOption[] = cache().get(storedSortOptions);

    if (!cachedOptions) {
      cache().set(storedSortOptions, sortOptions);
      return;
    }

    setOptions(cachedOptions);
  }, [sortOptions]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-8">
      <SearchProperties />
      <div className="order-1 flex items-center gap-4 lg:order-2">
        <SortBy sortOptions={options} />
        <button
          onClick={sideFilerPopupAtom.open}
          className="rounded-xl bg-primary-main p-2 lg:hidden">
          <FilterIcon />
        </button>
      </div>
    </div>
  );
}
