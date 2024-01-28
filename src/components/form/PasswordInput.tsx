import { cn } from "@/lib/utils";
import { EyeIcon, HideEyeIcon } from "@/shared/icons/icons";
import {
  FormControlProps,
  lengthRule,
  matchRule,
  maxLengthRule,
  minLengthRule,
  patternRule,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import { useState } from "react";

export default function PasswordInput(props: FormControlProps) {
  const { value, changeValue, id, error, otherProps, disabled } =
    useFormControl({
      ...props,
      rules: props.rules || [
        requiredRule,
        minLengthRule,
        maxLengthRule,
        lengthRule,
        patternRule,
        matchRule,
      ],
    });

  const [type, setType] = useState<"password" | "text">("password");

  return (
    <div className="space-y-2 text-sm">
      {otherProps.label && (
        <label
          htmlFor={id}
          className="text-text_color cursor-pointer font-medium capitalize">
          {otherProps.label}
        </label>
      )}
      <div className="relative">
        <input
          {...otherProps}
          id={id}
          type={type}
          disabled={disabled}
          className={cn(
            "border-field_placeholder bg-field_bg  text-text_color w-full rounded-xl border px-5 py-[19px] tracking-wide placeholder:capitalize",
            error ? "outline-red-500" : "outline-primary"
          )}
          value={value}
          onChange={(e) => {
            changeValue(e.target.value);
          }}
        />
        <button
          type="button"
          className="outline-primary absolute right-4 top-1/2 -translate-y-1/2 rtl:left-4 rtl:right-auto"
          onClick={() => setType(type === "password" ? "text" : "password")}>
          {type === "password" ? (
            <EyeIcon className="text-[#1E1E1E80]" />
          ) : (
            <HideEyeIcon className="text-[#1E1E1E80]" />
          )}
        </button>
      </div>
      {error && (
        <div className="mt-2 inline-block text-sm text-red-500">{error}</div>
      )}
    </div>
  );
}
