import Breadcrumbs from "@/components/Breadcrumbs";
import NoData from "@/components/NoData";
import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import PropertiesListingSide from "@/modules/properties/components/PropertiesListingSide";
import { getProperties } from "@/modules/properties/services/properties-service";
import { GenericObject } from "@/shared/types";
import { URLS } from "@/shared/urls";
import { getCollections } from "@/utils/getCollection";
import { trans } from "@mongez/localization";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("buy"),
  };
});

type PropertiesForBuyPageProps = {
  searchParams: GenericObject;
};

export const revalidate = 0;

async function PropertiesForBuyPage({
  searchParams,
}: PropertiesForBuyPageProps) {
  const data = await getProperties({
    ...searchParams,
    saleType: "sale",
    withFilters: true,
  });

  if (!data) {
    return <NoData message={trans("couldNotGetData")} backToHome />;
  }

  const [featuredProperties, propertiesList] = getCollections(
    data.properties,
    "featured"
  );

  return (
    <>
      <Breadcrumbs
        title={trans("buy")}
        navLinks={[
          { title: "properties", url: URLS.properties.href },
          { title: trans("buy") },
        ]}
        imageUrl="/assets/images/buy/breadcrumb.jpeg"
      />
      <PropertiesListingSide
        filters={data.filters}
        sortOptions={data.sortOptions}
        properties={propertiesList}
        featuredProperties={featuredProperties}
        paginationInfo={data.paginationInfo}
      />
    </>
  );
}

export default withLocalization(PropertiesForBuyPage);
