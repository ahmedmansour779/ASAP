"use client";

import Loader from "@/components/Loader";
import NoData from "@/components/NoData";
import { trans } from "@mongez/localization";
import { GenericObject } from "@mongez/reinforcements";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPropertiesFilters } from "../../services/filer-services";
import { Filter, FilterType } from "../../utils/types";
import CheckboxFilter from "./CheckboxFilter";
import RadioFilter from "./RadioFilter";
import SliderFilter from "./SliderFilter";

export type FilterProps = {
  filter: Filter;
  filterDictionary: GenericObject;
  filterActiveFilters: string[];
};

const filtersMap: Record<FilterType, React.FC<FilterProps>> = {
  amenities: CheckboxFilter,
  type: RadioFilter,
  city: RadioFilter,
  furnishing: RadioFilter,
  model: RadioFilter,
  view: RadioFilter,
  compound: RadioFilter,
  price: SliderFilter,
  area: SliderFilter,
  bedroom: SliderFilter,
  bathroom: SliderFilter,
};

let storedFilters: Filter[] = [];
const filterDictionary = new Map();

export default function FiltersSidebar() {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);

  useEffect(() => {
    if (storedFilters.length !== 0) {
      setFilters(storedFilters);
      return;
    }

    setIsLoading(true);
    setError(false);

    getPropertiesFilters()
      .then(({ data }) => {
        storedFilters = [...data.filters];
        setFilters(data.filters);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <aside className="hidden w-[280px] max-w-full space-y-6 rounded-xl p-6 shadow-[0px_20px_95px_rgba(0,0,0,0.08)] lg:block">
      {error ? (
        <NoData message={trans("couldNotGetData")} backToHome />
      ) : isLoading ? (
        <Loader />
      ) : (
        filters.map((filter, index) => {
          const FilterComponent = filtersMap[filter.type as FilterType];
          const filterActiveFilters = searchParams.getAll(filter.type);

          return FilterComponent ? (
            <FilterComponent
              key={index}
              filter={filter}
              filterDictionary={filterDictionary}
              filterActiveFilters={filterActiveFilters}
            />
          ) : null;
        })
      )}
    </aside>
  );
}
