import BaseLink from "@/components/BaseLink";
import { Settings } from "@/modules/home/utils/types";
import { URLS } from "@/shared/urls";
import Image from "next/image";
import Desktop from "./components/Desktop";
import HeaderTopSection from "./components/HeaderTopSection";
import Mobile from "./components/Mobile";

type HeaderProps = {
  settings: Settings | undefined;
};

export default function Header({ settings }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-primary-border bg-primary-white">
      <HeaderTopSection settings={settings} />
      <nav className="container flex flex-wrap items-center py-4 lg:justify-between lg:gap-8">
        <BaseLink
          href={URLS.home.href}
          title="ASAP"
          className="relative inline-block h-10 w-[70px] shrink-0 lg:h-16 lg:w-24">
          <Image
            src="/assets/images/logo.png"
            alt="logo image"
            width={200}
            height={110}
            className="relative z-10 h-full w-full rounded-b-xl"
          />
          <span className="absolute bottom-0 left-0 h-[calc(100%+30px)] w-full rounded-b-xl bg-primary-main" />
        </BaseLink>
        <Mobile />
        <Desktop />
      </nav>
    </header>
  );
}
