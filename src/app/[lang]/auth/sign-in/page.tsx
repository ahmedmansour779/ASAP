import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import SignInForm from "@/modules/auth/components/SignInForm";
import { URLS } from "@/shared/urls";
import { getIsAuthorized } from "@/utils/getIsAuthorized";
import { getCurrentLocaleCode, trans } from "@mongez/localization";
import Image from "next/image";
import { redirect } from "next/navigation";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("signIn"),
  };
});

function SignInPage() {
  const currentLocale = getCurrentLocaleCode();
  const isLoggedIn = getIsAuthorized();

  if (isLoggedIn) {
    redirect(`/${currentLocale}${URLS.home.href}`);
  }

  return (
    <section className="mb-20 flex flex-col gap-y-8 md:mb-0 md:flex-row">
      <div className="h-[100vh] w-[720px] max-w-full flex-1">
        <Image
          src="/assets/images/auth/sign-in.jpeg"
          alt="sign-in page image"
          width={720}
          height={850}
          priority
          className="h-full w-full object-cover object-center"
        />
      </div>
      <SignInForm />
    </section>
  );
}

export default withLocalization(SignInPage);
