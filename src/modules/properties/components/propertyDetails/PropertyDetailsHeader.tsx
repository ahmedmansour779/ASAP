"use client";

import { CopyIcon, ShareIcon } from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import toast from "react-hot-toast";
import { shareOpenAtom } from "../../atoms/share-open-atom";
import { PropertyDetails } from "../../utils/types";
import AddToWishlist from "../AddToWishlist";
import PropertyPrice from "../PropertyPrice";

type PropertyDetailsHeaderProps = {
  property: PropertyDetails;
};

export default function PropertyDetailsHeader({
  property,
}: PropertyDetailsHeaderProps) {
  const handleCopyClick = () => {
    navigator.clipboard?.writeText(`${property.id}`);
    toast.success(trans("idHasBeenCopied"));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <button
          className="flex items-center gap-1 text-lg font-semibold"
          onClick={handleCopyClick}
          title="property id"
          aria-label="property id">
          #{property.id}
          <CopyIcon className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          <button
            aria-label="share"
            title="share"
            className="rounded-full border bg-primary-white p-3.5"
            onClick={shareOpenAtom.open}>
            <ShareIcon />
          </button>

          <AddToWishlist
            property={property}
            className="border bg-primary-white p-4"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <PropertyPrice property={property} className="sm:text-3xl" />
        <p className="text-lg font-semibold text-primary-text sm:text-xl sm:leading-8">
          {property.shortDescription}
        </p>
      </div>
    </div>
  );
}
