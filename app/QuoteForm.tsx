"use client";
/* Quote form: composes an email to the brand with the details they need. No server. */
import { useState, type FormEvent } from "react";

export default function QuoteForm({ to, brand, models }: { to: string; brand: string; models: string[] }) {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = ["name", "business", "phone", "city", "model", "notes"].map((k) => `${k[0].toUpperCase() + k.slice(1)}: ${f.get(k) ?? ""}`);
    const body = `${lines.join("\n")}\n\nSent from pizzaequipmentmart.com`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(`${brand} quote request`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }
  return (
    <form className="pem-form" onSubmit={submit}>
      <label><span>Name</span><input name="name" required autoComplete="name" /></label>
      <label><span>Business</span><input name="business" autoComplete="organization" /></label>
      <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
      <label><span>City and state</span><input name="city" autoComplete="address-level2" /></label>
      <label className="pem-form-wide"><span>Product</span>
        <select name="model" defaultValue={models[0]}>
          {models.map((m) => <option key={m}>{m}</option>)}
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="pem-form-wide"><span>Anything else</span><textarea name="notes" rows={3} placeholder="Fuel type, volume, delivery timing" /></label>
      <button className="pem-btn pem-btn-fire pem-form-wide" type="submit">{sent ? "Opening your email…" : "Send quote request"}</button>
    </form>
  );
}
