"use client";

import { NavigateArrowIcon } from "@/shared/icons/icons";
import { ReactNode, useRef, useState } from "react";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";

import "swiper/css";

type SwiperImagesPropertiesProps = {
  children: ReactNode;
};

export default function PropertyDetailsSlider({
  children,
}: SwiperImagesPropertiesProps) {
  const [_, setInit] = useState(false);

  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button
        ref={prevButtonRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-field_bg absolute left-8 top-1/2 z-10 flex -translate-y-1/2 items-center gap-3 rounded-full bg-secondary-main p-3 font-medium text-primary-main transition-colors hover:bg-secondary-main hover:bg-opacity-100 disabled:cursor-not-allowed disabled:bg-opacity-80 disabled:text-opacity-30 disabled:hover:bg-secondary-main">
        <NavigateArrowIcon className="h-3 w-3 -rotate-90" />
      </button>
      <Swiper
        className="w-full"
        modules={[FreeMode, Navigation]}
        navigation={{
          nextEl: nextButtonRef.current,
          prevEl: prevButtonRef.current,
        }}
        loop
        slidesPerView={1}
        spaceBetween={10}
        onInit={() => setInit(true)}>
        {children}
      </Swiper>
      <button
        ref={nextButtonRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-8 top-1/2 z-10 flex -translate-y-1/2 items-center gap-3 rounded-full bg-secondary-main p-3 font-medium text-primary-main transition-colors hover:bg-secondary-dark hover:bg-opacity-100 disabled:cursor-not-allowed disabled:bg-secondary-main disabled:bg-opacity-80 disabled:text-opacity-30 disabled:hover:bg-secondary-main">
        <NavigateArrowIcon className="h-3 w-3 rotate-90" />
      </button>
    </>
  );
}
