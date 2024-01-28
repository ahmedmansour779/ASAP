"use client";

import { trans } from "@mongez/localization";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { PropertyDetails } from "../../utils/types";
import PropertyDetailsImagesLayout from "./PropertyDetailsImagesLayout";
import PropertyDetailsSlider from "./PropertyDetailsSlider";

type PropertyDetailsTopSectionProps = {
  property: PropertyDetails;
};

export default function PropertyDetailsTopSection({
  property,
}: PropertyDetailsTopSectionProps) {
  return (
    <section className="mb-16">
      <div className="container my-4 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-4 text-sm">
          {property.featured && (
            <span className="propertyPage-featured-label min-w-[96px] rounded-lg border-primary-main bg-primary-main px-3 py-2 text-center font-semibold uppercase text-white">
              {trans("featured")}
            </span>
          )}
          <span className="min-w-[96px] rounded-lg border border-solid border-primary-main bg-white px-3 py-2 text-center font-semibold capitalize text-primary-main">
            {property.saleType === "rent" ? trans("rent") : trans("sale")}
          </span>
        </div>
        <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row">
          {property.isTaken && (
            <div className="text-lg font-semibold capitalize text-primary-main">
              {trans("takenSince")}:
              <span className="font-normal"> {property.takenDate.date}</span>
            </div>
          )}
          {property.availableDate && (
            <div className="text-lg font-semibold capitalize text-primary-main">
              {trans("availableDate")}:
              <span className="font-normal">
                {" "}
                {property.availableDate.date}
              </span>
            </div>
          )}
        </div>
      </div>

      <PropertyDetailsImagesLayout property={property} />
      <section className="block h-[60vh] md:hidden">
        <PropertyDetailsSlider>
          {property.images.map((image, index) => {
            return (
              <SwiperSlide key={index} style={{ width: "fit-content" }}>
                <Image
                  src={image.url}
                  alt="image"
                  width={650}
                  height={650}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            );
          })}
        </PropertyDetailsSlider>
      </section>
    </section>
  );
}
