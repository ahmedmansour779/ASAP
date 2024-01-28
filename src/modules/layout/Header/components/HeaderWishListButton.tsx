import { headerMenuAtom } from "@/atoms/header-menu-atom";
import BaseLink from "@/components/BaseLink";
import { userAtom } from "@/modules/profile/atoms/user-atom";
import { HeartIcon } from "@/shared/icons/icons";
import { URLS } from "@/shared/urls";

export default function HeaderWishListButton() {
  const isLoggedIn = userAtom.use("type") === "user";
  const totalWishlist = userAtom.use("totalWishlist");

  return (
    isLoggedIn && (
      <BaseLink
        href={URLS.wishlist.href}
        onClick={() => {
          headerMenuAtom.close();
        }}
        className="relative rounded-full bg-secondary-main p-3 transition-colors hover:bg-primary-lighter hover:text-primary-main"
        aria-label="wishlist">
        <HeartIcon />
        <span className="absolute -right-2 -top-2 flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-primary-main text-xs font-medium text-primary-white">
          {totalWishlist > 99 ? "99+" : totalWishlist}
        </span>
      </BaseLink>
    )
  );
}
