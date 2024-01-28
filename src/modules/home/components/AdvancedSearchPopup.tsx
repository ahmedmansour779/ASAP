"use client";

import Loader from "@/components/Loader";
import NoData from "@/components/NoData";
import Separator from "@/components/Separator";
import SubmitButton from "@/components/form/SubmitButton";
import ClosePopupButton from "@/components/popups/ClosePopup";
import Modal from "@/modules/layout/components/Modal";
import { getPropertiesFilters } from "@/modules/properties/services/filer-services";
import { Filter } from "@/modules/properties/utils/types";
import { URLS } from "@/shared/urls";
import { getCurrentLocaleCode, trans } from "@mongez/localization";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { advancedSearchFilterAtom } from "../atoms/advanced-search-filter-atom";
import { advancedSearchStateAtom } from "../atoms/advanced-search-state-atom";
import AdvancedSearchAddress from "./advanced-search-filters/AdvancedSearchAddress";
import AdvancedSearchAmenities from "./advanced-search-filters/AdvancedSearchAmenities";
import AdvancedSearchPropertySetup from "./advanced-search-filters/AdvancedSearchPropertySetup";
import AdvancedSearchRangesSection from "./advanced-search-filters/AdvancedSearchRangesSection";
import AdvancedSearchRooms from "./advanced-search-filters/AdvancedSearchRooms";
import AdvancedSearchTabs from "./advanced-search-filters/AdvancedSearchTabs";
import AdvancedSearchGeneralFilter from "./advanced-search-filters/GeneralFilter";

const storedFilters: Filter[] = [];

export default function AdvancedSearchPopup() {
  const router = useRouter();
  const currentLocale = getCurrentLocaleCode();
  const saleType = advancedSearchFilterAtom.use("saleType");
  const opened = advancedSearchStateAtom.use("opened");

  const [filters, setFilters] = useState<Filter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = ({ values }: FormSubmitOptions) => {
    const { amenities, minArea, minPrice, maxArea, maxPrice } =
      advancedSearchFilterAtom.value;
    const url = saleType === "any" ? URLS.properties.href : URLS[saleType].href;

    const searchParams = new URLSearchParams({
      ...values,
      minArea: minArea?.toString(),
      minPrice: minPrice?.toString(),
      maxArea: maxArea?.toString(),
      maxPrice: maxPrice?.toString(),
    });

    amenities.forEach((id) => searchParams.append("amenities", id));

    advancedSearchStateAtom.close();
    router.push(`/${currentLocale}${url}?${searchParams}`);
  };

  useEffect(() => {
    if (opened) {
      advancedSearchFilterAtom.reset();

      if (storedFilters.length !== 0) {
        setFilters(storedFilters);
        return;
      }

      setIsLoading(true);
      setIsError(false);

      getPropertiesFilters()
        .then(({ data }) => {
          storedFilters.push(...data.filters);
          setFilters(data.filters);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [opened]);

  return (
    <Modal opened={opened} onClickCloseButton={advancedSearchStateAtom.close}>
      <div className="w-[800px] max-w-full rounded-xl bg-primary-white p-4 md:p-8">
        <ClosePopupButton
          onClose={advancedSearchStateAtom.close}
          title={trans("advanceSearch")}
        />
        {isError ? (
          <NoData />
        ) : isLoading ? (
          <Loader />
        ) : (
          <Form
            onSubmit={handleSubmit}
            className="max-h-[400px] space-y-8 overflow-auto">
            <AdvancedSearchTabs />
            <AdvancedSearchGeneralFilter />
            <Separator />
            <AdvancedSearchRangesSection filters={filters} />
            <Separator />
            <AdvancedSearchPropertySetup />
            <Separator />
            <AdvancedSearchRooms filters={filters} />
            <Separator />
            <AdvancedSearchAddress />
            <Separator />
            <AdvancedSearchAmenities filters={filters} />
            <SubmitButton label={trans("search")} />
          </Form>
        )}
      </div>
    </Modal>
  );
}
