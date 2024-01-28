import { Settings } from "@/modules/home/utils/types";
import { socialIcons } from "@/shared/data";
import { MailIcon, PhoneIcon } from "@/shared/icons/icons";
import Link from "next/link";

type HeaderTopSectionProps = {
  settings: Settings | undefined;
};

export default function HeaderTopSection({ settings }: HeaderTopSectionProps) {
  return (
    <div className="bg-primary-main py-3 text-sm text-primary-white">
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href={`mailto:${settings?.contact.email}`}
            className="flex items-center gap-2">
            <MailIcon /> <span>{settings?.contact?.email}</span>
          </Link>
          <Link
            href={`tel:${settings?.contact.phoneNumber}`}
            className="flex items-center gap-2">
            <PhoneIcon /> <span>{settings?.contact?.phoneNumber}</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {Object.entries(settings?.social || {}).map(
            (entry: [string, string], index) => {
              const [key, value] = entry;
              const Icon = socialIcons[key];

              return (
                <Link key={index} href={value}>
                  <Icon className="h-6 w-6" />
                </Link>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
