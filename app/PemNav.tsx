"use client";
/* Same as the kit Nav, but the logo goes to the PEM homepage from every page. */
import { useState } from "react";

type Link = { label: string; href: string };

export default function PemNav({ home, logo, links, cta }: { home: string; logo: { src: string; alt: string }; links: Link[]; cta: Link }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="pem-nav">
      <div className="pem-nav-in">
        <a href={home} className="pem-brand" aria-label="Pizza Equipment Mart home" onClick={close}>
          <img src={logo.src} alt={logo.alt} width={95} height={60} />
        </a>
        <nav className={`pem-links ${open ? "is-open" : ""}`} aria-label="Main">
          <a href={home} onClick={close}>Home</a>
          {links.map((l) => <a key={l.href} href={l.href} onClick={close}>{l.label}</a>)}
          <a className="pem-cta" href={cta.href} onClick={close}>{cta.label}</a>
        </nav>
        <button className="pem-menu" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
