import { useMedia } from "@/hooks/useMedia";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Mousewheel } from "swiper/modules";
import { Swiper } from "swiper/react";

import "swiper/css";

type SlideAreaProps = {
  children: ReactNode;
  slidesPerView: number;
  slidesNumber?: number;
};

export default function CategoriesSlider({
  children,
  slidesPerView,
  slidesNumber,
}: SlideAreaProps) {
  const { screenWidth } = useMedia();
  const [activeBullet, setActiveBullet] = useState(0);

  let slidesToDisplay = 1;

  if (screenWidth > 1280) {
    slidesToDisplay = 4;
  } else if (screenWidth > 1028) {
    slidesToDisplay = 3;
  } else if (screenWidth > 620) {
    slidesToDisplay = 2;
  } else if (screenWidth > 460) {
    slidesToDisplay = 1.5;
  }

  return (
    <>
      <Swiper
        className="w-full"
        modules={[Mousewheel]}
        slidesPerView={slidesToDisplay || 4}
        spaceBetween={30}
        onSlideChange={(swiper) => {
          const activeIndex = swiper.activeIndex;
          setActiveBullet(activeIndex);
        }}>
        {children}
      </Swiper>
      {slidesNumber && slidesPerView && typeof slidesToDisplay === "number" && (
        <div className=" mt-8 flex items-center justify-center gap-2">
          {new Array(Math.ceil(slidesNumber / slidesToDisplay))
            .fill("")
            .map((_, index) => (
              <span
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full bg-primary-lighter",
                  index === activeBullet && "bg-primary-main"
                )}></span>
            ))}
        </div>
      )}
    </>
  );
}
