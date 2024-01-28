import RangeSliderInput from "@/components/RangeSlider/RangeSliderInput";
import { Filter } from "@/modules/properties/utils/types";
import { trans } from "@mongez/localization";
import { advancedSearchFilterAtom } from "../../atoms/advanced-search-filter-atom";

type AdvancedSearchRangesSectionProps = {
  filters: Filter[];
};

export default function AdvancedSearchRangesSection({
  filters,
}: AdvancedSearchRangesSectionProps) {
  const price = filters.find((filter) => filter.type === "price");
  const area = filters.find((filter) => filter.type === "area");

  const handlePriceChange = (values: number[]) => {
    advancedSearchFilterAtom.merge({
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const handleAreaChange = (values: number[]) => {
    advancedSearchFilterAtom.merge({
      minArea: values[0],
      maxArea: values[1],
    });
  };

  return (
    <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
      <div className="flex-1 space-y-4">
        <div className="text-xl font-medium">{trans("price")}</div>
        <RangeSliderInput
          min={0}
          max={price?.data.max}
          handleFilterChange={handlePriceChange}
        />
      </div>
      <div className="flex-1 space-y-4">
        <div className="text-xl font-medium">{trans("area")}</div>
        <RangeSliderInput
          min={0}
          max={area?.data.max}
          handleFilterChange={handleAreaChange}
        />
      </div>
    </div>
  );
}
