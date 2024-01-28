import Breadcrumbs from "@/components/Breadcrumbs";
import NoData from "@/components/NoData";
import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import PropertiesListingSide from "@/modules/properties/components/PropertiesListingSide";
import { getProperties } from "@/modules/properties/services/properties-service";
import { GenericObject } from "@/shared/types";
import { getCollections } from "@/utils/getCollection";
import { trans } from "@mongez/localization";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("properties"),
  };
});

type PropertiesPageProps = {
  searchParams: GenericObject;
};

export const revalidate = 0;

async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const data = await getProperties({
    ...searchParams,
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
        title={"properties"}
        navLinks={[{ title: "properties" }]}
        imageUrl="/assets/images/properties.jpg"
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

export default withLocalization(PropertiesPage);
