"use client";

import Separator from "@/components/Separator";
import Modal from "@/modules/layout/components/Modal";
import {
  BackArrowIcon,
  ColoredFacebookIcon,
  ColoredTwitterIcon,
  ColoredWhatsAppIcon,
  CopyIcon,
} from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import Link from "next/link";
import toast from "react-hot-toast";
import { shareOpenAtom } from "../../atoms/share-open-atom";

export default function SharePopup() {
  const href = typeof window !== "undefined" ? window.location.href : "#";
  const opened = shareOpenAtom.use("opened");

  return (
    <Modal opened={opened} onClickCloseButton={shareOpenAtom.close}>
      <div className="flex w-[600px] max-w-full flex-col items-center gap-8 rounded-xl bg-primary-white p-4 text-center md:p-10 md:pb-12">
        <div className="flex w-full items-center justify-between gap-4 font-medium capitalize">
          share
          <button onClick={shareOpenAtom.close}>
            <BackArrowIcon className="rotate-180" />
          </button>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Link
            target="_blank"
            href={`https://api.whatsapp.com/send?text=${href}`}
            onClick={shareOpenAtom.close}
            className="flex items-center gap-2 rounded-full border border-[#60D66970] bg-[#60D66912] px-6 py-4">
            <ColoredWhatsAppIcon />
            WhatsApp
          </Link>
          <Link
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${href}`}
            onClick={shareOpenAtom.close}
            className="flex items-center gap-2 rounded-full border border-[#1877F270] bg-[#1877F212] px-6 py-4">
            <ColoredFacebookIcon />
            facebook
          </Link>
          <Link
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=${href}`}
            onClick={shareOpenAtom.close}
            className="flex items-center gap-2 rounded-full border border-[#00000070] bg-[#00000012] px-6 py-4">
            <ColoredTwitterIcon />
            twitter
          </Link>
        </div>
        <Separator className="my-3 h-[1px]" />
        <div className="relative w-full rounded-xl border bg-secondary-main px-6 py-4 text-start">
          {href}
          <button
            className="absolute top-1/2 -translate-y-1/2 ltr:right-4"
            title="copy"
            aria-label="copy button"
            onClick={() => {
              navigator.clipboard?.writeText(location?.href);
              toast.success(trans("linkHasBeenCopied"));
              shareOpenAtom.close();
            }}>
            <CopyIcon className="h-4 w-4 text-primary-main" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
