"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { NavigateArrowIcon } from "@/shared/icons/icons";
import { Option } from "@/shared/types";
import {
  FormControlProps,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import { useRef, useState } from "react";

type SelectInputProps = {
  options: Option[];
  action?: (value: any) => void;
  buttonStyles?: string;
} & FormControlProps;

export default function SelectInput({
  options,
  action,
  buttonStyles,
  ...props
}: SelectInputProps) {
  const { value, changeValue, otherProps, error, name, id } = useFormControl({
    rules: [requiredRule],
    ...props,
  });

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, setIsOpen } = useClickOutside(wrapperRef);

  const [selectedValue, setSelectedValue] = useState(
    () => options?.find((option) => option.value === value)
  );

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative flex w-full flex-1 flex-col gap-1",
        otherProps.className
      )}>
      {otherProps.label && (
        <label
          className="shrink-0 cursor-pointer text-lg font-medium capitalize"
          onClick={() => setIsOpen(true)}>
          {otherProps.label}
        </label>
      )}
      <button
        type="button"
        id={id}
        name={name}
        className={cn(
          "flex w-full items-center justify-between gap-4 capitalize text-primary-text",
          !selectedValue && "text-primary-text/60",
          otherProps.label && "mt-2",
          buttonStyles,
          error && "text-primary-danger"
        )}
        onClick={() => setIsOpen(!isOpen)}>
        <span className="line-clamp-1 flex-1 text-start">
          {selectedValue?.label || otherProps.placeholder}
        </span>
        <NavigateArrowIcon
          className={cn(
            "h-2.5 w-2.5 rotate-180 text-sm text-primary-text transition-transform",
            isOpen && "rotate-0"
          )}
        />
      </button>
      {isOpen && (
        <ul className="absolute top-[calc(100%+10px)] z-20 max-h-[250px] w-full min-w-[250px]  animate-show-menu space-y-3 overflow-auto rounded-xl bg-primary-white p-2 shadow-[0px_15px_66px_0px_rgba(0,0,0,0.21)] ltr:left-0 rtl:right-0">
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer rounded-xl bg-secondary-main/30 px-4 py-2 capitalize transition-colors hover:bg-primary-lighter hover:text-primary-main"
              onClick={() => {
                action?.(option.value);
                setSelectedValue(option);
                changeValue(option.value);
                setIsOpen(false);
              }}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
