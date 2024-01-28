import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export default function Separator(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("h-0.5 w-full bg-secondary-main", props.className)}></div>
  );
}
