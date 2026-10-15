import Fonts from "@/components/kit/Fonts";
import PemNav from "./PemNav";
import { BASE, IMG, CATEGORIES, PEM, mailto } from "./data";

export function Header({ active }: { active?: string }) {
  return (
    <>
      <Fonts families={["Anton:wght@400", "DM Sans:wght@400;500;600;700"]} />
      <PemNav
        home="/"
        logo={{ src: `${IMG}/logo.png`, alt: "Pizza Equipment Mart" }}
        links={[
          { label: "Categories", href: "/#categories" },
          { label: "Brands", href: "/#brands" },
          { label: "Scratch & dent", href: `${BASE}/scratch-dent` },
        ]}
        cta={{ label: "List your company", href: `${BASE}/list-your-company` }}
      />
      <nav className="pem-rail" aria-label="Categories">
        <div className="pem-rail-in">
          {CATEGORIES.map((c) => (
            <a key={c.slug} href={`${BASE}/${c.slug}`} className={c.slug === active ? "is-on" : ""} aria-current={c.slug === active ? "page" : undefined}>
              {c.name}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}

export function Footer() {
  const groups = ["Ovens", "Kitchen", "Supplies", "Deals"] as const;
  return (
    <footer className="pem-foot">
      <div className="pem-wrap pem-foot-in">
        <div className="pem-foot-brand">
          <img src={`${IMG}/peel.png`} alt="Pizza Equipment Mart" width={379} height={600} />
          <p>{PEM.tagline}</p>
        </div>
        {groups.map((g) => (
          <div key={g} className="pem-foot-col">
            <h4>{g}</h4>
            {CATEGORIES.filter((c) => c.group === g).map((c) => <a key={c.slug} href={`${BASE}/${c.slug}`}>{c.name}</a>)}
          </div>
        ))}
        <div className="pem-foot-col">
          <h4>Sell on PEM</h4>
          <a href={`${BASE}/list-your-company`}>List your company</a>
          <a href={mailto(PEM.email, "Pizza Equipment Mart")}>{PEM.email}</a>
          <a href={PEM.tel}>{PEM.phone}</a>
        </div>
      </div>
      <p className="pem-foot-base">pizzaequipmentmart.com</p>
    </footer>
  );
}

/* The "sell on PEM" band that closes most pages. */
export function ListBand({ title = ["Make pizza", "equipment?"] }: { title?: [string, string] }) {
  return (
    <section className="pem-list">
      <img className="pem-list-peel" src={`${IMG}/peel.png`} alt="" width={379} height={600} />
      <div className="pem-list-in">
        <p className="pem-kick">For manufacturers and dealers</p>
        <h2>{title[0]}<br /><em>{title[1]}</em></h2>
        <p>Put your logo on the homepage, your products in front of buyers, and their calls on your phone.</p>
        <div className="pem-cta-row">
          <a className="pem-btn pem-btn-ink" href={`${BASE}/list-your-company`}>List your company</a>
          <a className="pem-btn pem-btn-line" href={PEM.tel}>Call {PEM.phone}</a>
        </div>
      </div>
    </section>
  );
}
