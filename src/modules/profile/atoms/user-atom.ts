import { Date } from "@/shared/types";
import { atom } from "@mongez/react-atom";

export type User = {
  id: number;
  isLoggedIn: boolean;
  name: string;
  email: string;
  phoneNumber: string;
  type: "user" | "guest";
  accessToken: string;
  createdAt: Date;
  createdBy: Date;
  isActive: boolean;
  isAdmin: boolean;
  isDeveloper: boolean;
  isOwner: boolean;
  testimonial: boolean;
  totalCompare: number;
  totalWishlist: number;
  lastLogin: Date;
  updatedAt: Date;
  userType: "user" | "guest";
};

export const userAtom = atom<User>({
  key: "user",
  default: {},
});
