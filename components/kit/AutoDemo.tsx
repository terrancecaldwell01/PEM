"use client";
/*
  Gentle auto-advance for a signature: plays once it scrolls into view, pauses offscreen,
  never runs under reduced motion, stops for good the moment the visitor taps something.
  A progress bar drives the timing (its animationend advances the step), so Pause is exact.

    const demo = useAutoDemo<HTMLDivElement>({ count: ITEMS.length, ms: 2200, loop: true, onStep: (i) => setPick(i) });
    <div ref={demo.ref}> ...
      <button onClick={() => { demo.stop(); setPick(i); }}>...</button>
      <DemoControls p="xx" demo={demo} />
    </div>

  onStep(i) fires as step i lands (0 first, after the first bar fills). With loop: false the demo ends after count steps.
  DemoControls renders: .xx-demo (.is-off when finished)  .xx-demo-bar > i  .xx-demo-btn
  Style the bar's <i> with: transform-origin: left; animation: kit-fill-x linear both (duration is set inline).
*/
import { useCallback, useEffect, useRef, useState } from "react";

type Opts = { count: number; ms?: number; loop?: boolean; threshold?: number; onStep: (i: number) => void };

export function useAutoDemo<T extends Element>({ count, ms = 1800, loop = false, threshold = 0.35, onStep }: Opts) {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const started = useRef(false);
  const cb = useRef(onStep);
  cb.current = onStep;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setOn(true);
  }, [visible]);

  const advance = useCallback(() => {
    cb.current(step % count);
    if (!loop && step + 1 >= count) setOn(false);
    else setStep(step + 1);
  }, [step, count, loop]);

  const stop = useCallback(() => setOn(false), []);
  const toggle = useCallback(() => setPaused((p) => !p), []);

  return { ref, on, paused, running: on && !paused && visible, step, ms, advance, stop, toggle };
}

export type AutoDemo = ReturnType<typeof useAutoDemo>;

export function DemoControls({ p, demo, labels = ["Pause", "Play"] }: { p: string; demo: AutoDemo; labels?: [string, string] }) {
  return (
    <div className={`${p}-demo ${demo.on ? "" : "is-off"}`}>
      <span className={`${p}-demo-bar`}>
        {demo.on && (
          <i key={demo.step} onAnimationEnd={demo.advance}
            style={{ animationDuration: `${demo.ms}ms`, animationPlayState: demo.running ? "running" : "paused" }} />
        )}
      </span>
      <button type="button" className={`${p}-demo-btn`} onClick={demo.toggle} disabled={!demo.on} aria-pressed={demo.paused}>
        {demo.paused ? labels[1] : labels[0]}
      </button>
    </div>
  );
}
