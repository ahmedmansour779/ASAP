"use client";

import Loader from "@/components/Loader";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { UpDownArrowsIcon } from "@/shared/icons/icons";
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

type Options = {
  ref: Option[];
  filteredOptions: Option[];
};

export default function HeroSearchSelectInputWithSearch({
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

  const [selectedValue, setSelectedValue] = useState<Option | null>(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Options>({
    ref: [],
    filteredOptions: [],
  });

  useEffect(() => {
    if (isOpen) {
      if (storedOptionsRef.current.length > 0) {
        setOptions({
          ref: storedOptionsRef.current,
          filteredOptions: storedOptionsRef.current,
        });
        return;
      }

      setIsLoading(true);
      endpoint()
        .then(({ data }) => {
          storedOptionsRef.current.push(...data[type]);
          setOptions({
            ref: data[type],
            filteredOptions: data[type],
          });
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
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex cursor-pointer items-center justify-between gap-2"
        )}>
        <input
          id={id}
          name={name}
          type="text"
          placeholder={otherProps.placeholder}
          autoComplete="off"
          className={cn(
            "flex w-full items-center justify-between gap-4 bg-transparent capitalize text-primary-text focus-within:outline-transparent focus-visible:outline-0",
            !selectedValue && "text-primary-text",
            otherProps.label && "mt-2",
            otherProps.className,
            error && "text-primary-danger"
          )}
          value={search}
          onChange={(e) => {
            const filteredOptions = e.target.value.trim()
              ? options.ref.filter((option) =>
                  option.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              : options.ref;

            setSelectedValue(null);
            setSearch(e.target.value);
            setOptions({
              ...options,
              filteredOptions,
            });
          }}
        />
        <UpDownArrowsIcon />
      </div>

      {isOpen && (
        <ul className="absolute top-[calc(100%+10px)] z-10 max-h-[250px] w-full min-w-[250px]  animate-show-menu space-y-3 overflow-auto rounded-xl bg-primary-white p-2 shadow-[0px_15px_66px_0px_rgba(0,0,0,0.21)] ltr:left-0 rtl:right-0">
          {isLoading ? (
            <li>
              <Loader />
            </li>
          ) : options.filteredOptions?.length ? (
            options?.filteredOptions.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer rounded-xl bg-secondary-main/30 px-4 py-2 capitalize transition-colors hover:bg-primary-lighter hover:text-primary-main"
                onClick={() => {
                  setSelectedValue(option);
                  setSearch(option.name);
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
