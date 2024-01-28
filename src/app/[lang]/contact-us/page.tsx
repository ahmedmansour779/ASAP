import Breadcrumbs from "@/components/Breadcrumbs";
import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import ContactUsForm from "@/modules/contact-us/components/ContactUsForm";
import { settingsArPath, settingsEnPath } from "@/shared/constants";
import { getFile } from "@mongez/fs";
import { getCurrentLocaleCode, trans } from "@mongez/localization";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("contactUs"),
  };
});

function ContactUsPage() {
  const locale = getCurrentLocaleCode();

  const settings = JSON.parse(
    getFile(locale === "en" ? settingsEnPath : settingsArPath)
  );

  return (
    <>
      <Breadcrumbs
        imageUrl="/assets/images/contact-us/breadcrumb.jpeg"
        navLinks={[{ title: trans("contactUs") }]}
        title={trans("contactUs")}
      />
      <section className="overflow-hidden">
        <div className="container relative my-28 flex flex-col items-stretch justify-between gap-10 md:flex-row">
          <div className="flex-1">
            <ContactUsForm settings={settings} />
          </div>
          <div className="relative min-h-[600px] flex-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.37809421508!2d31.217264634553775!3d30.059482028213328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1701612218397!5m2!1sen!2seg"
              className="w-full md:absolute md:top-0 md:w-[800px] ltr:md:left-0 ltr:md:rounded-l-xl rtl:md:right-0 rtl:md:rounded-r-xl"
              height={600}
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

export default withLocalization(ContactUsPage);
