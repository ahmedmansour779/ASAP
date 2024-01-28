"use client";

import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type InViewPortProps = {
  children: ReactNode;
};

export default function InViewPort({ children }: InViewPortProps) {
  const { inView, ref } = useInView({ triggerOnce: true });

  return inView ? (
    <>{children}</>
  ) : (
    <div ref={ref} className="my-10 h-screen"></div>
  );
}
