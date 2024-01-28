import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import SignUpForm from "@/modules/auth/components/SignUpForm";
import { URLS } from "@/shared/urls";
import { getIsAuthorized } from "@/utils/getIsAuthorized";
import { getCurrentLocaleCode, trans } from "@mongez/localization";
import Image from "next/image";
import { redirect } from "next/navigation";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("signUp"),
  };
});

function SignUpPage() {
  const currentLocale = getCurrentLocaleCode();
  const isLoggedIn = getIsAuthorized();

  if (isLoggedIn) {
    redirect(`/${currentLocale}${URLS.home.href}`);
  }

  return (
    <section className="flex flex-col gap-y-8 pb-20 md:flex-row md:pb-0">
      <div className="w-[720px] max-w-full flex-1 md:min-h-[100vh]">
        <Image
          src="/assets/images/auth/sign-up.jpeg"
          alt="sign-up page image"
          width={720}
          height={850}
          priority
          className="h-full w-full object-cover object-center"
        />
      </div>
      <SignUpForm />
    </section>
  );
}

export default withLocalization(SignUpPage);
