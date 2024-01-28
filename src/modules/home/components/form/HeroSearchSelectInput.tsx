"use client";

import Loader from "@/components/Loader";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { NavigateArrowIcon } from "@/shared/icons/icons";
import { City } from "@/shared/types";
import { trans } from "@mongez/localization";
import {
  FormControlProps,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type SelectInputProps = {
  endpoint: () => Promise<any>;
  type: string;
  containerStyles?: string;
} & FormControlProps;

type Option = {
  id: number;
  name: string;
  city?: City;
  slug: string;
};

export default function HeroSearchSelectInput({
  endpoint,
  type,
  containerStyles,
  ...props
}: SelectInputProps) {
  const { changeValue, otherProps, error, name, id } = useFormControl({
    rules: [requiredRule],
    ...props,
  });

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const storedOptionsRef = useRef<Option[]>([]);

  const { isOpen, setIsOpen } = useClickOutside(wrapperRef);

  const [options, setOptions] = useState<Option[]>([]);
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (storedOptionsRef.current.length > 0) {
        setOptions(storedOptionsRef.current);
        return;
      }

      setIsLoading(true);
      endpoint()
        .then(({ data }) => {
          storedOptionsRef.current.push(...data[type]);
          setOptions(data[type] || []);
        })
        .catch(() => {
          toast.error(trans("couldNotGetData"));
        })
        .finally(() => setIsLoading(false));
    }
  }, [endpoint, isOpen, type]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative flex w-full flex-1 flex-col gap-1",
        containerStyles
      )}>
      {otherProps.label && (
        <label
          className="shrink-0 cursor-pointer text-lg font-medium capitalize"
          onClick={() => setIsOpen(true)}>
          {otherProps.label}
        </label>
      )}
      <button
        id={id}
        name={name}
        type="button"
        className={cn(
          "flex w-full items-center justify-between gap-4 capitalize text-primary-text",
          !selectedValue && "text-primary-text/60",
          otherProps.label && "mt-2",
          otherProps.className,
          error && "text-primary-danger"
        )}
        onClick={() => setIsOpen(!isOpen)}>
        <span className="line-clamp-1 flex-1 text-start">
          {selectedValue?.name || otherProps.placeholder}
        </span>
        <NavigateArrowIcon
          className={cn(
            "h-2.5 w-2.5 rotate-180 text-sm text-primary-text transition-transform",
            isOpen && "rotate-0"
          )}
        />
      </button>
      {isOpen && (
        <ul className="absolute top-[calc(100%+10px)] z-10 max-h-[250px] w-full min-w-[250px]  animate-show-menu space-y-3 overflow-auto rounded-xl bg-primary-white p-2 shadow-[0px_15px_66px_0px_rgba(0,0,0,0.21)] ltr:left-0 rtl:right-0">
          {isLoading ? (
            <li>
              <Loader />
            </li>
          ) : options?.length ? (
            options?.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer rounded-xl bg-secondary-main/30 px-4 py-2 capitalize transition-colors hover:bg-primary-lighter hover:text-primary-main"
                onClick={() => {
                  setSelectedValue(option);
                  changeValue(option.id);
                  setIsOpen(false);
                }}>
                {option.name}
              </li>
            ))
          ) : (
            <div className="py-6 text-center font-medium">
              {trans("NoData")}
            </div>
          )}
        </ul>
      )}
    </div>
  );
}
