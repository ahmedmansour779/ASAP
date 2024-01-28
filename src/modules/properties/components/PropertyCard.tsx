"use client";

import { cn } from "@/lib/utils";
import {
  AreaIcon,
  BathroomIcon,
  BedroomIcon,
  LocationIcon,
} from "@/shared/icons/icons";
import { URLS } from "@/shared/urls";
import { getCurrentLocaleCode, trans } from "@mongez/localization";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SwiperSlide } from "swiper/react";
import { Property } from "../utils/types";
import AddToWishlist from "./AddToWishlist";
import PropertyCardSlider from "./PropertyCardSlider";
import PropertyPrice from "./PropertyPrice";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const localeCode = getCurrentLocaleCode();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative max-w-[290px] overflow-hidden rounded-xl border border-secondary-main bg-gradient-to-t from-primary-main/5 to-transparent p-4 md:max-w-[340px]",
        pathname.includes("/properties") &&
          "shadow-[11px_18px_20px_0px_rgba(111,111,111,0.06)]"
      )}>
      {property.featured && (
        <span className="featured-label absolute left-0 top-6 z-10 flex h-8 w-40 origin-bottom -translate-x-[22px] -rotate-45 items-center justify-center bg-primary-main text-center uppercase text-primary-white">
          {trans("featured")}
        </span>
      )}
      <div
        onClick={() =>
          router.push(
            `/${localeCode}${URLS.properties.href}/${property.slug}/${property.id}`
          )
        }
        className="relative h-[207px] w-full cursor-pointer">
        <span className="absolute right-4 top-4 z-10 min-w-[67px] rounded-lg bg-primary-light p-2 text-center text-sm font-medium capitalize tracking-wide text-primary-white">
          {trans(property.saleType)}
        </span>
        {property.city && (
          <span
            className={cn(
              "absolute left-4 top-4 z-10 flex min-w-[67px] items-center gap-1 rounded-lg bg-black/70 p-2 text-center text-sm font-medium capitalize tracking-wide text-primary-white",
              property.featured && "bottom-4 top-auto"
            )}>
            <LocationIcon className="h-4 w-4" />
            {property.city.name}
          </span>
        )}
        <div className="relative h-[208px] w-full overflow-hidden rounded-xl bg-primary-lighter">
          <PropertyCardSlider slidesNumber={property.images?.length}>
            {property.images?.map((image, index) => (
              <SwiperSlide key={index} style={{ width: "fit-content" }}>
                <div className="absolute left-0 top-0 h-full w-full bg-transparent bg-gradient-to-t from-black/60 to-transparent"></div>
                <Image
                  loading="lazy"
                  src={image?.url}
                  alt="property image"
                  width={400}
                  height={400}
                  className="h-full w-full rounded-xl object-cover"
                />
              </SwiperSlide>
            ))}
          </PropertyCardSlider>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <PropertyPrice property={property} />
          <AddToWishlist property={property} className="ml-auto" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            router.push(
              `/${localeCode}${URLS.properties.href}/${property.slug}/${property.id}`
            )
          }>
          <div className="line-clamp-1 text-xl font-semibold">
            {property.name}
          </div>
          <p className="line-clamp-2 h-10 cursor-pointer text-sm font-medium">
            {property.shortDescription}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 text-sm font-medium capitalize">
          <div className="flex shrink-0 items-center gap-1">
            <AreaIcon />
            {property.area} <span className="text-xs">{trans("m2")}</span>
          </div>
          <div className="flex items-center gap-1">
            <BathroomIcon />
            {property.bathrooms}{" "}
            <span className="text-xs">{trans("baths")}</span>
          </div>
          <div className="flex items-center gap-1">
            <BedroomIcon />
            {property.bedrooms} <span className="text-xs">{trans("beds")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
