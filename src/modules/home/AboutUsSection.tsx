import BaseLink from "@/components/BaseLink";
import { URLS } from "@/shared/urls";
import { trans } from "@mongez/localization";
import Image from "next/image";

export default function AboutUsSection() {
  return (
    <section className="container my-28 flex flex-col justify-between gap-8 md:flex-row md:items-center">
      <div className="">
        <h2 className="text-3xl font-semibold capitalize leading-normal text-primary-main md:text-[44px]">
          {trans("aboutUs")}
        </h2>
        <p className="mt-2 max-w-[600px] text-lg leading-8">
          {trans("aboutUsText")}
        </p>
        <BaseLink
          href={URLS.aboutUs.href}
          className="mt-8 inline-block rounded-xl bg-primary-main px-8 py-4 text-primary-white"
          aria-label="about us">
          {trans("readMore")}
        </BaseLink>
      </div>
      <div className="h-[500px] max-h-full">
        <Image
          src="/assets/images/about-section.png"
          alt="about us image"
          width={600}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
