import {
  getPropertyCities,
  getPropertyCompounds,
  getPropertyDistricts,
  getPropertyNearByPlaces,
} from "@/modules/properties/services/client-properties-services";
import { trans } from "@mongez/localization";
import React from "react";
import HeroSearchSelectInput from "../form/HeroSearchSelectInput";

export default function AdvancedSearchAddress() {
  return (
    <div className="space-y-4">
      <div className="text-xl font-medium">{trans("address")}</div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <HeroSearchSelectInput
          endpoint={getPropertyDistricts}
          type="districts"
          className="w-full items-center rounded-xl border bg-secondary-main/50 p-4"
          placeholder={trans("district")}
          name="district"
        />
        <HeroSearchSelectInput
          type="compounds"
          endpoint={getPropertyCompounds}
          className="w-full items-center rounded-xl border bg-secondary-main/50 p-4"
          placeholder={trans("compound")}
          name="compound"
        />
        <HeroSearchSelectInput
          type="cities"
          endpoint={getPropertyCities}
          className="w-full items-center rounded-xl border bg-secondary-main/50 p-4"
          placeholder={trans("city")}
          name="city"
        />
        <HeroSearchSelectInput
          type="nearByPlaces"
          endpoint={getPropertyNearByPlaces}
          className="w-full items-center rounded-xl border bg-secondary-main/50 p-4"
          placeholder={trans("nearByPlaces")}
          name="nearByPlaces"
        />
      </div>
    </div>
  );
}
