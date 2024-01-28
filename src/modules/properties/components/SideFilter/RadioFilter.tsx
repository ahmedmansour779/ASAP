import { GenericObject } from "@mongez/reinforcements";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FilterProps } from "./FiltersSidebar";

type RadioItemProps = {
  filter: {
    [key: string]: any;
  };
  originalType: string;
  filterType: string;
  filterDictionary: GenericObject;
  isActive: boolean;
};

function RadioItem({
  filter,
  filterType,
  originalType,
  filterDictionary,
  isActive,
}: RadioItemProps) {
  const [isChecked, setIsChecked] = useState(isActive || false);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="flex items-center gap-2">
      <input
        id={filter[filterType]?.name}
        name={filterType}
        type="radio"
        checked={isChecked}
        onChange={() => {
          filterDictionary.set(originalType, filter[filterType].id);

          setIsChecked(!isChecked);
          const searchparams = new URLSearchParams(filterDictionary);

          router.push(`${pathname}?${searchparams}`);
        }}
      />
      <label
        htmlFor={filter[filterType]?.name}
        className="cursor-pointer capitalize">
        {filter[filterType]?.name}
      </label>
      <span className="ltr:ml-auto rtl:mr-auto">({filter?.total})</span>
    </li>
  );
}

export default function RadioFilter({
  filter,
  filterDictionary,
  filterActiveFilters,
}: FilterProps) {
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
            <RadioItem
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
