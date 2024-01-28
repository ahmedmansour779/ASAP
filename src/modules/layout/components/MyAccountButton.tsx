"use client";

import { headerMenuAtom } from "@/atoms/header-menu-atom";
import BaseLink from "@/components/BaseLink";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { logoutStateAtom } from "@/modules/auth/atoms/logout-state-atom";
import { userAtom } from "@/modules/profile/atoms/user-atom";
import { NavigateArrowIcon } from "@/shared/icons/icons";
import { URLS } from "@/shared/urls";
import { trans } from "@mongez/localization";
import Image from "next/image";
import { useRef } from "react";

type RegisterLinksProps = {
  onClose?: () => void;
};

export function RegisterLinks({ onClose }: RegisterLinksProps) {
  const isLoggedIn = userAtom.use("type") === "user";

  return (
    !isLoggedIn && (
      <>
        <BaseLink
          href={URLS.signIn.href}
          onClick={() => {
            headerMenuAtom.close();
            onClose?.();
          }}
          className="block w-full rounded-full border border-primary-main bg-primary-main p-3 text-center capitalize text-primary-white transition-colors hover:bg-primary-main/80">
          {trans("login")}
        </BaseLink>
        <BaseLink
          href={URLS.signUp.href}
          onClick={() => {
            headerMenuAtom.close();
            onClose?.();
          }}
          className="block w-full rounded-full border border-primary-main p-3 text-center capitalize text-primary-main transition-colors hover:bg-primary-lighter">
          {trans("signUp")}
        </BaseLink>
      </>
    )
  );
}

type UserActionsProps = {
  onClose?: () => void;
};

export function UserActions({ onClose }: UserActionsProps) {
  const isLoggedIn = userAtom.use("type") === "user";

  return (
    isLoggedIn && (
      <>
        <BaseLink
          href={URLS.profile.href}
          onClick={() => {
            headerMenuAtom.close();
            onClose?.();
          }}
          className="block w-full rounded-full bg-secondary-main/50 p-3 text-center capitalize transition-colors hover:bg-secondary-main">
          {trans("myProfile")}
        </BaseLink>
        <button
          onClick={() => {
            headerMenuAtom.close();
            logoutStateAtom.open();
            onClose?.();
          }}
          className="w-full rounded-full bg-primary-danger/10 p-3 text-center capitalize text-primary-danger transition-colors hover:bg-primary-danger hover:text-primary-white">
          {trans("logOut")}
        </button>
      </>
    )
  );
}

export default function MyAccountButton() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { setIsOpen, isOpen } = useClickOutside(menuRef);

  return (
    <div ref={menuRef} className="relative w-full shrink-0 lg:w-auto">
      <button
        className="flex w-full items-center gap-3 rounded-full bg-secondary-main px-4 py-2.5"
        title="My account"
        aria-label="my account"
        onClick={() => setIsOpen(!isOpen)}>
        <Image
          src="/assets/images/avatar.png"
          alt="avatar image"
          width={26}
          height={26}
        />
        <NavigateArrowIcon
          className={cn(
            "h-2.5 w-2.5 rotate-180 transition-transform",
            isOpen && "rotate-0"
          )}
        />
      </button>
      {isOpen && (
        <div className="absolute top-[calc(100%+10px)] min-w-[250px] animate-show-menu space-y-4 rounded-xl bg-primary-white px-4 py-6 shadow-[0px_15px_66px_0px_rgba(0,0,0,0.21)] ltr:right-0 rtl:left-0">
          <UserActions onClose={() => setIsOpen(false)} />
          <RegisterLinks onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
