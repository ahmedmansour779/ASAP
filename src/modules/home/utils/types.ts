import { ImageType } from "@/shared/types";

export type Currency = {
  id: number;
  name: string;
  symbol: string;
  code: string;
  value: number;
};

export type Settings = {
  general: {
    projectName: string;
    brief: string;
    maintenanceMode: boolean;
    watermarkPosition: string;
    watermarkOpacity: number;
    description: string;
    defaultCurrency: Currency;
    about: string;
    favIcon: ImageType;
    logo: ImageType;
    footerLogo: ImageType;
    baseCurrency: Currency;
    primaryColor: string;
  };
  social: { facebook: string };
  contact: {
    phoneNumber: string;
    address: string;
    "workingDays?": string[];
    workingDays: string;
    email: string;
  };
  properties: { displayAgentOnCard: boolean };
  integrations: {
    googleMap: string;
    googleMapCountry: string;
  };
};

export type Category = {
  total: number;
  type: {
    id: number;
    name: string;
    slug: string;
    banner: ImageType;
  };
};

export type Amenity = {
  total: number;
  amenity: {
    id: number;
    name: string;
    icon: ImageType;
  };
};
export type PropertyDetailsAmenity = {
  id: number;
  name: string;
  icon: {
    url: string;
  };
};
