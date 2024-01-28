import BaseLink from "@/components/BaseLink";
import React from "react";

export default function NotFound() {
  return (
    <section className="container flex flex-col items-center justify-center gap-5 py-24 text-primary-text/60">
      <h1 className="text-2xl font-bold text-primary-text md:text-3xl">
        Oops... This Page was not found.
      </h1>
      <p className="max-w-lg text-center font-medium">
        This page doesn’t seem to exist Don&lsquo;t feel bad, let us help you
        get back on your way!
      </p>
      <BaseLink
        className="min-w-[209px] rounded-xl bg-primary-main p-[18px] text-center text-primary-white transition-colors hover:bg-primary-main/80"
        href="/">
        Return Home
      </BaseLink>
    </section>
  );
}
