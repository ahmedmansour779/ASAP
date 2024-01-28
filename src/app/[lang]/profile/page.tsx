import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import ProfileForm from "@/modules/profile/components/ProfileForm";
import { trans } from "@mongez/localization";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("profile"),
  };
});

export const revalidate = 0;

function ProfilePage() {
  return (
    <section className="mb-20">
      <ProfileForm />
    </section>
  );
}

export default withLocalization(ProfilePage);
