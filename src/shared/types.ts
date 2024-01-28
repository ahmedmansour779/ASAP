import { HTMLAttributes } from "react";

export type GenericObject<T = any> = Record<string, T>;

export type ImageType = {
  [index: string]: any;
  url: string;
};

export type Icon = {
  [index: string]: any;
  url: string;
};

export type City = {
  id: number;
  name: string;
  slug: string;
};

export type Option = {
  value: any;
  label: string;
};

export type PaginationInfo = {
  limit: number;
  page: number;
  result: number;
  total: number;
  pages: number;
};

export type Date = {
  format: string;
  timestamp: number;
  offset: number;
  humanTime: string;
  text: string;
  date: string;
  time: string;
};

export type CreatedBy = {
  id: number;
  name: string;
  email: string;
  label: string;
  image: ImageType;
};

export type Location = {
  lat: number;
  lng: number;
  address: string;
};

export type SocialIcon = Record<
  string,
  (props: HTMLAttributes<SVGElement>) => JSX.Element
>;

export type Error =
  | string
  | {
      key: string;
      error: string | number;
    };
