"use client";

import { cn } from "@/lib/utils";
import {
  FormControlProps,
  integerRule,
  patternRule,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";

type TextInputProps = {
  containerStyles?: string;
  icon?: JSX.Element;
  iconStyle?: string;
} & FormControlProps;

export default function TextInput({
  containerStyles,
  icon,
  ...props
}: TextInputProps) {
  const { value, changeValue, type, id, otherProps, name, error } =
    useFormControl({
      rules: props.rules || [requiredRule, patternRule, integerRule],
      ...props,
    });

  return (
    <div
      className={cn("mt-2 flex w-full flex-1 flex-col gap-1", containerStyles)}>
      <label>{otherProps.label}</label>
      <div className="relative">
        <input
          {...otherProps}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={(e) => {
            changeValue(e.target.value);
          }}
          className={cn(
            "w-full min-w-[180px] rounded-xl border border-secondary-dark px-6 py-4 tracking-wide outline-none placeholder:text-primary-text/60 focus-within:border-primary-main",
            otherProps.className,
            icon && "ltr:pl-12 rtl:pr-12",
            error && "border-red-500 focus-within:border-red-500"
          )}
        />
        {icon && (
          <div className="absolute top-1/2 -translate-y-1/2 ltr:left-4 rtl:right-4">
            {icon}
          </div>
        )}
      </div>

      {error && (
        <span className="animate-show-error overflow-hidden text-sm text-red-500 transition">
          {error}
        </span>
      )}
    </div>
  );
}
