"use client";

import { cn } from "@/lib/utils";
import { CopyIcon, SuccessIcon } from "@/shared/icons/icons";
import { trans } from "@mongez/localization";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CopyButton() {
  const [isCopied, setIsCopied] = useState(false);

  const startTime = () => {
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      disabled={isCopied}
      title="copy"
      aria-label="copy"
      className={cn(
        "rounded-full border p-3 transition-colors hover:bg-secondary-main",
        isCopied && "bg-green-500 text-primary-white hover:bg-green-500"
      )}
      onClick={() => {
        navigator.clipboard?.writeText(location.href);
        toast.success(trans("linkHasBeenCopied"));
        setIsCopied(true);
        startTime();
      }}>
      {isCopied ? (
        <SuccessIcon />
      ) : (
        <CopyIcon className="text-primary-text/80" />
      )}
    </button>
  );
}
