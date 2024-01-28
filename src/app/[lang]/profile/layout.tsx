import BackButton from "@/components/BackButton";
import { withLocalizationMetadata } from "@/components/localization/WithLocalization";
import { cn } from "@/lib/utils";
import ProfileNavSection from "@/modules/profile/components/ProfileNavSection";
import { URLS } from "@/shared/urls";
import { getIsAuthorized } from "@/utils/getIsAuthorized";
import { getCurrentLocaleCode, trans } from "@mongez/localization";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("profile"),
  };
});

type ProfileLayoutProps = {
  children: ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const currentLocale = getCurrentLocaleCode();
  const isLoggedIn = getIsAuthorized();

  if (!isLoggedIn) {
    redirect(`/${currentLocale}${URLS.signIn.href}`);
  }

  return (
    <>
      <section
        className={cn(
          "relative flex h-[300px] items-center justify-between bg-gradient-to-t from-transparent to-primary-lighter"
        )}>
        <div className="container absolute left-1/2 top-10 z-10 w-full -translate-x-1/2">
          <BackButton />
        </div>
        <ProfileNavSection />
      </section>
      <section className="container">{children}</section>
    </>
  );
}
