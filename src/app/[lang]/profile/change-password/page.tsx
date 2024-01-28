import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import ChangePasswordForm from "@/modules/profile/components/ChangePasswordForm";
import { trans } from "@mongez/localization";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("changePassword"),
  };
});

export const revalidate = 0;

function ChangePasswordPage() {
  return (
    <section className="mb-20">
      <ChangePasswordForm />
    </section>
  );
}

export default withLocalization(ChangePasswordPage);
