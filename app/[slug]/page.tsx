import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer, ListBand } from "../Chrome";
import OvenStack from "../OvenStack";
import QuoteForm from "../QuoteForm";
import {
  BASE, IMG, PEM, CATEGORIES, BRANDS, STACKS, BENEFITS, INCLUDED, GROWTH,
  brand, category, brandsIn, mailto, type Brand, type Category,
} from "../data";
import "../pem.css";

export const dynamicParams = false;

const JOIN = "list-your-company";

export function generateStaticParams() {
  return [
    ...BRANDS.filter((b) => b.status === "listed").map((b) => ({ slug: b.slug })),
    ...CATEGORIES.map((c) => ({ slug: c.slug })),
    { slug: JOIN },
  ];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug === JOIN ? "List Your Company" : brand(slug)?.name ?? category(slug)?.name ?? "Pizza Equipment Mart";
  const description = brand(slug)?.intro ?? category(slug)?.blurb ?? "Put your brand in front of pizza equipment buyers.";
  return { title: `${name} | Pizza Equipment Mart`, description, alternates: { canonical: `/${slug}` } };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const b = brand(slug);
  const c = category(slug);
  let body;
  if (slug === JOIN) body = <JoinPage />;
  else if (b && b.status === "listed") body = <BrandPage b={b} />;
  else if (c && c.group === "Deals") body = <DealsPage c={c} />;
  else if (c) body = <CategoryPage c={c} />;
  else notFound();
  return (
    <div className="pem" id="top">
      <Header active={b ? b.category : slug} />
      {body}
      <Footer />
    </div>
  );
}

/* ---------- brand page ---------- */

function BrandPage({ b }: { b: Brand }) {
  const cat = category(b.category)!;
  const models = b.products.map((p) => p.code ?? p.name);
  return (
    <>
      <section className="pem-bhero">
        <div className="pem-wrap pem-bhero-in">
          <div className={`pem-blogo ${b.logoDark ? "is-dark" : ""}`}>
            <img src={b.logo.src} alt={b.logo.alt} width={b.logo.w} height={b.logo.h} />
          </div>
          <p className="pem-kick"><a href={`${BASE}/${cat.slug}`}>{cat.name}</a></p>
          <h1>{b.headline[0]}<br /><em>{b.headline[1]}</em></h1>
          <p className="pem-hero-sub">{b.intro}</p>
          <div className="pem-cta-row">
            {b.tel && <a className="pem-btn pem-btn-fire" href={b.tel}>Call {b.phone}</a>}
            <a className="pem-btn pem-btn-line" href="#quote">Request a quote</a>
          </div>
        </div>
        {b.hero && (
          <figure className="pem-bhero-pic">
            <img src={b.hero.src} alt={b.hero.alt} width={b.hero.w} height={b.hero.h} />
          </figure>
        )}
      </section>

      {b.slug === "avantec-ovens" && (
        <section className="pem-feat">
          <div className="pem-wrap">
            <header className="pem-head">
              <p className="pem-kick">150 to 300 pizzas an hour</p>
              <h2>Pick your belts.<br /><em>Build the stack.</em></h2>
            </header>
            <OvenStack stacks={STACKS} cta={{ label: "Quote this stack", href: "#quote" }} />
          </div>
        </section>
      )}

      <section className="pem-prods">
        <div className="pem-wrap">
          <header className="pem-head">
            <p className="pem-kick">{b.name} on PEM</p>
            <h2>{b.products.length === 1 ? "The lineup." : `${b.products.length} to choose from.`}</h2>
          </header>
          <div className="pem-prod-list">
            {b.products.map((p) => (
              <article key={p.name} className={`pem-prod ${p.photo ? "" : "no-pic"}`}>
                {p.photo && (
                  <div className="pem-prod-pic"><img src={p.photo.src} alt={p.photo.alt} width={p.photo.w} height={p.photo.h} loading="lazy" /></div>
                )}
                <div className="pem-prod-txt">
                  {p.code && <p className="pem-code">{p.code}</p>}
                  <h3>{p.name}</h3>
                  {p.price && <p className="pem-price">{p.price}<small>{p.unit}</small></p>}
                  {p.points.length > 0 && <ul className="pem-ticks">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>}
                  <a className="pem-link" href="#quote">Quote the {p.code ?? p.name}</a>
                </div>
              </article>
            ))}
          </div>
          {b.slug === "avantec-ovens" && (
            <div className="pem-split">
              <img src={`${IMG}/avantec-split.jpg`} alt="Avantec split belt options: 8 and 24, 12 and 20, 16 and 16, and 10, 10 and 12 inch belts" width={322} height={383} loading="lazy" />
              <div>
                <h3>Split belts</h3>
                <p>Run two or three pizza sizes side by side on one 32&#8221; belt. Ask for split belt pricing.</p>
              </div>
            </div>
          )}
          {b.more && <p className="pem-more">{b.more}</p>}
          {b.extras && (
            <div className="pem-cta-row pem-extras">
              {b.extras.map((x) => <a key={x.href} className="pem-link" href={x.href} target="_blank" rel="noreferrer">{x.label}</a>)}
            </div>
          )}
        </div>
      </section>

      <section className="pem-bfeat">
        <ol className="pem-wrap pem-why-list">
          {b.features.map((f, i) => (
            <li key={f.h}><span>{String(i + 1).padStart(2, "0")}</span><h3>{f.h}</h3><p>{f.p}</p></li>
          ))}
        </ol>
      </section>

      <section className="pem-quote" id="quote">
        <div className="pem-wrap pem-quote-in">
          <div className="pem-quote-txt">
            <p className="pem-kick">Talk to {b.name}</p>
            <h2>Straight to<br /><em>the maker.</em></h2>
            {b.tel && (
              <a className="pem-quote-phone" href={b.tel}>
                {b.phone}
                {b.person && <small>{b.person}</small>}
              </a>
            )}
            {b.site && <a className="pem-link" href={b.site} target="_blank" rel="noreferrer">Visit {b.siteLabel}</a>}
          </div>
          <QuoteForm to={b.email ?? PEM.email} brand={b.name} models={models} />
        </div>
      </section>
    </>
  );
}

