import React from "react";

export default function RangeInput() {
  return (
    <div className="mx-auto mb-12 max-w-sm space-y-3 lg:mb-16 lg:max-w-3xl">
      <input
        className="slider"
        type="range"
        min="0"
        max="4"
        aria-valuetext=""
        aria-label=""
      />
    </div>
  );
}
