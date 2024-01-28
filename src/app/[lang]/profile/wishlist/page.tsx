import NoData from "@/components/NoData";
import Pagination from "@/components/Pagination";
import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import PropertyCard from "@/modules/properties/components/PropertyCard";
import { getWishlist } from "@/modules/properties/services/properties-service";
import EmptyWishlist from "@/modules/wishlist/components/EmptyWishlist";
import { trans } from "@mongez/localization";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("wishlist"),
  };
});

export const revalidate = 0;

async function WishlistPage() {
  const data = await getWishlist();

  if (!data) {
    return <NoData message={trans("couldNotGetData")} backToHome />;
  }

  return data?.properties.length > 0 ? (
    <section className="container mb-20">
      <div className="flex flex-wrap gap-8">
        {data?.properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {data.paginationInfo?.pages > 1 && (
        <Pagination paginationInfo={data.paginationInfo} />
      )}
    </section>
  ) : (
    <EmptyWishlist />
  );
}

export default withLocalization(WishlistPage);
