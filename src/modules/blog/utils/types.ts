import { CreatedBy, Date, ImageType } from "@/shared/types";

export type Blog = {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  createdAt: Date;
  image: ImageType;
  totalViews: number;
  totalUniqueViews: number;
  isActive: boolean;
  slug: string;
  updatedAt: Date;
  createdBy: CreatedBy;
  updatedBy: CreatedBy;
  category: Category;
  lastViewed: Date;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};
