import { Dash } from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import { PropertyDetails } from "../../utils/types";

type PropertyDetailsDetailsProps = {
  property: PropertyDetails;
};

type DetailItemProps = {
  content: string | number;
  title: string;
};

function DetailItem({ content, title }: DetailItemProps) {
  return (
    <div className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl border border-solid border-primary-border bg-secondary-main px-4 py-2 text-primary-text sm:w-auto sm:min-w-[176px]">
      <div className="text-center text-sm font-medium leading-[176%]">
        {title}: <span className="font-normal">{content}</span>
      </div>
    </div>
  );
}

export default function PropertyDetailsDetails({
  property,
}: PropertyDetailsDetailsProps) {
  return (
    <div className="mt-16">
      <div className="inline-flex items-center justify-center gap-2 text-xl font-semibold tracking-[0.78px] text-primary-text sm:text-2xl">
        {trans("propertyDetails")}
        <Dash />
      </div>
      <div className="mt-6 flex flex-wrap gap-4 sm:gap-6">
        <DetailItem title={trans("propertyID")} content={property.id} />
        <DetailItem title={trans("area")} content={`${property.area}m`} />
        <DetailItem title={trans("bedrooms")} content={property.bedrooms} />
        <DetailItem title={trans("bathrooms")} content={property.bathrooms} />
        <DetailItem title={trans("model")} content={property.model.name} />
        <DetailItem
          title={trans("furnishing")}
          content={property.furnishing.name}
        />
      </div>
    </div>
  );
}
