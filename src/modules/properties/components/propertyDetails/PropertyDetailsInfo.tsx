import { Dash, LocationSolidIcon } from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import { PropertyDetails } from "../../utils/types";
import PropertyDetailsDetails from "./PropertyDetailsDetails";
import PropertyDetailsHeader from "./PropertyDetailsHeader";

type PropertyDetailsInfoProps = {
  property: PropertyDetails;
};

export default function PropertyDetailsInfo({
  property,
}: PropertyDetailsInfoProps) {
  const location =
    (property.district ? property.district?.name + ", " : "") +
    property.city.name;

  return (
    <div>
      <PropertyDetailsHeader property={property} />
      <div className="mt-16 flex flex-col items-start gap-6">
        <div className="inline-flex items-center justify-center gap-2 text-xl font-semibold tracking-[0.78px] text-primary-text sm:text-2xl">
          {trans("location")}
          <Dash />
        </div>
        <div className="flex gap-2">
          <LocationSolidIcon />
          <span className="text-lg">{location}</span>
        </div>
      </div>
      <div className="mt-10">
        <div className="inline-flex items-center justify-center gap-2 text-xl font-semibold tracking-[0.78px] text-primary-text sm:text-2xl">
          {trans("description")}
          <Dash />
        </div>
        <div
          className="mt-6 max-w-[800px] text-[17px] font-normal leading-[175%] text-[#4F4F4F]"
          dangerouslySetInnerHTML={{ __html: property.description }}
        />
      </div>
      <PropertyDetailsDetails property={property} />
    </div>
  );
}
