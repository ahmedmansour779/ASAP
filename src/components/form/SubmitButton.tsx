import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type SubmitButtonProps = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({
  label,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      {...props}
      type="submit"
      className={cn(
        "w-full rounded-xl bg-primary-main px-6 py-4 font-semibold text-primary-white transition-colors hover:bg-primary-main/80 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary-main",
        className
      )}>
      {label}
    </button>
  );
}
