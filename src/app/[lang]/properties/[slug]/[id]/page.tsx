import BackButton from "@/components/BackButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import InViewPort from "@/components/InViewPort";
import NoData from "@/components/NoData";
import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import PropertiesSection from "@/modules/home/PropertiesSection";
import { Settings } from "@/modules/home/utils/types";
import AgentInformationSection from "@/modules/properties/components/propertyDetails/AgentInformationSection";
import PropertyDetailsInfoSection from "@/modules/properties/components/propertyDetails/PropertyDetailsInfoSection";
import PropertyDetailsTopSection from "@/modules/properties/components/propertyDetails/PropertyDetailsTopSection";
import { getSingleProperty } from "@/modules/properties/services/properties-service";
import { settingsArPath, settingsEnPath } from "@/shared/constants";
import { GenericObject } from "@/shared/types";
import { URLS } from "@/shared/urls";
import { getJsonFile } from "@mongez/fs";
import { trans } from "@mongez/localization";

export const generateMetadata = withLocalizationMetadata(
  async ({ params }: GenericObject) => {
    const property = await getSingleProperty(params.id);

    if (!property) {
      return {
        title: trans("notFound"),
      };
    }

    return {
      title: property.name,
      description: property.shortDescription,
    };
  }
);

export const revalidate = 360 * 12;

async function PropertyDetailsPage({ params, searchParams }: GenericObject) {
  const property = await getSingleProperty(params.id);

  if (!property) {
    return <NoData message={trans("couldNotGetData")} backToHome />;
  }

  const { settings }: { settings: Settings } = getJsonFile(
    searchParams.lang === "en" ? settingsEnPath : settingsArPath
  );

  return (
    <section className="relative">
      <div>
        <div className="container absolute left-1/2 top-10 z-10 w-full -translate-x-1/2">
          <BackButton />
        </div>
        <Breadcrumbs
          navLinks={[
            { url: URLS.blog.href, title: trans("properties") },
            { title: property.name },
          ]}
          title={property.name}
        />
      </div>
      <PropertyDetailsTopSection property={property} />
      <div className="container mb-20 flex flex-col gap-10 lg:flex-row">
        <PropertyDetailsInfoSection settings={settings} property={property} />
        <AgentInformationSection
          agent={property.agent}
          propertyId={property.id}
        />
      </div>

      <InViewPort>
        <PropertiesSection
          title={trans("latestPropertiesForRent")}
          url={URLS.properties.href + "/rent"}
          params={{
            saleType: "rent",
            limit: 5,
          }}
        />
      </InViewPort>
      <InViewPort>
        <PropertiesSection
          title={trans("popularProperties")}
          params={{
            popular: true,
            limit: 5,
          }}
        />
      </InViewPort>
    </section>
  );
}

export default withLocalization(PropertyDetailsPage);
