import { atom } from "@mongez/react-atom";

type SearchFilter = {
  saleType: "rent" | "sale" | "any";
  type: string;
  district: string;
  compound: string;
};

export const searchFilterAtom = atom<SearchFilter>({
  key: "searchFilter",
  default: {
    saleType: "any",
  },
});
