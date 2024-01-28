"use client";

import { useEffect, useState } from "react";

export function useMedia(media = 1024) {
  const [isSmallerScreen, setIsSmallerScreen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(1440);

  useEffect(() => {
    setScreenWidth(window.screen.width);
    setIsSmallerScreen(window.screen.width <= media);
  }, [media]);

  return { isSmallerScreen, screenWidth };
}
