import { atom } from "@mongez/react-atom";

export type AdvanceSearchFilter = {
  id: number;
  floor: number;
  saleType: "any" | "rent" | "buy";
  minArea: number;
  maxArea: number;
  minPrice: number;
  maxPrice: number;
  amenities: string[];
};

export const advancedSearchFilterAtom = atom<AdvanceSearchFilter>({
  key: "advanceSearchFilter",
  default: {
    saleType: "any",
    amenities: [],
  },
});
