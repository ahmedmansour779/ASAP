import { useMedia } from "@/hooks/useMedia";
import { ReactNode, useRef, useState } from "react";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { NavigateArrowIcon } from "@/shared/icons/icons";
import "swiper/css";

type PropertiesSliderProps = {
  children: ReactNode;
  arrows?: boolean;
};

export default function BlogSlider({
  children,
  arrows,
}: PropertiesSliderProps) {
  const { isSmallerScreen } = useMedia();
  const [_, setInit] = useState(false);

  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  const navigation = arrows
    ? {
        nextEl: nextButtonRef.current,
        prevEl: prevButtonRef.current,
      }
    : false;

  const PlaceHolderSlide = (
    <SwiperSlide
      style={{
        width: "20px",
      }}></SwiperSlide>
  );

  return (
    <>
      {arrows && (
        <button
          ref={prevButtonRef}
          className="bg-field_bg absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center gap-3 rounded-full bg-secondary-main p-3 font-medium text-primary-main transition-colors hover:bg-secondary-main disabled:cursor-not-allowed disabled:bg-opacity-80 disabled:text-opacity-30 disabled:hover:bg-secondary-main lg:left-8">
          <NavigateArrowIcon className="h-4 w-4 -rotate-90" />
        </button>
      )}
      <Swiper
        className="w-full"
        modules={[FreeMode, Navigation, Mousewheel]}
        navigation={navigation}
        slidesPerView={"auto"}
        spaceBetween={isSmallerScreen ? 30 : 50}
        onInit={() => setInit(true)}>
        {PlaceHolderSlide}
        {children}
        {PlaceHolderSlide}
      </Swiper>
      {arrows && (
        <button
          ref={nextButtonRef}
          className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 items-center gap-3 rounded-full bg-secondary-main p-3 font-medium text-primary-main transition-colors hover:bg-secondary-dark disabled:cursor-not-allowed disabled:bg-secondary-main disabled:bg-opacity-80 disabled:text-opacity-30 disabled:hover:bg-secondary-main lg:right-8">
          <NavigateArrowIcon className="h-4 w-4 rotate-90" />
        </button>
      )}
    </>
  );
}
