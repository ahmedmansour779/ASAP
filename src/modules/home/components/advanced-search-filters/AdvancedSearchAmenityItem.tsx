import { SuccessIcon } from "@/shared/icons/icons";
import Image from "next/image";
import { advancedSearchFilterAtom } from "../../atoms/advanced-search-filter-atom";
import { Amenity } from "../../utils/types";

type AdvancedSearchAmenityItemProps = {
  amenity: Amenity;
  activeAmenity: boolean;
};

export default function AdvancedSearchAmenityItem({
  amenity,
  activeAmenity,
}: AdvancedSearchAmenityItemProps) {
  const storedIds = advancedSearchFilterAtom.use("amenities");

  const handleAddAmenity = (id: string) => {
    const isAmenityStored = storedIds.some((storedId) => storedId === id);

    if (isAmenityStored) {
      const updatedAmenities = storedIds.filter((amenity) => amenity !== id);
      advancedSearchFilterAtom.change("amenities", updatedAmenities);

      return;
    }

    advancedSearchFilterAtom.change("amenities", [...storedIds, id]);
  };

  return (
    <div
      onClick={() => handleAddAmenity(amenity.amenity.id.toString())}
      className="flex min-w-[200px] cursor-pointer select-none items-center gap-2 rounded-xl border bg-primary-main bg-opacity-10 px-6 py-4">
      <div className="h-8 w-8 rounded-full bg-primary-main bg-opacity-5">
        <Image
          src={amenity.amenity.icon.url}
          alt={amenity.amenity.name}
          width={40}
          height={40}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="flex flex-1 items-center justify-between gap-4 text-sm">
        <div>{amenity.amenity.name}</div>
        <div className="h-5 w-5 rounded-full bg-primary-white">
          {activeAmenity && (
            <SuccessIcon className="h-full w-full text-primary-main" />
          )}
        </div>
      </div>
    </div>
  );
}
