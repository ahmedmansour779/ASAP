import BaseLink from "@/components/BaseLink";
import { EmptyWishlistIcon } from "@/shared/icons/icons";
import { URLS } from "@/shared/urls";
import { trans } from "@mongez/localization";

export default function EmptyWishlist() {
  return (
    <section className="mb-28 flex flex-col items-center justify-center gap-2 text-center">
      <EmptyWishlistIcon />
      <h2 className="mt-4 text-lg font-semibold capitalize text-primary-main md:text-2xl">
        {trans("emptyWishlist")}
      </h2>
      <div className="text-sm capitalize text-primary-text/60 md:text-base">
        {trans("haveNotSaveItems")}
      </div>
      <BaseLink
        href={URLS.home.href}
        className="mt-10 w-60 max-w-full rounded-lg bg-primary-main px-6 py-4 text-sm text-primary-white hover:bg-primary-main/80">
        {trans("goToHome")}
      </BaseLink>
    </section>
  );
}
