import BaseLink from "@/components/BaseLink";
import { URLS } from "@/shared/urls";
import Image from "next/image";
import { Amenity } from "../utils/types";

type AmenityCardProps = {
  amenity: Amenity;
};

export default function AmenityCard({ amenity }: AmenityCardProps) {
  return (
    <BaseLink
      href={`${URLS.properties.href}?amenities=${amenity.amenity.id}`}
      className="flex min-w-[150px] cursor-pointer flex-col items-center justify-center gap-4 rounded-xl bg-gradient-to-b from-primary-main/5 to-transparent px-8 py-5 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.05)] hover:from-primary-main/10">
      <div className="h-10 w-10">
        <Image
          src={amenity.amenity.icon.url}
          alt="amenity icon"
          width={44}
          height={44}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-sm font-medium capitalize">
        {amenity.amenity.name}
        <span className="font-normal">({amenity.total})</span>
      </div>
    </BaseLink>
  );
}
