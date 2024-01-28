import RangeSliderInput from "@/components/RangeSlider/RangeSliderInput";
import { GenericObject, ucfirst } from "@mongez/reinforcements";
import { usePathname, useRouter } from "next/navigation";
import { Filter } from "../../utils/types";

type SliderFilterProps = {
  filter: Filter;
  filterDictionary: GenericObject;
};

export default function SliderFilter({
  filter,
  filterDictionary,
}: SliderFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleRangeFilterChange = (values: number[]) => {
    filterDictionary.set(`min${ucfirst(filter.type)}`, values[0]);
    filterDictionary.set(`max${ucfirst(filter.type)}`, values[1]);

    const searchparams = new URLSearchParams(filterDictionary);

    router.push(`${pathname}?${searchparams}`);
  };

  return filter.data ? (
    <div className="space-y-4 border-b pb-6 last-of-type:border-b-0 last-of-type:pb-0">
      <h2 className="text-lg font-semibold capitalize">{filter.text}</h2>
      <div>
        <RangeSliderInput
          handleFilterChange={handleRangeFilterChange}
          min={filter.data.min}
          max={filter.data.max}
        />
      </div>
    </div>
  ) : null;
}
