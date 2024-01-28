import { PropertyDetailsAmenity } from "@/modules/home/utils/types";
import { Dash } from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import Image from "next/image";

type PropertyDetailsAmenitiesProps = {
  amenities: PropertyDetailsAmenity[];
};

export default function PropertyDetailsAmenities({
  amenities,
}: PropertyDetailsAmenitiesProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="mt-16 flex flex-col items-start">
      <div className="flex items-center justify-center gap-2 text-xl font-semibold tracking-[0.78px] text-primary-text sm:text-2xl">
        {trans("amenities")}
        <Dash />
      </div>
      <div className="mt-6 flex w-full flex-wrap gap-3">
        {amenities?.map((item, index) => {
          return (
            <div
              key={index}
              className="border-primary-grayDark flex h-24 w-full items-center justify-center gap-2 rounded-2xl border border-solid bg-primary-main bg-opacity-[0.02] sm:w-[48%] lg:w-[30%]">
              <div className="h-11 w-11 overflow-hidden rounded-full bg-primary-main bg-opacity-5 p-2">
                <Image
                  src={item.icon.url}
                  alt={item.name}
                  width={24}
                  height={24}
                  className="h-full w-full"
                />
              </div>
              <p className="text-sm leading-[176%] text-primary-main">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