/* ---------- category page ---------- */

function CategoryPage({ c }: { c: Category }) {
  const all = brandsIn(c.slug);
  const listed = all.filter((x) => x.status === "listed");
  const soon = all.filter((x) => x.status === "soon");
  return (
    <>
      <section className="pem-chero">
        <div className="pem-wrap">
          <p className="pem-kick">{c.group}</p>
          <h1>{c.name}</h1>
          <p className="pem-hero-sub">{c.blurb}</p>
        </div>
      </section>

      {listed.map((b) => (
        <section key={b.slug} className="pem-cbrand">
          <div className="pem-wrap">
            <div className="pem-cbrand-head">
              <div className={`pem-blogo ${b.logoDark ? "is-dark" : ""}`}><img src={b.logo.src} alt={b.logo.alt} width={b.logo.w} height={b.logo.h} /></div>
              <p>{b.intro}</p>
              <div className="pem-cta-row">
                <a className="pem-btn pem-btn-ink" href={`${BASE}/${b.slug}`}>See {b.short}</a>
                {b.tel && <a className="pem-btn pem-btn-dark" href={b.tel}>Call {b.phone}</a>}
              </div>
            </div>
            <ul className="pem-cprods">
              {b.products.map((p) => (
                <li key={p.name}>
                  <a href={`${BASE}/${b.slug}`}>
                    {p.photo ? <img src={p.photo.src} alt={p.photo.alt} width={p.photo.w} height={p.photo.h} loading="lazy" /> : <span className="pem-cprods-blank">{p.code}</span>}
                    <b>{p.name}</b>
                    <span>{p.price ?? "Ask for pricing"}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {listed.length === 0 && (
        <section className="pem-open">
          <div className="pem-wrap pem-open-in">
            <div>
              <p className="pem-kick">For brands</p>
              <h2>This aisle is<br /><em>open.</em></h2>
              {soon.length > 0 ? (
                <div className="pem-soon">
                  {soon.map((s) => <img key={s.slug} src={s.logo.src} alt={s.logo.alt} width={s.logo.w} height={s.logo.h} />)}
                  <p>Coming soon to {c.name.toLowerCase()}. There is room for more.</p>
                </div>
              ) : (
                <p>No brand is listed in {c.name.toLowerCase()} yet. Be the first name buyers see here.</p>
              )}
              <a className="pem-btn pem-btn-fire" href={`${BASE}/${JOIN}`}>List your company</a>
            </div>
            <div>
              <p className="pem-kick">For buyers</p>
              <h2>Shopping for<br /><em>{c.name.toLowerCase()}?</em></h2>
              <p>Tell us what you need and we will point you to a brand as they join.</p>
              <a className="pem-btn pem-btn-line" href={mailto(PEM.email, `Looking for ${c.name.toLowerCase()}`)}>Email what you need</a>
            </div>
          </div>
        </section>
      )}

      <ListBand title={listed.length ? ["Sell", c.name.toLowerCase() + "?"] : ["Make", c.name.toLowerCase() + "?"]} />
    </>
  );
}

/* ---------- scratch and dent / refurbished ---------- */

const DEAL_STEPS = [
  { h: "Send it in", p: "Photos, model, condition and your price. Used, demo, refurbished or scratch and dent." },
  { h: "We list it", p: "Your listing goes up with your contact details and sits in the category buyers already shop." },
  { h: "Buyers call you", p: "Interested operators call, text or email you directly. No middleman on the sale." },
];

function DealsPage({ c }: { c: Category }) {
  return (
    <>
      <section className="pem-dhero">
        <div className="pem-wrap pem-dhero-in">
          <div className="pem-tag" aria-hidden="true"><span>{c.slug === "scratch-dent" ? "Scratch" : "Refur"}</span><span>{c.slug === "scratch-dent" ? "& dent" : "bished"}</span></div>
          <div>
            <p className="pem-kick">Scratch and dent · refurbished</p>
            <h1>Same equipment.<br /><em>Lower prices.</em></h1>
            <p className="pem-hero-sub">Used and demo products at discounted prices, and new equipment with cosmetic marks. A way for brands to move surplus that can&#8217;t sell at full value.</p>
          </div>
        </div>
      </section>

      <section className="pem-deal-split">
        <div className="pem-wrap pem-open-in">
          <div>
            <p className="pem-kick">Buying</p>
            <h2>The first listings<br /><em>are opening.</em></h2>
            <p>Tell us what you are hunting for (an oven, a mixer, a make line) and get word when it lands.</p>
            <a className="pem-btn pem-btn-fire" href={mailto(PEM.email, "Scratch and dent: tell me when it lands")}>Get first look</a>
          </div>
          <div>
            <p className="pem-kick">Selling</p>
            <h2>Surplus, demos,<br /><em>dings.</em></h2>
            <p>Brands and dealers on PEM can list used, demo and scratch and dent stock right next to their new equipment.</p>
            <a className="pem-btn pem-btn-line" href={mailto(PEM.email, "List scratch and dent equipment")}>List equipment</a>
          </div>
        </div>
      </section>

      <section className="pem-steps">
        <div className="pem-wrap">
          <header className="pem-head">
            <p className="pem-kick">How a listing works</p>
            <h2>Three steps to <em>sold.</em></h2>
          </header>
          <ol className="pem-why-list pem-steps-list">
            {DEAL_STEPS.map((s, i) => <li key={s.h}><span>{i + 1}</span><h3>{s.h}</h3><p>{s.p}</p></li>)}
          </ol>
          <ul className="pem-chips">
            {CATEGORIES.filter((x) => x.group !== "Deals").map((x) => <li key={x.slug}>{x.name}</li>)}
          </ul>
        </div>
      </section>

      <ListBand title={["Surplus stock?", "List it here."]} />
    </>
  );
}

/* ---------- list your company ---------- */

function JoinPage() {
  return (
    <>
      <section className="pem-chero pem-jhero">
        <div className="pem-wrap">
          <p className="pem-kick">List your company</p>
          <h1>Put your brand<br />in front of<br /><em>pizza buyers.</em></h1>
          <p className="pem-hero-sub">Pizza Equipment Mart sorts products and companies into clear categories, then sends buyers straight to you.</p>
          <div className="pem-cta-row">
            <a className="pem-btn pem-btn-ink" href={PEM.tel}>Call {PEM.phone}</a>
            <a className="pem-btn pem-btn-line" href={mailto(PEM.email, "List my company on Pizza Equipment Mart")}>Email us</a>
          </div>
        </div>
      </section>

      <section className="pem-why">
        <div className="pem-wrap">
          <ol className="pem-why-list">
            {BENEFITS.map((x, i) => <li key={x.h}><span>{String(i + 1).padStart(2, "0")}</span><h3>{x.h}</h3><p>{x.p}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="pem-incl">
        <div className="pem-wrap pem-incl-in">
          <div>
            <p className="pem-kick">What you get</p>
            <h2>Your page.<br /><em>Your leads.</em></h2>
            <ul className="pem-ticks">{INCLUDED.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="pem-grow">
            <strong>50,000+</strong>
            <p>pizza operators, owners and equipment buyers in the industry groups PEM shares to.</p>
            <ul className="pem-ticks">{GROWTH.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="pem-quote">
        <div className="pem-wrap pem-quote-in pem-join-contact">
          <div className="pem-quote-txt">
            <p className="pem-kick">Talk to {PEM.contact}</p>
            <h2>Claim your<br /><em>category.</em></h2>
            <a className="pem-quote-phone" href={PEM.tel}>{PEM.phone}<small>Call or text</small></a>
            <a className="pem-link" href={mailto(PEM.email, "List my company on Pizza Equipment Mart")}>{PEM.email}</a>
          </div>
          <img className="pem-join-peel" src={`${IMG}/peel.png`} alt="Pizza Equipment Mart peel logo" width={379} height={600} />
        </div>
      </section>
    </>
  );
}
