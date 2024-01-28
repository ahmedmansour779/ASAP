import { cn } from "@/lib/utils";
import { trans } from "@mongez/localization";
import Image from "next/image";
import { propertyImagesPopupAtom } from "../../atoms/property-images-popup-atom";
import { PropertyDetails } from "../../utils/types";

type PropertyDetailsImagesLayoutProps = {
  property: PropertyDetails;
};

export default function PropertyDetailsImagesLayout({
  property,
}: PropertyDetailsImagesLayoutProps) {
  return (
    <div
      className={cn(
        "container hidden w-full gap-4 md:flex",
        property.images.length >= 3 && "h-[488px]"
      )}>
      {property.images.length >= 3 ? (
        <>
          <div className="w-2/3 rounded-2xl bg-primary-lighter">
            <Image
              className="h-full w-full rounded-2xl object-cover"
              src={property.images[0].url}
              alt="property image"
              width={718}
              height={488}
            />
          </div>
          <div className="flex w-1/3 flex-col justify-between gap-4">
            <Image
              className="h-3/5 w-full rounded-2xl bg-primary-lighter object-cover"
              src={property.images[1].url}
              alt="property image"
              width={447}
              height={298}
            />
            <div
              onClick={() => {
                propertyImagesPopupAtom.merge({
                  images: property.images,
                  isOpen: true,
                });
              }}
              className="relative h-2/5 overflow-hidden rounded-2xl">
              <div className="absolute flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-75 font-medium tracking-[0.52px] text-white underline">
                {trans("seeMore")}
              </div>
              <Image
                className="h-full w-full bg-primary-lighter object-cover"
                src={property.images[2].url}
                alt="property image"
                width={447}
                height={164}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full">
          <Image
            className="w-full"
            src={property.images[0].url}
            alt="property image"
            width={718}
            height={307}
          />
        </div>
      )}
    </div>
  );
}
