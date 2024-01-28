import { trans } from "@mongez/localization";
import { Property } from "../utils/types";
import PropertiesList from "./PropertiesList";

type FeaturedSectionProps = {
  properties: Property[];
};

export default function FeaturedSection({ properties }: FeaturedSectionProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <h2 className="text-2xl font-semibold md:text-3xl">
          {trans("featuredProperties")}
        </h2>
        <span className="h-0.5 flex-1 bg-secondary-main" />
      </div>
      <PropertiesList properties={properties} />
    </div>
  );
}
