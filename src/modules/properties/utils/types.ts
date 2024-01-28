import { Blog } from "@/modules/blog/utils/types";
import { Currency, PropertyDetailsAmenity } from "@/modules/home/utils/types";
import {
  City,
  CreatedBy,
  Date,
  GenericObject,
  ImageType,
  Location,
} from "@/shared/types";

export type Property = {
  id: number;
  area: number;
  price: number;
  name: string;
  saleType: "rent" | "sale";
  shortDescription: string;
  bathrooms: number;
  bedrooms: number;
  featured: boolean;
  totalViews: number;
  slug: string;
  images: ImageType[];
  city: City;
  type: GenericObject[];
  agent: GenericObject[];
  inCompare: boolean;
  inWishlist: boolean;
  currency: {
    code: string;
    id: number;
    name: string;
    symbol: string;
    value: number;
  };
};

export type PropertyDetails = {
  id: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: CreatedBy;
  updatedBy: CreatedBy;
  area: number;
  price: number;
  basePrice: number;
  status: string;
  name: string;
  location: Location;
  locationUrl: string;
  saleType: "rent" | "sale";
  builtYear: number;
  description: string;
  shortDescription: string;
  totalViews: number;
  totalUniqueViews: number;
  bathrooms: number;
  disableWatermark: boolean;
  bedrooms: number;
  ref: string;
  isTaken: boolean;
  takenDate: Date;
  deliveryDate: Date;
  availableDate: Date;
  sortOrder: number;
  featured: boolean;
  lastViewed: Date;
  slug: string;
  city: City;
  images: ImageType[];
  amenities: PropertyDetailsAmenity[];
  type: PropertyType;
  model: Model;
  furnishing: Model;
  district: District;
  installment: Installment;
  agent: PropertyAgent;
  inCompare: boolean;
  inWishlist: boolean;
  similarProperties: Property[];
  widgets: {
    latestPosts: Blog[];
    latestProperties: Property[];
    popularProperties: Property[];
    featuredProperties: Property[];
  };
  currency: Currency;
  floorNumber: null;
  address: string;
  owner: Owner;
};

export type Owner = {
  id: number;
  name: string;
  type: string;
  totalCompare: number;
  totalWishlist: number;
};

export type District = {
  id: number;
  name: string;
  slug: string;
};

export type Model = {
  id: number;
  name: string;
};

export type Installment = {
  price: number;
  downPayment: number;
  paymentAmount: number;
  paymentPeriod: number;
  numberOfPayments: number;
  years: number;
};

export type PropertyType = {
  id: number;
  name: string;
  slug: string;
  banner: ImageType[];
};

export type PropertyAgent = {
  id: number;
  name: string;
  email: string;
  label: string;
  type: "user" | "guest";
  totalCompare: number;
  totalWishlist: number;
  image: ImageType;
  social: GenericObject;
};

export type Filter = {
  type: string;
  text: string;
  data: any;
};

export type FilterType =
  | "amenities"
  | "type"
  | "city"
  | "furnishing"
  | "model"
  | "view"
  | "compound"
  | "price"
  | "area"
  | "bedroom"
  | "bathroom";

export type SortOption = {
  label: string;
  value: string;
};
