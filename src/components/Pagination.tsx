"use client";

import { cn } from "@/lib/utils";
import { DotsIcon, PaginationArrowIcon } from "@/shared/icons/icons";
import { PaginationInfo } from "@/shared/types";
import { getPaginationNumbers } from "@/utils/getPaginationNumbers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type PaginationSectionProps = {
  paginationInfo: PaginationInfo;
};

export default function Pagination({ paginationInfo }: PaginationSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { pages, page } = paginationInfo;

  const numbersLimit = 5;
  const pageNumbers = getPaginationNumbers(page, pages);

  function handlePagesNavigation(page: number) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());

    router.push(`${pathname}?${newSearchParams}`);
  }

  return (
    <div className="mt-24 flex select-none items-center justify-center gap-8">
      <button
        onClick={() => {
          handlePagesNavigation(page - 1);
        }}
        disabled={page === 1}
        className="flex items-center gap-3 rounded-full bg-secondary-main p-3 font-medium text-red-500 transition-colors hover:bg-secondary-dark disabled:cursor-not-allowed disabled:opacity-30">
        <PaginationArrowIcon className="ltr:rotate-180" />
      </button>
      <div className="flex items-center gap-4">
        {page > 3 && (
          <>
            <button
              onClick={() => {
                handlePagesNavigation(1);
              }}
              className={cn(
                "h-9 w-9 rounded-full text-primary-white transition-colors hover:bg-primary-main hover:text-primary-white",
                page === 1
                  ? "bg-primary-main"
                  : "bg-primary-lighter text-primary-main"
              )}>
              {1}
            </button>
            <DotsIcon className="w-4" />
          </>
        )}
        {pageNumbers.map((number) => {
          return (
            <button
              onClick={() => {
                handlePagesNavigation(number);
              }}
              key={number}
              className={cn(
                "h-9 w-9 rounded-full text-primary-white transition-colors hover:bg-primary-main hover:text-primary-white",
                page === number
                  ? "bg-primary-main"
                  : "bg-primary-lighter text-primary-main"
              )}>
              {number}
            </button>
          );
        })}
        {(page + pages) / numbersLimit < pages && pages > 4 && (
          <>
            <DotsIcon className="w-4" />
            <button
              onClick={() => {
                handlePagesNavigation(pages);
              }}
              className={cn(
                "h-9 w-9 rounded-full text-primary-white transition-colors hover:bg-primary-main hover:text-primary-white",
                page === pages
                  ? "bg-primary-main"
                  : "bg-primary-lighter text-primary-main"
              )}>
              {pages}
            </button>
          </>
        )}
      </div>
      <button
        onClick={() => handlePagesNavigation(page + 1)}
        disabled={page === pages}
        className="flex items-center gap-3 rounded-full bg-secondary-main p-3 font-medium text-red-500 transition-colors hover:bg-secondary-dark disabled:cursor-not-allowed disabled:opacity-30">
        <PaginationArrowIcon className="rtl:rotate-180" />
      </button>
    </div>
  );
}
