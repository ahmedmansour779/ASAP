import { ImageType } from "@/shared/types";
import { atom } from "@mongez/react-atom";

type PropertyImagesPopupAtomProps = {
  isOpen: boolean;
  images: ImageType[];
};

export const propertyImagesPopupAtom = atom<PropertyImagesPopupAtomProps>({
  key: "propertyImagesPopupAtom",
  default: {
    isOpen: false,
    images: [],
  },
});
