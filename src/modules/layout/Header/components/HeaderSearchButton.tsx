import { headerMenuAtom } from "@/atoms/header-menu-atom";
import { advancedSearchStateAtom } from "@/modules/home/atoms/advanced-search-state-atom";
import { SearchIcon } from "@/shared/icons/icons";

export default function HeaderSearchButton() {
  return (
    <button
      onClick={() => {
        advancedSearchStateAtom.open();
        headerMenuAtom.close();
      }}
      className="rounded-full bg-secondary-main p-3 transition-colors hover:bg-primary-lighter hover:text-primary-main"
      aria-label="search">
      <SearchIcon />
    </button>
  );
}
