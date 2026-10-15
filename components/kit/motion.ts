"use client";
/*
  Motion helpers for signature interactions.

  useMoved(): play animations only after the visitor interacts, never on load.
    const m = useMoved();
    <div className={`x-stage ${m.moved ? "is-moved" : ""}`} key={m.key}> ... </div>
    onClick={() => { setPick(i); m.trigger(); }}
    CSS:  .is-moved .x-pic { animation: kit-in-fwd .42s var(--kit-out) both; }
  Changing `key` remounts the element so the CSS animation replays every time.

  useInView(): true once the element scrolls into view (for "data-live" sections).
    const [ref, live] = useInView<HTMLDivElement>();
    <section ref={ref} data-live={live ? "on" : undefined}>
*/
import { useCallback, useEffect, useRef, useState } from "react";

export function useMoved() {
  const [key, setKey] = useState(0);
  const trigger = useCallback(() => setKey((k) => k + 1), []);
  return { key, moved: key > 0, trigger };
}

export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || live) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLive(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [live, threshold]);
  return [ref, live] as const;
}
