import { useMedia } from "@/hooks/useMedia";
import { NavigateArrowIcon } from "@/shared/icons/icons";
import { ReactNode, useRef, useState } from "react";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type PropertiesSliderProps = {
  children: ReactNode;
};

export default function PropertiesSlider({ children }: PropertiesSliderProps) {
  const { isSmallerScreen } = useMedia();

  const [_, setInit] = useState(false);

  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  const PlaceHolderSlide = (
    <SwiperSlide
      style={{
        width: isSmallerScreen ? "15px" : "40px",
      }}></SwiperSlide>
  );

  return (
    <>
      <button
        ref={prevButtonRef}
        className="absolute left-6 top-1/2 z-10 flex -translate-y-1/2 items-center gap-3 rounded-full bg-secondary-main p-4 font-medium text-primary-main transition-colors hover:bg-secondary-main disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:text-opacity-30 disabled:hover:bg-secondary-main">
        <NavigateArrowIcon className="h-3 w-3 -rotate-90" />
      </button>
      <Swiper
        className="w-full"
        modules={[FreeMode, Navigation]}
        slidesPerView={"auto"}
        navigation={{
          nextEl: nextButtonRef.current,
          prevEl: prevButtonRef.current,
        }}
        spaceBetween={30}
        onInit={() => setInit(true)}>
        {PlaceHolderSlide}
        {children}
        {PlaceHolderSlide}
      </Swiper>
      <button
        ref={nextButtonRef}
        className="absolute right-6 top-1/2 z-10 flex -translate-y-1/2 items-center gap-3 rounded-full bg-secondary-main p-4 font-medium text-primary-main transition-colors hover:bg-secondary-dark disabled:cursor-not-allowed disabled:bg-secondary-main disabled:bg-opacity-50 disabled:text-opacity-30 disabled:hover:bg-secondary-main">
        <NavigateArrowIcon className="h-3 w-3 rotate-90" />
      </button>
    </>
  );
}
