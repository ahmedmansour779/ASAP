"use client";

import Loader from "@/components/Loader";
import { trans } from "@mongez/localization";
import { useEffect, useState } from "react";
import AmenityCard from "./components/AmenityCard";
import { getPopularAmenities } from "./services/home-client-services";
import { Amenity } from "./utils/types";

export default function AmenitiesSection() {
  const [amenities, setAmenities] = useState<Amenity[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPopularAmenities()
      .then(({ data }) => {
        setAmenities(data.amenities);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!amenities || error) {
    return null;
  }

  return (
    amenities?.length > 0 && (
      <section className="container my-28 flex flex-col gap-20">
        <div className="mx-auto space-y-4 text-center">
          <h2 className="text-3xl font-semibold">{trans("amenities")}</h2>
          <p className="">{trans("amenitiesText")}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {amenities.map((amenity) => (
            <AmenityCard key={amenity.amenity.id} amenity={amenity} />
          ))}
        </div>
      </section>
    )
  );
}
