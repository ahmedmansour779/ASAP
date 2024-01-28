"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";

type PropertyCardSliderProps = {
  slidesNumber: number;
  children: ReactNode;
};

export default function PropertyCardSlider({
  slidesNumber,
  children,
}: PropertyCardSliderProps) {
  const [activeBullet, setActiveBullet] = useState(0);

  return (
    <>
      <Swiper
        className="h-full max-w-full"
        modules={[FreeMode, Navigation]}
        slidesPerView={1}
        spaceBetween={10}
        onSlideChange={(swiper) => {
          const activeIndex = swiper.activeIndex > 4 ? 4 : swiper.activeIndex;
          setActiveBullet(activeIndex);
        }}>
        {children}
      </Swiper>
      <div className="absolute bottom-4 left-1/2 z-10 mt-8 flex max-w-[180px] -translate-x-1/2 flex-wrap items-center justify-center gap-2">
        {new Array(slidesNumber > 5 ? 5 : slidesNumber)
          .fill(<></>)
          .map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-secondary-main/50",
                index === activeBullet && "bg-primary-main"
              )}></span>
          ))}
      </div>
    </>
  );
}
