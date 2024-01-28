import { trans } from "@mongez/localization";
import Image from "next/image";
import HeroQuickSearchSection from "./components/HeroQuickSearchSection";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[700px] items-center justify-center pb-32">
      <Image
        src="/assets/images/hero.jpg"
        alt="hero image"
        width={1440}
        height={688}
        className="absolute left-0 top-0 h-full w-full object-cover object-right-bottom ltr:-scale-x-100 md:object-top"
      />
      <span
        className="absolute bottom-0 left-0 h-full w-full"
        aria-hidden></span>
      <div className="container relative space-y-10">
        <div className="max-w-[600px]">
          <div className="font-medium">
            {trans("moreThan")} <span className="text-primary-main">1000+</span>{" "}
            {trans("houseAvailableMessage")}
          </div>
          <p className="mt-2 text-3xl font-semibold md:text-6xl">
            {trans("easiestWayMessage")}
          </p>
          <p className="mt-6">{trans("findDreamPlaceMessage")}</p>
        </div>
        <HeroQuickSearchSection />
      </div>
    </section>
  );
}
