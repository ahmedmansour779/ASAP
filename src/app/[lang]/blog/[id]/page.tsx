import BackButton from "@/components/BackButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyButton from "@/components/CopyButton";
import InViewPort from "@/components/InViewPort";
import NoData from "@/components/NoData";
import {
  withLocalization,
  withLocalizationMetadata,
} from "@/components/localization/WithLocalization";
import PostsSection from "@/modules/blog/components/PostsSection";
import { getPost } from "@/modules/blog/services/blog-service";
import { GenericObject } from "@/shared/types";
import { URLS } from "@/shared/urls";
import { trans } from "@mongez/localization";
import Image from "next/image";

export const generateMetadata = withLocalizationMetadata(
  async ({ params }: GenericObject) => {
    const post = await getPost(params.id);

    if (!post) {
      return {
        title: trans("notFound"),
      };
    }

    return {
      title: post.title,
      description: post.slug,
    };
  }
);

export const revalidate = 360 * 12;

async function BlogDetailsPage({ params }: GenericObject) {
  const post = await getPost(params.id);

  if (!post) {
    return <NoData message={trans("couldNotGetData")} backToHome />;
  }

  return (
    <section className="relative">
      <div className="container absolute left-1/2 top-10 z-10 w-full -translate-x-1/2">
        <BackButton />
      </div>
      <Breadcrumbs
        navLinks={[
          { url: URLS.blog.href, title: trans("blog") },
          { title: post.title },
        ]}
        title={post.title}
      />
      <div className="container my-28 flex flex-col gap-10">
        <div className="space-y-2">
          <div className="opacity-70">{post.createdAt.date}</div>
          <div className="flex items-center justify-between gap-6">
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <CopyButton />
          </div>
        </div>
        <div className="rounded-xl bg-secondary-main">
          <Image
            src={post.image.url}
            alt="blog image"
            width={1200}
            height={650}
            className="h-[400px] w-full rounded-xl object-cover"
          />
        </div>
        <div
          className="prose w-[1440px] max-w-full prose-headings:text-primary-main prose-a:text-blue-500"
          dangerouslySetInnerHTML={{ __html: post.description }}></div>
      </div>
      <InViewPort>
        <PostsSection />
      </InViewPort>
    </section>
  );
}

export default withLocalization(BlogDetailsPage);
