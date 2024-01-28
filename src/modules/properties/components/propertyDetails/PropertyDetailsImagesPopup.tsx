"use client";

import Modal from "@/modules/layout/components/Modal";
import { ClosePopup } from "@/shared/icons/icons";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { propertyImagesPopupAtom } from "../../atoms/property-images-popup-atom";
import PropertyDetailsSlider from "./PropertyDetailsSlider";

export default function PropertyDetailsImagesPopup() {
  const { images, isOpen } = propertyImagesPopupAtom.useValue();

  return (
    <Modal
      opened={isOpen}
      onClickCloseButton={() => {
        propertyImagesPopupAtom.merge({
          images: [],
          isOpen: false,
        });
      }}>
      <div className="relative w-[900px] max-w-full rounded-xl bg-primary-white p-6">
        <PropertyDetailsSlider>
          <button
            onClick={() => {
              propertyImagesPopupAtom.merge({
                images: [],
                isOpen: false,
              });
            }}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full">
            <ClosePopup className="h-full w-full" />
          </button>
          {images?.map((image, index) => (
            <SwiperSlide key={index} style={{ width: "fit-content" }}>
              <div className="h-full w-full">
                <Image
                  src={image.url}
                  alt="image"
                  width={600}
                  height={600}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </PropertyDetailsSlider>
      </div>
    </Modal>
  );
}
