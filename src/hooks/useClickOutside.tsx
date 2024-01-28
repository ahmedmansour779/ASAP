import { RefObject, useEffect, useState } from "react";

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>
) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  }, [ref]);

  return { isOpen, setIsOpen };
}
