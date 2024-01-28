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
    title: trans("rent"),
    description:
      "We Help You CompleteIf You Would Like Us To We Can Engage Your Surveyors, Solicitors And Mortgage Advisors And See The Transaction All The Way Through To A Successful Completion. If Required We Can Assist In Engaging Removal Firms And Interior Designers And Can Even Arrange Parking Permits For You. ",
  };
});

type PropertiesForRentPageProps = {
  searchParams: GenericObject;
};

export const revalidate = 0;

async function PropertiesForRentPage({
  searchParams,
}: PropertiesForRentPageProps) {
  const data = await getProperties({
    ...searchParams,
    saleType: "rent",
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
        title={trans("rent")}
        navLinks={[
          { title: "properties", url: URLS.properties.href },
          { title: trans("rent") },
        ]}
        imageUrl="/assets/images/rent/breadcrumb.jpeg"
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

export default withLocalization(PropertiesForRentPage);
