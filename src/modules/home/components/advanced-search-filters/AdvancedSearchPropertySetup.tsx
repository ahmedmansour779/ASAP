import {
  getPropertyFurnishings,
  getPropertyModels,
  getPropertyTypes,
  getPropertyViews,
} from "@/modules/properties/services/client-properties-services";
import { trans } from "@mongez/localization";
import HeroSearchSelectInputWithSearch from "../form/HeroSearchSelectInputWithSearch";

export default function AdvancedSearchPropertySetup() {
  return (
    <div className="space-y-4">
      <div className="text-xl font-medium">{trans("propertySetup")}</div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <HeroSearchSelectInputWithSearch
          endpoint={getPropertyTypes}
          type="propertyTypes"
          className="w-full items-center rounded-xl border bg-secondary-main/50 p-4"
          placeholder={trans("propertyType")}
          name="type"
        />
        <HeroSearchSelectInputWithSearch
          type="records"
          endpoint={getPropertyViews}
          className="w-full items-center rounded-xl border bg-secondary-main/50 p-4"
          placeholder={trans("views")}
          name="views"
        />
        <HeroSearchSelectInputWithSearch
          type="propertyFurnishings"
          endpoint={getPropertyFurnishings}
          className="w-full items-center rounded-xl border bg-secondary-main/50 p-4"
          placeholder={trans("furnishings")}
          name="furnishings"
        />
        <HeroSearchSelectInputWithSearch
          type="propertyModels"
          endpoint={getPropertyModels}
          className="w-full items-center rounded-xl border bg-secondary-main/50 p-4"
          placeholder={trans("models")}
          name="models"
        />
      </div>
    </div>
  );
}
