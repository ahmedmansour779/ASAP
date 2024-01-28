"use client";

import PropertyCard from "@/modules/properties/components/PropertyCard";
import { Property } from "@/modules/properties/utils/types";
import { SwiperSlide } from "swiper/react";
import PropertiesSlider from "./sliders/PropertiesSlider";

type PropertiesWithSliderListProps = {
  properties: Property[];
};

export default function PropertiesWithSliderList({
  properties,
}: PropertiesWithSliderListProps) {
  return (
    <PropertiesSlider>
      {properties.map((property) => (
        <SwiperSlide style={{ width: "fit-content" }} key={property.id}>
          <PropertyCard key={property.id} property={property} />
        </SwiperSlide>
      ))}
    </PropertiesSlider>
  );
}
