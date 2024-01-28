import BaseLink from "@/components/BaseLink";
import { IconProps } from "@/shared/icons/icons";
import { URLS } from "@/shared/urls";
import { trans } from "@mongez/localization";
import Image from "next/image";
import { Category } from "../utils/types";

function CategoryBadge(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="50"
      viewBox="0 0 48 50"
      fill="none">
      <g clipPath="url(#clip0_723_233)">
        <path
          d="M-100 -3.95997e-05C-100 -3.95997e-05 66.251 -54.8404 48 -3.95997e-05C46.7902 3.63519 44.7732 7.74174 42.6689 11.535C38.1487 19.6831 37.3563 29.594 41.6655 37.8556C44.5492 43.3841 40.5382 50 34.3029 50H-100V-3.95997e-05Z"
          fill="#BA0000"
        />
      </g>
      <defs>
        <clipPath id="clip0_723_233">
          <path d="M0 0H48V42C48 46.4183 44.4183 50 40 50H0V0Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

type CategoryCardProps = {
  type: Category;
};

export default function CategoryCard({ type }: CategoryCardProps) {
  return (
    <BaseLink
      href={`${URLS.properties.href}?type=${type.type.id}`}
      className="relative inline-block h-[332px] w-[283px] overflow-hidden rounded-xl">
      <div className="relative z-10 flex h-[50px]  w-[150px] min-w-fit items-center justify-center bg-primary-main px-4 text-center text-primary-white">
        <CategoryBadge className="absolute top-0 ltr:right-0 ltr:translate-x-1/2 rtl:left-0 rtl:-translate-x-1/2 rtl:-scale-x-100" />
        <span className="relative">
          {type.total} {trans("properties")}
        </span>
      </div>
      <Image
        loading="lazy"
        src={type.type.banner?.url}
        alt="category image"
        width={650}
        height={650}
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 z-10 flex w-full flex-col rounded-t-xl bg-secondary-main/40 px-6 py-4 text-center capitalize backdrop-blur">
        <span className="text-lg font-semibold">{type.type.name}</span>
      </div>
    </BaseLink>
  );
}
