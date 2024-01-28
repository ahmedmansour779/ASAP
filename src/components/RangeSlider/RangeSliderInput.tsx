"use client";

import { trans } from "@mongez/localization";
import { useState } from "react";
import ReactSlider from "react-slider";

export type RangeSliderProps = {
  min: number;
  max: number;
  handleFilterChange: (values: number[]) => void;
};

export default function RangeSliderInput({
  min,
  max,
  handleFilterChange,
}: RangeSliderProps) {
  const [values, setValues] = useState([min, max]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <span>
          {trans("from")}: {values[0]}
        </span>
        <span>
          {trans("to")}: {values[1]}
        </span>
      </div>
      <ReactSlider
        className="range-slider"
        onAfterChange={() => {
          handleFilterChange(values);
        }}
        value={values}
        onChange={setValues}
        min={min}
        max={max}
      />
    </div>
  );
}
