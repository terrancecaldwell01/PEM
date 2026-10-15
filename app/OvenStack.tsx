"use client";
/*
  Signature: build an Avantec stack from 1 to 4 belts with the real oven photos.
  Pick a belt count: the oven rises in, the belt bars slide out one by one, the count springs, the plate prints.
*/
import { useState, type CSSProperties } from "react";
import { useMoved } from "@/components/kit/motion";
import { useAutoDemo, DemoControls } from "@/components/kit/AutoDemo";

export type Stack = {
  belts: number;
  model: string;
  line: string;
  price: string;
  note: string;
  img: { src: string; alt: string; w: number; h: number };
};

export default function OvenStack({ stacks, cta }: { stacks: Stack[]; cta: { label: string; href: string } }) {
  const [pick, setPick] = useState(1);
  const m = useMoved();
  const demo = useAutoDemo<HTMLDivElement>({
    count: stacks.length,
    ms: 3400,
    loop: true,
    onStep: (i) => { setPick((i + 2) % stacks.length); m.trigger(); },
  });
  const s = stacks[pick];

  return (
    <div className="pem-stack" ref={demo.ref}>
      <div className="pem-tabs" role="tablist" aria-label="Number of belts">
        {stacks.map((v, i) => (
          <button
            key={v.belts}
            type="button"
            role="tab"
            aria-selected={i === pick}
            className={i === pick ? "is-on" : ""}
            onClick={() => { demo.stop(); setPick(i); m.trigger(); }}
          >
            <b>{v.belts}</b>
            <span>{v.belts === 1 ? "belt" : "belts"}</span>
          </button>
        ))}
      </div>

      <div className={`pem-stage ${m.moved ? "is-moved" : ""}`} key={m.key}>
        <div className="pem-stage-pic">
          <img src={s.img.src} alt={s.img.alt} width={s.img.w} height={s.img.h} />
        </div>
        <div className="pem-plate">
          <div className="pem-plate-top">
            <strong className="pem-plate-num">{s.belts}</strong>
            <div className="pem-belts" aria-hidden="true">
              {[0, 1, 2, 3].map((b) => (
                <i key={b} className={b < s.belts ? "is-on" : ""} style={{ "--d": `${0.25 + (s.belts - 1 - b) * 0.12}s` } as CSSProperties} />
              ))}
            </div>
          </div>
          <div className="pem-plate-txt">
            <p className="pem-plate-model">{s.model}</p>
            <p className="pem-plate-line">{s.line}</p>
            <p className="pem-plate-price">{s.price}</p>
            <p className="pem-plate-note">{s.note}</p>
          </div>
          <a className="pem-btn pem-btn-fire" href={cta.href}>{cta.label}</a>
        </div>
      </div>

      <DemoControls p="pem" demo={demo} />
    </div>
  );
}
