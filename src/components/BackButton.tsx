"use client";

import { BackArrowIcon } from "@/shared/icons/icons";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={router.back}
      className="text-primary-main"
      title="back"
      aria-label="back button">
      <BackArrowIcon className="rtl:rotate-180" />
    </button>
  );
}
