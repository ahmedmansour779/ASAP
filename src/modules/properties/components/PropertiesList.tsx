import React from "react";
import { Property } from "../utils/types";
import PropertyCard from "./PropertyCard";

type PropertiesListProps = {
  properties: Property[];
};

export default function PropertiesList({ properties }: PropertiesListProps) {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 md:justify-start">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
