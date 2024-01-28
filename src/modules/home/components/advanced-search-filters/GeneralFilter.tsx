import TextInput from "@/components/form/TextInput";
import { trans } from "@mongez/localization";

export default function AdvancedSearchGeneralFilter() {
  return (
    <div className="space-y-4">
      <div className="text-xl font-medium">{trans("general")}</div>
      <div className="flex flex-wrap items-center gap-6">
        <TextInput
          name="id"
          type="number"
          placeholder={`#${trans("id")}`}
          min={0}
          className="bg-secondary-main/50"
        />
        <TextInput
          name="floorNumber"
          type="number"
          placeholder={trans("floorNumber")}
          min={0}
          className="bg-secondary-main/50"
        />
      </div>
    </div>
  );
}
