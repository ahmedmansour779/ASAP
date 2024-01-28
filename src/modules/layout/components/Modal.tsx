"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  opened: boolean;
  children: ReactNode;
  onClickCloseButton?: () => void;
};

export default function Modal({
  opened,
  children,
  onClickCloseButton,
}: ModalProps) {
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [opened]);

  if (
    typeof document === "undefined" ||
    typeof document.body === "undefined" ||
    !opened
  ) {
    return;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/60 p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClickCloseButton?.();
        }
      }}>
      <div className="flex h-fit max-h-[600px] w-fit max-w-full justify-center rounded-xl">
        {children}
      </div>
    </div>,
    document.body
  );
}
