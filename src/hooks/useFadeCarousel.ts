"use client";

import { useCallback, useEffect, useState } from "react";

export function useFadeCarousel(itemCount: number, intervalMs: number) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    if (itemCount <= 0) return;
    setIndex(((i % itemCount) + itemCount) % itemCount);
  }, [itemCount]);

  const next = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  const prev = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (paused || itemCount <= 1) return;
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % itemCount);
    }, intervalMs);
    return () => window.clearTimeout(id);
  }, [index, intervalMs, itemCount, paused]);

  return { index, goTo, next, prev };
}
