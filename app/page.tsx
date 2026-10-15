import type { Metadata } from "next";
import { Header, Footer, ListBand } from "./Chrome";
import OvenStack from "./OvenStack";
import { BASE, IMG, CATEGORIES, BRANDS, STACKS, BENEFITS, brandsIn } from "./data";
import "./pem.css";

export const metadata: Metadata = {
  title: "Pizza Equipment Mart | The Marketplace Built for the Pizza Industry",
  description: "Conveyor ovens, fast bake ovens, refrigeration, supplies and scratch and dent deals from the brands that make them.",
  alternates: { canonical: "/" },
};

const RIBBON = ["Shop by category", "Call the maker direct", "Real prices", "Spec sheets", "Scratch and dent deals", "New brands joining"];

export default function Page() {
  return (
    <div className="pem" id="top">
      <Header />

      <section className="pem-hero">
        <img className="pem-hero-bg" src={`${IMG}/hero-kitchen.jpg`} alt="A stainless pizza kitchen with deck ovens, a brick oven, a topping make line and a pepperoni pizza on the counter" width={1536} height={1024} />
        <div className="pem-hero-txt">
          <p className="pem-kick">Pizza Equipment Mart</p>
          <h1>The marketplace<br />built for the<br /><em>pizza industry.</em></h1>
          <p className="pem-hero-sub">Ovens, refrigeration, supplies and scratch and dent deals, straight from the brands that make them.</p>
          <div className="pem-cta-row">
            <a className="pem-btn pem-btn-fire" href="#categories">Shop categories</a>
            <a className="pem-btn pem-btn-line" href={`${BASE}/list-your-company`}>List your company</a>
          </div>
        </div>
      </section>

      <div className="pem-ribbon" aria-label="Highlights">
        <div className="pem-ribbon-in">{RIBBON.map((r) => <span key={r}>{r}</span>)}</div>
      </div>

      <section className="pem-cats" id="categories">
        <div className="pem-wrap">
          <header className="pem-head">
            <p className="pem-kick">Shop by category</p>
            <h2>Assemble the <em>whole kitchen.</em></h2>
          </header>
          <ul className="pem-catgrid">
            {CATEGORIES.map((c, i) => {
              const b = brandsIn(c.slug);
              return (
                <li key={c.slug} className={c.photo ? "has-pic" : ""}>
                  <a href={`${BASE}/${c.slug}`}>
                    <span className="pem-cat-n">{String(i + 1).padStart(2, "0")}</span>
                    {c.photo && <img src={c.photo.src} alt={c.photo.alt} width={c.photo.w} height={c.photo.h} loading="lazy" />}
                    <b>{c.name}</b>
                    <span className="pem-cat-b">
                      {b.length ? b.map((x) => (x.status === "soon" ? `${x.name}, coming soon` : x.name)).join(" · ") : c.group === "Deals" ? "Listings opening" : "Open for brands"}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="pem-feat">
        <div className="pem-wrap">
          <header className="pem-head">
            <p className="pem-kick">Featured brand · Avantec conveyor ovens</p>
            <h2>Pick your belts.<br /><em>Build the stack.</em></h2>
            <p className="pem-lede">Avantec ovens stack two high with two, three or four belts. Pick a count and see the real oven.</p>
          </header>
          <OvenStack stacks={STACKS} cta={{ label: "See Avantec ovens", href: `${BASE}/avantec-ovens` }} />
        </div>
      </section>

      <section className="pem-brands" id="brands">
        <div className="pem-wrap">
          <header className="pem-head">
            <p className="pem-kick">Brands on PEM</p>
            <h2>Click a logo.<br /><em>Meet the maker.</em></h2>
          </header>
          <ul className="pem-logos">
            {BRANDS.map((b) => (
              <li key={b.slug} className={b.logoDark ? "is-dark" : ""}>
                {b.status === "listed" ? (
                  <a href={`${BASE}/${b.slug}`}>
                    <img src={b.logo.src} alt={b.logo.alt} width={b.logo.w} height={b.logo.h} />
                    <span>{b.short} page</span>
                  </a>
                ) : (
                  <div>
                    <img src={b.logo.src} alt={b.logo.alt} width={b.logo.w} height={b.logo.h} />
                    <span>Coming soon</span>
                  </div>
                )}
              </li>
            ))}
            {[0, 1].map((i) => (
              <li key={i} className="is-open">
                <a href={`${BASE}/list-your-company`}><b>Your logo here</b><span>List your company</span></a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pem-sd">
        <div className="pem-wrap pem-sd-in">
          <div className="pem-tag" aria-hidden="true"><span>Scratch</span><span>&amp; dent</span></div>
          <div className="pem-sd-txt">
            <h2>Same equipment.<br /><em>Lower prices.</em></h2>
            <p>Used, demo and scratch and dent equipment at discounted prices, listed by the brands that made it. The first listings are opening now.</p>
            <a className="pem-btn pem-btn-ink" href={`${BASE}/scratch-dent`}>See scratch and dent</a>
          </div>
        </div>
      </section>

      <section className="pem-why">
        <div className="pem-wrap">
          <div className="pem-why-big">
            <strong>50,000+</strong>
            <p>operators, owners and buyers in the pizza groups where PEM shares listings.</p>
          </div>
          <ol className="pem-why-list">
            {BENEFITS.map((b, i) => (
              <li key={b.h}><span>{String(i + 1).padStart(2, "0")}</span><h3>{b.h}</h3><p>{b.p}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <ListBand />
      <Footer />
    </div>
  );
}
