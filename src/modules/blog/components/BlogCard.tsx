import BaseLink from "@/components/BaseLink";
import { URLS } from "@/shared/urls";
import { trans } from "@mongez/localization";
import Image from "next/image";
import { Blog } from "../utils/types";

type BlogCardProps = {
  blog: Blog;
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <BaseLink
      href={`${URLS.blog.href}/${blog.id}`}
      className="inline-block w-[328px] rounded-xl p-4">
      <div className="h-[180px] w-full">
        <Image
          src={blog.image?.url}
          alt="blog image"
          width={338}
          height={201}
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
      <div className="mt-4 space-y-2">
        <div className="text-sm opacity-80">{blog.createdAt.date}</div>
        <h2 className="line-clamp-2 h-[56px] text-lg font-semibold">
          {blog.title}
        </h2>
        {blog.createdBy && (
          <div className="text-base capitalize opacity-80">
            {trans("by")}: {blog.createdBy?.name}
          </div>
        )}
      </div>
    </BaseLink>
  );
}
