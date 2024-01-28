"use client";

import { userAtom } from "@/modules/profile/atoms/user-atom";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/modules/properties/services/client-properties-services";
import { Property, PropertyDetails } from "@/modules/properties/utils/types";
import { trans } from "@mongez/localization";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useWishlist(property: Property | PropertyDetails) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(property.inWishlist);

  const handleAddToWishlist = () => {
    if (userAtom.get("accessToken")) {
      setIsLoading(true);

      addToWishlist(property.id, userAtom.get("accessToken"))
        .then(() => {
          setInWishlist(!inWishlist);
          router.refresh();
          toast.success(trans("addedToWishlist"));
        })
        .catch(() => {
          toast.error(trans("couldNotAddToWishlist"));
        })
        .finally(() => setIsLoading(false));
    } else {
      toast.error(trans("pleaseLoginFirst"));
    }
  };

  const handleDeleteFromWishlist = () => {
    setIsLoading(true);

    deleteFromWishlist(property.id, userAtom.get("accessToken"))
      .then(() => {
        router.refresh();
        toast.success(trans("removedFromWishlist"));
        setInWishlist(!inWishlist);
      })
      .catch(() => {
        toast.error(trans("couldNotRemoveFromWishlist"));
      })
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    isFavorite: inWishlist,
    handleAddToWishlist,
    handleDeleteFromWishlist,
  } as const;
}
