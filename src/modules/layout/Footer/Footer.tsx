import Separator from "@/components/Separator";
import { Settings } from "@/modules/home/utils/types";
import { socialIcons } from "@/shared/data";
import { FooterShapeIcon } from "@/shared/icons/icons";
import { Url } from "@/shared/urls";
import { trans } from "@mongez/localization";
import Image from "next/image";
import Link from "next/link";
import LinksColumn from "./components/LinksColumn";

type FooterProps = {
  settings: Settings | undefined;
};

const quickLinksList: Partial<keyof Url>[] = [
  "aboutUs",
  "contactUs",
  "properties",
  "rent",
  "sale",
];

const helpLinksList: Partial<keyof Url>[] = [
  "privacyPolicy",
  "termsAndConditions",
  "faq",
];

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-secondary-dark">
      <FooterShapeIcon className="absolute left-0 top-0 h-full max-w-full" />
      <div className="container relative">
        <Image
          src={settings?.general?.footerLogo?.url || "/assets/images/logo.png"}
          alt="logo"
          width={300}
          height={300}
          className="max-h-[120px] max-w-[130px]"
        />
        <div className="my-10 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
          {settings?.general.about && (
            <p className="max-w-[355px] text-sm">{settings?.general.about}</p>
          )}
          <LinksColumn linksList={quickLinksList} title="quickLinks" />
          <Separator className="h-[1px] bg-secondary-darker sm:hidden" />
          <LinksColumn linksList={helpLinksList} title="help" />
          {settings?.social && (
            <div className="space-y-6">
              <div className="font-medium capitalize">{trans("followUs")}</div>
              <div className="flex items-center gap-4">
                {Object.entries(settings?.social || {}).map(
                  (entry: [string, string], index) => {
                    const [key, value] = entry;
                    const Icon = socialIcons[key];

                    return (
                      <Link
                        key={index}
                        href={value}
                        className="text-primary-main transition-colors hover:text-primary-white">
                        <Icon className="h-7 w-7" />
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 border-t border-secondary-darker py-8 text-center text-sm">
        ©{year}
        <Link
          href="https://crafted-internet.com/"
          target="_blank"
          className="text-primary-main">
          Crafted Internet.
        </Link>
        Crafted with care.
      </div>
    </footer>
  );
}
