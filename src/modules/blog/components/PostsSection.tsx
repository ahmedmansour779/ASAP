"use client";

import Loader from "@/components/Loader";
import { trans } from "@mongez/localization";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { getPosts } from "../services/client-blog-services";
import { Blog } from "../utils/types";
import BlogCard from "./BlogCard";
import BlogSlider from "./sliders/BlogSlider";

export default function PostsSection() {
  const [posts, setPosts] = useState<Blog[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPosts({ popular: true })
      .then(({ data }) => {
        setPosts(data.posts);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!posts || error) {
    return null;
  }

  return (
    <div className="my-28">
      <h2 className="container text-2xl font-medium">{trans("latestPosts")}</h2>
      <div className="relative mt-10 overflow-hidden	rounded-xl">
        <BlogSlider arrows>
          {posts.map((blog) => (
            <SwiperSlide style={{ width: "fit-content" }} key={blog.id}>
              <BlogCard key={blog.id} blog={blog} />
            </SwiperSlide>
          ))}
        </BlogSlider>
      </div>
    </div>
  );
}
