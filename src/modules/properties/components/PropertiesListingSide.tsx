import Pagination from "@/components/Pagination";
import Separator from "@/components/Separator";
import { NotFoundIcon } from "@/shared/icons/icons";
import { PaginationInfo } from "@/shared/types";
import { trans } from "@mongez/localization";
import React from "react";
import { Filter, Property, SortOption } from "../utils/types";
import FeaturedSection from "./FeaturedSection";
import PropertiesList from "./PropertiesList";
import PropertiesPageTopSection from "./PropertiesPageTopSection";
import FiltersSidebar from "./SideFilter/FiltersSidebar";

type PropertiesListingSideProps = {
  filters: Filter[];
  sortOptions: SortOption[];
  properties: Property[];
  featuredProperties: Property[];
  paginationInfo: PaginationInfo;
};

export default function PropertiesListingSide({
  filters,
  sortOptions,
  featuredProperties,
  paginationInfo,
  properties,
}: PropertiesListingSideProps) {
  return (
    <div className="container my-20 flex items-start gap-8">
      <FiltersSidebar />
      <div className="flex flex-1 flex-col gap-6">
        <PropertiesPageTopSection filters={filters} sortOptions={sortOptions} />
        <section className="mt-10 flex flex-col gap-16">
          {featuredProperties.length > 0 && (
            <>
              <FeaturedSection properties={featuredProperties} />
              <Separator />
            </>
          )}
          {properties.length > 0 ? (
            <>
              <PropertiesList properties={properties} />
              {paginationInfo.pages > 1 && (
                <Pagination paginationInfo={paginationInfo} />
              )}
            </>
          ) : (
            <div className="my-20 flex flex-col items-center justify-center gap-8">
              <NotFoundIcon />
              <div className="text-2xl font-semibold">
                {trans("noPropertiesFound")}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
