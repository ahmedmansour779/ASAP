import { cn } from "@/lib/utils";
import { CheckIcon } from "@/shared/icons/icons";
import { updateSearchParams } from "@/utils/utils";
import { GenericObject } from "@mongez/reinforcements";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { URLSearchParams } from "url";
import { Filter } from "../../utils/types";

type CheckboxFilterProps = {
  filter: Filter;
  filterDictionary: GenericObject;
  filterActiveFilters: string[];
};

type CheckboxItemProps = {
  filter: {
    [key: string]: any;
  };
  originalType: string;
  filterType: string;
  filterDictionary: GenericObject;
  isActive: boolean;
};

function CheckboxItem({
  filter,
  filterDictionary,
  filterType,
  originalType,
  isActive,
}: CheckboxItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isChecked, setIsChecked] = useState(isActive || false);

  const handleCheckChange = () => {
    let updatedSearchParams: URLSearchParams;

    const newAmenityId = filter[filterType].id?.toString();
    const amenityIds = searchParams.getAll(originalType);
    const isExists = amenityIds.some((amenity) => amenity === newAmenityId);

    setIsChecked(!isChecked);

    if (isExists) {
      const updatedAmenityIds = amenityIds.filter(
        (amenityId) => amenityId !== newAmenityId
      );
      updatedSearchParams = updateSearchParams(
        updatedAmenityIds,
        originalType,
        filterDictionary
      );
    } else {
      amenityIds.push(newAmenityId);

      updatedSearchParams = updateSearchParams(
        amenityIds,
        originalType,
        filterDictionary
      );
    }

    router.push(`${pathname}?${updatedSearchParams}`);
  };

  return (
    <li
      onClick={handleCheckChange}
      className="relative flex items-center gap-2">
      <span
        className={cn(
          "h-5 w-5 shrink-0 rounded-md border p-0.5",
          isChecked && "border-primary-main bg-primary-main text-primary-white"
        )}>
        {isChecked && <CheckIcon className="h-full w-full" />}
      </span>
      <div className="cursor-pointer capitalize">
        {filter[filterType]?.name}
      </div>
      <span className="ltr:ml-auto rtl:mr-auto">({filter?.total})</span>
    </li>
  );
}

export default function CheckboxFilter({
  filter,
  filterDictionary,
  filterActiveFilters,
}: CheckboxFilterProps) {
  const { type, data, text } = filter;

  return data.length > 0 ? (
    <div className="space-y-4 border-b pb-6 last-of-type:border-b-0 last-of-type:pb-0">
      <h2 className="text-lg font-semibold capitalize">{text}</h2>
      <ul className="flex h-fit max-h-[280px] flex-col gap-4 overflow-auto">
        {data?.map((item: GenericObject, index: number) => {
          const filterType = type === "amenities" ? "amenity" : type;
          const isActive = filterActiveFilters.some(
            (activeFilter) => activeFilter === item[filterType]?.id?.toString()
          );

          return (
            <CheckboxItem
              key={index}
              filter={item}
              filterType={filterType}
              originalType={type}
              filterDictionary={filterDictionary}
              isActive={isActive}
            />
          );
        })}
      </ul>
    </div>
  ) : null;
}
