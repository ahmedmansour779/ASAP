import useWishlist from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { HeartIcon } from "@/shared/icons/icons";
import { Property, PropertyDetails } from "../utils/types";

type AddToWishlistProps = {
  property: Property | PropertyDetails;
  className?: string;
};

export default function AddToWishlist({
  property,
  className,
}: AddToWishlistProps) {
  const {
    handleAddToWishlist,
    handleDeleteFromWishlist,
    isFavorite,
    isLoading,
  } = useWishlist(property);

  return (
    <button
      onClick={isFavorite ? handleDeleteFromWishlist : handleAddToWishlist}
      disabled={isLoading}
      title="add to favorite"
      className={cn(
        "group shrink-0 rounded-full bg-primary-lighter p-2 text-primary-main hover:text-primary-white/80 disabled:cursor-not-allowed disabled:opacity-60",
        className,
        isFavorite && "text-primary-white/80"
      )}>
      {isLoading ? (
        <div className="aspect-square h-5 w-5 animate-spin rounded-full border-2 border-primary-main border-t-transparent"></div>
      ) : (
        <HeartIcon
          className={cn(
            "group-hover:fill-primary-main",
            isFavorite && "fill-primary-main"
          )}
        />
      )}
    </button>
  );
}
