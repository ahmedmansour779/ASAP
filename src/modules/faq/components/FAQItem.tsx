"use client";

import { useState } from "react";

type FAQItemProps = {
  title: string;
  description: string;
};

export default function FAQItem({ title, description }: FAQItemProps) {
  const [show, setShow] = useState<boolean>(false);

  const contentQuestions = description.replace(/\./g, ".<br>");

  return (
    <div
      className="m-auto w-full cursor-pointer overflow-hidden rounded-md bg-white shadow-[0px_20px_20px_0px_rgba(31,41,55,0.02)] sm:w-4/5"
      style={{ border: show ? "1px solid #BA000035" : "1px solid #F4F4F4" }}>
      <div
        className="flex items-center justify-between gap-2 px-4 py-3 transition-all duration-[0.3s] ease-in-out"
        onClick={() => setShow(!show)}
        style={{ borderBottom: show ? "1px solid #BA000035" : "" }}>
        <p
          className="text-[16px] font-medium capitalize leading-6 transition-all duration-[0.3s] ease-in-out"
          style={{ color: show ? "#BA0000" : "#303030" }}>
          {title}
        </p>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full p-2 transition-all duration-[0.3s] ease-in-out"
          style={{ backgroundColor: show ? "#F2F2F2" : "" }}>
          {show ? "-" : "+"}
        </div>
      </div>
      <div
        className="overflow-hidden px-4 py-3 text-sm font-normal leading-[25.2px] text-[#666] transition-all duration-[0.3s] ease-in-out"
        style={{
          height: show ? "fit-content" : "0px",
          padding: show ? "" : "0px 16px",
        }}
        dangerouslySetInnerHTML={{ __html: contentQuestions }}
      />
    </div>
  );
}
