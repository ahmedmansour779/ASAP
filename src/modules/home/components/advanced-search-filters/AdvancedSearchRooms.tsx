import SelectInput from "@/components/form/SelectInput";
import { Filter } from "@/modules/properties/utils/types";
import { Option } from "@/shared/types";
import { trans } from "@mongez/localization";

type AdvancedSearchRoomsProps = {
  filters: Filter[];
};

export default function AdvancedSearchRooms({
  filters,
}: AdvancedSearchRoomsProps) {
  const bedroom = filters?.find((filter) => filter.type === "bedroom");
  const bathroom = filters?.find((filter) => filter.type === "bathroom");

  const bedroomsOptions: Option[] = new Array(bedroom?.data.max)
    .fill({})
    .map((_, index) => ({
      label: `${index + 1}`,
      value: index + 1,
    }));

  const bathroomsOptions: Option[] = new Array(bathroom?.data.max)
    .fill({})
    .map((_, index) => ({
      label: `${index + 1}`,
      value: index + 1,
    }));

  return (
    <div className="space-y-4">
      <div className="text-xl font-medium">{trans("rooms")}</div>
      <div className="flex flex-wrap items-center gap-6">
        <SelectInput
          options={bedroomsOptions}
          name="bedrooms"
          placeholder={trans("bedrooms")}
          className="w-full items-center rounded-xl border bg-secondary-main/50 p-4"
        />
        <SelectInput
          options={bathroomsOptions}
          name="bathrooms"
          placeholder={trans("bathrooms")}
          className="w-full items-center rounded-xl border bg-secondary-main/50 p-4"
        />
      </div>
    </div>
  );
}
