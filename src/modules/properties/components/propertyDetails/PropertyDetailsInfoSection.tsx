"use client";

import { Settings } from "@/modules/home/utils/types";
import { Dash } from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import { GoogleMap } from "@mongez/react-google-map";
import { PropertyDetails } from "../../utils/types";
import PropertyDetailsAmenities from "./PropertyDetailsAmenities";
import PropertyDetailsInfo from "./PropertyDetailsInfo";
import PropertyDetailsInstallment from "./PropertyDetailsInstallment";

type PropertyDetailsInfoSectionProps = {
  property: PropertyDetails;
  settings: Settings;
};

export default function PropertyDetailsInfoSection({
  property,
  settings,
}: PropertyDetailsInfoSectionProps) {
  return (
    <div>
      <PropertyDetailsInfo property={property} />
      <PropertyDetailsAmenities amenities={property.amenities} />
      <PropertyDetailsInstallment property={property} />
      {(property.location || property.locationUrl) && (
        <div className="mt-16 flex flex-col items-start">
          <div className="flex items-center justify-center gap-2 text-xl font-semibold tracking-[0.78px] text-primary-text sm:text-2xl">
            {trans("locationOnTheMap")}
            <Dash />
          </div>
          <div className="mt-6 w-full overflow-hidden rounded-3xl">
            {property.location ? (
              <GoogleMap
                apiKey={settings?.integrations?.googleMap}
                center={{
                  lat: property.location.lat,
                  lng: property.location.lng,
                }}
              />
            ) : (
              <iframe
                src={property.locationUrl}
                className="w-full"
                height={276}
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
