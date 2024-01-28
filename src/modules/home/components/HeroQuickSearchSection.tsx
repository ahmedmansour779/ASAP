"use client";

import { useMedia } from "@/hooks/useMedia";
import {
  getPropertyCompounds,
  getPropertyDistricts,
  getPropertyTypes,
} from "@/modules/properties/services/client-properties-services";
import { SearchArrowIcon, SearchIcon } from "@/shared/icons/icons";
import { URLS } from "@/shared/urls";
import { getCurrentLocaleCode, trans } from "@mongez/localization";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { useRouter } from "next/navigation";
import { advancedSearchStateAtom } from "../atoms/advanced-search-state-atom";
import { searchFilterAtom } from "../atoms/search-filter-atom";
import SearchTabs from "./SearchTabs";
import HeroSearchSelectInputWithSearch from "./form/HeroSearchSelectInputWithSearch";

export default function HeroQuickSearchSection() {
  const router = useRouter();
  const currentLocale = getCurrentLocaleCode();
  const saleType = searchFilterAtom.use("saleType");

  const { isSmallerScreen } = useMedia();

  const handleSubmit = ({ values }: FormSubmitOptions) => {
    if (!values.type && !values.district && !values.compound && !saleType) {
      return;
    }

    const searchParams = new URLSearchParams(values);
    const url = saleType === "any" ? URLS.properties.href : URLS[saleType].href;

    router.push(`/${currentLocale}${url}?${searchParams}`);
  };

  return (
    <div className="relative">
      <SearchTabs />
      <div className="relative max-w-[1000px] rounded-xl bg-secondary-main/40 px-8 py-6 backdrop-blur ltr:rounded-tl-none rtl:rounded-tr-none ltr:lg:pr-[120px] rtl:lg:pl-[120px]">
        <Form
          className="flex shrink-0 flex-col items-center gap-6 lg:flex-row lg:gap-8"
          onSubmit={handleSubmit}>
          <HeroSearchSelectInputWithSearch
            endpoint={getPropertyTypes}
            type="propertyTypes"
            className="w-full border-b border-secondary-darker pb-4 lg:w-auto lg:border-0 lg:px-4 lg:py-2"
            placeholder={trans("propertyType")}
            label={trans("type")}
            name="type"
          />
          <HeroSearchSelectInputWithSearch
            endpoint={getPropertyDistricts}
            type="districts"
            className="w-full border-b border-secondary-darker pb-4 lg:w-auto lg:border-0 lg:px-4 lg:py-2"
            placeholder={trans("district")}
            label={trans("district")}
            name="district"
          />
          <HeroSearchSelectInputWithSearch
            type="compounds"
            endpoint={getPropertyCompounds}
            className="w-full border-b border-secondary-darker pb-4 lg:w-auto lg:border-0 lg:px-4 lg:py-2"
            placeholder={trans("compound")}
            label={trans("compound")}
            name="compound"
          />
          {isSmallerScreen ? (
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-main px-6 py-4 text-primary-white transition-colors hover:bg-primary-main/80"
              aria-label="search">
              <SearchIcon /> {trans("search")}
            </button>
          ) : (
            <button
              className="absolute top-0 flex h-full w-[100px] items-center justify-center bg-primary-main text-primary-white transition-colors hover:bg-primary-main/80 ltr:right-0 ltr:rounded-r-xl rtl:left-0 rtl:rounded-l-xl"
              title="search"
              aria-label="search">
              <SearchIcon className="h-6 w-6" />
            </button>
          )}
        </Form>
        <div className="absolute top-full z-0 flex flex-col items-center gap-4 rtl:right-24">
          <SearchArrowIcon />
          <button
            onClick={advancedSearchStateAtom.open}
            className="font-medium capitalize underline transition-colors hover:text-primary-text">
            {trans("advancedSearch")}
          </button>
        </div>
      </div>
    </div>
  );
}
