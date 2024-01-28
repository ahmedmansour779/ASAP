import React from "react";

export default function Loader() {
  return (
    <div className="flex h-[200px] w-full items-center justify-center text-primary-main">
      <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-primary-main border-t-transparent"></div>
    </div>
  );
}
