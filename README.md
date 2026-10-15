# Pizza Equipment Mart

Next.js site for pizzaequipmentmart.com. Static pages: home, 12 categories, brand pages, Scratch & Dent, List your company.

- Listings, prices, contacts: `app/data.ts`
- Styles: `app/pem.css`
- Images: `public/images/` (use a NEW filename when swapping a photo, or browsers keep the old one)
- Spec sheets: `public/files/`

Edit, then GitHub Desktop: commit and Push. Vercel redeploys automatically.

## 1. Put the code on GitHub (GitHub Desktop)

1. File → Add Local Repository → choose this folder → "create a repository" → Create Repository.
2. Commit everything ("First version").
3. Publish repository (private is fine).

## 2. Deploy on Vercel

1. vercel.com → Add New → Project → Import the `pizza-equipment-mart` repo.
2. Framework: Next.js (auto). No settings or env vars needed. Deploy.
3. Check the `*.vercel.app` link it gives you.
4. PEM is commercial, so the project needs Vercel Pro.

## 3. Point the domain (Squarespace DNS)

1. Vercel → project → Settings → Domains → add `pizzaequipmentmart.com` and `www.pizzaequipmentmart.com`.
   Use the records Vercel shows (normally `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`).
2. Squarespace → Domains → pizzaequipmentmart.com → DNS. Screenshot every record first.
3. Delete only the website records: the Squarespace Defaults `A @` records and the `CNAME www` record.
   Do NOT touch MX or other email records.
4. Add the A and CNAME records from Vercel. Save.
5. Wait until Vercel shows "Valid Configuration" (minutes, sometimes a few hours). HTTPS is automatic.

Safer first: add only `CNAME new → cname.vercel-dns.com` and test at new.pizzaequipmentmart.com.

## Undo

Delete the Vercel records in Squarespace DNS and re-add the "Squarespace Defaults" preset.
Keep the Squarespace plan active until you're sure.

## After launch

Google Search Console → add the domain → submit `https://www.pizzaequipmentmart.com/sitemap.xml`.
