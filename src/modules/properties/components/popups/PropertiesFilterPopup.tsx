"use client";

import Loader from "@/components/Loader";
import NoData from "@/components/NoData";
import ClosePopupButton from "@/components/popups/ClosePopup";
import Modal from "@/modules/layout/components/Modal";
import { trans } from "@mongez/localization";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { sideFilerPopupAtom } from "../../atoms/properties-side-filter-atom";
import { getPropertiesFilters } from "../../services/filer-services";
import { Filter } from "../../utils/types";
import CheckboxFilter from "../SideFilter/CheckboxFilter";
import { FilterProps } from "../SideFilter/FiltersSidebar";
import RadioFilter from "../SideFilter/RadioFilter";
import SliderFilter from "../SideFilter/SliderFilter";

type FilterType =
  | "amenities"
  | "type"
  | "city"
  | "furnishing"
  | "model"
  | "view"
  | "compound"
  | "price"
  | "area"
  | "bedroom"
  | "bathroom";

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

const filterDictionary = new Map();
const storedFilters: Filter[] = [];

export default function PropertiesFilterPopup() {
  const searchParams = useSearchParams();
  const opened = sideFilerPopupAtom.use("opened");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);

  useEffect(() => {
    if (storedFilters.length !== 0) {
      setFilters(storedFilters);
      return;
    }

    if (opened) {
      setIsLoading(true);
      setError(false);

      getPropertiesFilters()
        .then(({ data }) => {
          setFilters(data.filters);
          storedFilters.push(...data.filters);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [opened]);

  return (
    <Modal opened={opened}>
      <div className="h-full w-[800px] max-w-full rounded-xl bg-primary-white px-6 py-4">
        <ClosePopupButton onClose={sideFilerPopupAtom.close} />

        <div className="max-h-[500px] max-w-full space-y-6 overflow-auto rounded-xl p-6">
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
        </div>
      </div>
    </Modal>
  );
}
