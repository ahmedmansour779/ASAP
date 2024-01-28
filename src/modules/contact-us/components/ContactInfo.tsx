import { Settings } from "@/modules/home/utils/types";
import {
  ContactMailIcon,
  ContactPhoneIcon,
  LocationIcon,
} from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import React from "react";

type ContactInfoProps = {
  settings: Settings;
};

export default function ContactInfo({ settings }: ContactInfoProps) {
  return (
    <div className="mt-6 flex max-w-[550px] flex-wrap items-center gap-6">
      {settings?.contact?.phoneNumber && (
        <div className="flex items-center gap-4">
          <ContactPhoneIcon />
          <div className="flex flex-1 flex-col">
            <span className="font-medium uppercase">{trans("phone")}</span>
            <span className="text-sm text-primary-main">
              {settings?.contact?.phoneNumber}
            </span>
          </div>
        </div>
      )}
      {settings?.contact?.email && (
        <div className="flex items-center gap-2">
          <ContactMailIcon />
          <div className="flex flex-1 flex-col">
            <span className="font-medium uppercase">{trans("email")}</span>
            <span className="text-sm text-primary-main">
              {settings?.contact?.email}
            </span>
          </div>
        </div>
      )}
      {settings?.contact?.address && (
        <div className="flex items-center gap-2">
          <LocationIcon />
          <div className="flex flex-1 flex-col">
            <span className="font-medium uppercase">{trans("address")}</span>
            <span className="text-sm text-primary-main">
              {settings?.contact?.address}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
