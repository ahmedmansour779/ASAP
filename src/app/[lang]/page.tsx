import InViewPort from "@/components/InViewPort";
import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import AboutUsSection from "@/modules/home/AboutUsSection";
import AmenitiesSection from "@/modules/home/AmenitiesSection";
import CategoriesSection from "@/modules/home/CategoriesSection";
import HeroSection from "@/modules/home/HeroSection";
import NewsLetterSection from "@/modules/home/NewsLetterSection";
import PropertiesSection from "@/modules/home/PropertiesSection";
import { settingsArPath, settingsEnPath } from "@/shared/constants";
import { URLS } from "@/shared/urls";
import { getFile } from "@mongez/fs";
import { getCurrentLocaleCode, trans } from "@mongez/localization";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("home"),
    description:
      "We Help You CompleteIf You Would Like Us To We Can Engage Your Surveyors, Solicitors And Mortgage Advisors And See The Transaction All The Way Through To A Successful Completion. If Required We Can Assist In Engaging Removal Firms And Interior Designers And Can Even Arrange Parking Permits For You. ",
  };
});

function Home() {
  const locale = getCurrentLocaleCode();

  const settings = JSON.parse(
    getFile(locale === "en" ? settingsEnPath : settingsArPath)
  );

  return (
    <>
      <HeroSection />
      <InViewPort>
        <CategoriesSection />
      </InViewPort>
      <AboutUsSection settings={settings} />
      <InViewPort>
        <PropertiesSection
          title={trans("featuredProperties")}
          params={{
            featured: true,
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
      <InViewPort>
        <PropertiesSection
          title={trans("latestPropertiesForRent")}
          url={URLS.rent.href}
          params={{
            saleType: "rent",
            limit: 5,
          }}
        />
      </InViewPort>
      <InViewPort>
        <PropertiesSection
          title={trans("latestPropertiesForSale")}
          url={URLS.sale.href}
          params={{
            saleType: "sale",
            limit: 5,
          }}
        />
      </InViewPort>
      <InViewPort>
        <AmenitiesSection />
      </InViewPort>
      {/* <TestimonialsSection /> */}
      <NewsLetterSection />
    </>
  );
}

export default withLocalization(Home);
