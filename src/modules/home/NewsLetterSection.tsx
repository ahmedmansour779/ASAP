"use client";

import Image from "next/image";
import NewsletterForm from "./components/NewsletterForm";

export default function NewsLetterSection() {
  return (
    <section className="relative my-28 flex min-h-[340px] items-center justify-center">
      <Image
        src="/assets/images/newsletter.png"
        alt="news letter section image"
        height={340}
        width={1440}
        className="absolute left-0 top-0 h-full w-full"
      />
      <div className="container relative flex w-full flex-col items-center justify-between gap-8 md:flex-row">
        <p className="max-w-[600px] text-2xl font-bold md:text-4xl">
          <span className="mr-1 leading-normal text-primary-main">
            Subscribe
          </span>
          your email address For future latest news & updates
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}
