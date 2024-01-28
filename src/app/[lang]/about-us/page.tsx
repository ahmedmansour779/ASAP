import Breadcrumbs from "@/components/Breadcrumbs";
import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import { trans } from "@mongez/localization";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("aboutUs"),
    description:
      "We Help You CompleteIf You Would Like Us To We Can Engage Your Surveyors, Solicitors And Mortgage Advisors And See The Transaction All The Way Through To A Successful Completion. If Required We Can Assist In Engaging Removal Firms And Interior Designers And Can Even Arrange Parking Permits For You. ",
  };
});

function AboutUsPage() {
  return (
    <>
      <Breadcrumbs
        title={"aboutUs"}
        navLinks={[{ title: "aboutUs" }]}
        imageUrl="/assets/images/about-us.jpg"
      />
      <section className="container my-28">
        <p className="mx-auto max-w-[1000px] leading-loose">
          We Help You CompleteIf You Would Like Us To We Can Engage Your
          Surveyors, Solicitors And Mortgage Advisors And See The Transaction
          All The Way Through To A Successful Completion. If Required We Can
          Assist In Engaging Removal Firms And Interior Designers And Can Even
          Arrange Parking Permits For You. Clients Who Have Used Our Service Say
          We Make Their Life Easier Giving Them Confidence That They Are Buying
          The Right Home, At The Right Price, Without The Hassle And Worry
          Usually Experienced With Finding A Home. We Would Like To Hear What
          Sort Of Home You Are Looking For And Discuss How We Can Help You. You
          Can Call Or Email Us To Find Out More. Want to have a villa for rent
          in Katameya heights oreven buy it?ASAP Properties will do it for
          you!First, we search in all possible sources available to us thatsuit
          all kinds of tastes with different budgets. Thissearching includes
          personal contacts at estate agents,scouring property press, websites,
          and investigatingprivate sales. Then, we gather all apartments and
          villas informationwith all special details to rent apartment in
          NewCairo or to buy it, or if you like a luxury we have optionsof a
          villa for rent in New Cairo.The next step is to carry out and
          shortlist every possiblesource to give you the best experience of your
          dreamhouse. When shortlisting, we filter places based on
          theirlocations, features, and prices to suit your preferences.We
          provide plenty of apartment for rent in NewCairo and many other
          places. ASAP Properties will give you exactly what you want,whether
          you&apos;re looking to buy a place or rent it, we willget it for
          you.The very next step is to negotiate the price to give you thebest
          solution to buy or rent apartment in New Cairo, we do that to
          guarantee you have a good place, a greatview, and a suitable
          price.Then, it’s your turn to complete the whole process, weexpect you
          to engage and select the best apartment forrent in New Cairo and villa
          for rent in New Cairo. Welead you all the way right from the idea of
          having yourdream house directly to handing you the key.
        </p>
      </section>
    </>
  );
}

export default withLocalization(AboutUsPage);
