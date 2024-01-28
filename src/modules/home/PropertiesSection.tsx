"use client";

import Badge from "@/components/Badge";
import Loader from "@/components/Loader";
import { GenericObject } from "@/shared/types";
import { trans } from "@mongez/localization";
import { useEffect, useState } from "react";
import { getProperties } from "../properties/services/client-properties-services";
import { Property } from "../properties/utils/types";
import PropertiesWithSliderList from "./components/PropertiesWithSliderList";

type PropertiesSectionProps = {
  title: string;
  url?: string;
  params: GenericObject;
};

export default function PropertiesSection({
  title,
  url,
  params,
}: PropertiesSectionProps) {
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProperties(params)
      .then(({ data }) => {
        setProperties(data.properties);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, [params]);

  if (isLoading) {
    return <Loader />;
  }

  if (!properties || error) {
    return null;
  }

  return (
    properties?.length > 0 && (
      <section className="my-28">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-medium capitalize sm:text-2xl">
            {title}
          </h2>
          {url && (
            <Badge className="ltr:ml-auto" url={url}>
              {trans("viewAll")}
            </Badge>
          )}
        </div>
        <div className="mt-10 overflow-hidden rounded-xl">
          <PropertiesWithSliderList properties={properties} />
        </div>
      </section>
    )
  );
}
