import Breadcrumbs from "@/components/Breadcrumbs";
import NoData from "@/components/NoData";
import Pagination from "@/components/Pagination";
import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import BlogCard from "@/modules/blog/components/BlogCard";
import { getPosts } from "@/modules/blog/services/blog-service";
import { NoPostsIcon } from "@/shared/icons/icons";
import { GenericObject } from "@/shared/types";
import { trans } from "@mongez/localization";

export const generateMetadata = withLocalizationMetadata(() => {
  return {
    title: trans("blog"),
  };
});

export const revalidate = 360 * 12;

async function BlogPage({ searchParams }: GenericObject) {
  const data = await getPosts(searchParams);

  if (!data) {
    return <NoData message={trans("couldNotGetData")} backToHome />;
  }

  return (
    <>
      <Breadcrumbs
        imageUrl="/assets/images/blog/breadcrumb.jpeg"
        navLinks={[{ title: trans("blog") }]}
        title={trans("blog")}
      />
      {data.posts?.length > 0 ? (
        <section className="container my-28">
          <div className=" grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {data.posts.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          {data.paginationInfo?.pages > 1 && (
            <Pagination paginationInfo={data.paginationInfo} />
          )}
        </section>
      ) : (
        <div className="my-28 flex flex-col items-center justify-center gap-6">
          <NoPostsIcon className="text-neutral-400" />
          <div className="text-2xl font-semibold capitalize text-primary-text/80">
            {trans("noPosts")}
          </div>
        </div>
      )}
    </>
  );
}

export default withLocalization(BlogPage);
