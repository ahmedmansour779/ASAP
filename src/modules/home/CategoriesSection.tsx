"use client";

import Badge from "@/components/Badge";
import Loader from "@/components/Loader";
import { useMedia } from "@/hooks/useMedia";
import { trans } from "@mongez/localization";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { getPropertyPopularTypes } from "../properties/services/client-properties-services";
import CategoryCard from "./components/CategoryCard";
import CategoriesSlider from "./components/sliders/CategoriesSlider";
import { Category } from "./utils/types";

export default function CategoriesSection() {
  const { isSmallerScreen } = useMedia();

  const [types, setTypes] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPropertyPopularTypes()
      .then(({ data }) => {
        setTypes(data.types);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!types || types.length === 0 || error) {
    return null;
  }

  return (
    <section className="my-28 flex flex-col">
      <div className="mx-auto flex flex-col items-center gap-4">
        <Badge>{trans("types")}</Badge>
        <div className="text-xl font-medium capitalize">
          {trans("exploreTypes")}
        </div>
      </div>
      <div className="container relative mt-20 overflow-hidden">
        <CategoriesSlider
          slidesPerView={isSmallerScreen ? 2 : 4}
          slidesNumber={types.length}>
          {types.map((type, index) => (
            <SwiperSlide style={{ width: "fit-content" }} key={index}>
              <CategoryCard key={type.type.id} type={type} />
            </SwiperSlide>
          ))}
        </CategoriesSlider>
      </div>
    </section>
  );
}
