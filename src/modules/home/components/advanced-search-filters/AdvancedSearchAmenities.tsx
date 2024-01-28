import { Filter } from "@/modules/properties/utils/types";
import { trans } from "@mongez/localization";
import { advancedSearchFilterAtom } from "../../atoms/advanced-search-filter-atom";
import { Amenity } from "../../utils/types";
import AdvancedSearchAmenityItem from "./AdvancedSearchAmenityItem";

type AdvancedSearchAmenitiesProps = {
  filters: Filter[];
};

export default function AdvancedSearchAmenities({
  filters,
}: AdvancedSearchAmenitiesProps) {
  const amenities = filters?.find((filter) => filter.type === "amenities");
  const selectedIds = advancedSearchFilterAtom.use("amenities");

  return (
    <div className="space-y-4">
      <div className="text-xl font-medium">{trans("amenities")}</div>
      <div className="flex flex-wrap justify-center gap-6 sm:justify-normal">
        {amenities?.data?.map((amenity: Amenity, index: number) => {
          const activeAmenity = selectedIds.some(
            (selectedId) => selectedId === amenity.amenity.id.toString()
          );

          return (
            <AdvancedSearchAmenityItem
              key={index}
              amenity={amenity}
              activeAmenity={activeAmenity}
            />
          );
        })}
      </div>
    </div>
  );
}
