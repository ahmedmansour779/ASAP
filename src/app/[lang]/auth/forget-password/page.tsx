import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import ForgetPasswordForm from "@/modules/auth/components/ForgetPasswordForm";
import { URLS } from "@/shared/urls";
import { getIsAuthorized } from "@/utils/getIsAuthorized";
import { getCurrentLocaleCode, trans } from "@mongez/localization";
import Image from "next/image";
import { redirect } from "next/navigation";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("forgetPassword"),
  };
});

function ForgetPasswordPage() {
  const currentLocale = getCurrentLocaleCode();
  const isLoggedIn = getIsAuthorized();

  if (isLoggedIn) {
    redirect(`/${currentLocale}${URLS.home.href}`);
  }

  return (
    <section className="flex flex-col gap-y-8 pb-20 md:flex-row md:pb-0">
      <div className="h-[100vh] w-[720px] max-w-full flex-1">
        <Image
          src="/assets/images/auth/forget-password.jpeg"
          alt="forget-password page image"
          width={720}
          height={850}
          priority
          className="h-full w-full object-cover object-center"
        />
      </div>
      <ForgetPasswordForm />
    </section>
  );
}

export default withLocalization(ForgetPasswordPage);
