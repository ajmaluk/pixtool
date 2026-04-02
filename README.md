# PixTool

**Free Online Productivity Suite** — Image editing, PDF management, daily tools, QR codes, and more.

🔗 **Live:** [pixtool.toolpix.in](https://pixtool.toolpix.in)

## Features
### 🖼️ Image Tools
- **Resize Image** — Change dimensions with pixel-perfect accuracy
- **Crop Image** — Cut out unwanted areas with preset ratios
- **Rotate Image** — Rotate and flip images effortlessly
- **Compress Image** — Reduce file size without quality loss

### 📄 PDF Tools
- **Merge PDF** — Combine multiple PDFs into one
- **Split PDF** — Extract specific pages
- **Compress PDF** — Reduce PDF file size
- **PDF to Image** — Convert PDF pages to images

### 🛠️ Utilities
- **Temp Mail** — Disposable temporary email addresses
- **QR Scanner** — Scan QR codes via camera or image upload
- **QR Generator** — Create custom QR codes for URLs, WiFi, text

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Vanilla CSS with CSS custom properties
- **PDF Processing:** pdf-lib
- **QR Codes:** qrcode, jsQR
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Backend Data:** Supabase (Postgres + Edge Functions)

## Privacy First

All file processing happens **locally in your browser**. No files are ever uploaded to any server. Your images, PDFs, and documents stay on your device.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Supabase Integration

1. Create a Supabase project.
2. Run schema from `supa.sql` in Supabase SQL Editor.
3. Set environment variables (see `.env.example`):
	- `VITE_SUPABASE_URL`
	- `VITE_SUPABASE_ANON_KEY`
	- `ADMIN_USERNAME`
	- `ADMIN_PASSWORD`
	- `ADMIN_SESSION_SECRET`
4. Deploy edge functions:

```bash
supabase functions deploy admin-login
supabase functions deploy admin-api
supabase functions deploy public-metrics
```

5. Set edge-function secrets:

```bash
# Run these in your terminal after linking your project:
supabase secrets set ADMIN_USERNAME=ajmal
supabase secrets set ADMIN_PASSWORD=Ajmal@123
supabase secrets set ADMIN_SESSION_SECRET=ajmaluk123pixtool.in-2026
```

6. (Recommended) Schedule periodic rate-limit cleanup in Postgres:

```sql
select cleanup_rate_limits(7, 5000);
```

## Included Systems

- Per-tool rating with duplicate prevention (`tool_id + user_id` unique)
- Overall weighted rating on homepage
- Cached public metrics endpoint for SEO/AI snippets (`public-metrics`)
- Testimonials (public submit + admin moderation)
- Contact form (stored in Supabase + admin review)
- Admin panel at `/pix-admin` with pagination and moderation actions
- SSG-compatible hydration: dynamic data loads client-side after prerender

## Cloudflare Pages Notes

- Admin indexing and security headers are configured via `public/_headers`.
- SPA routing fallback is configured via `public/_redirects`.
- Both files are copied to `dist/` automatically by Vite and applied by Cloudflare Pages.
- Build validation is available via:

```bash
npm run deploy
```

- This runs `build` and then checks Cloudflare-required artifacts (`_headers`, `_redirects`, `robots.txt`, `sitemap.xml`).
- Sitemap generation is already automated by the `prebuild` hook (`scripts/generate-sitemap.js`).

## Production Smoke Checklist

Run this after Cloudflare deployment:

```bash
npm run check-live
curl -I https://www.pixtool.in/pix-admin
curl -I https://www.pixtool.in/robots.txt
curl -I https://www.pixtool.in/sitemap.xml
```

Then verify in `/pix-admin`:

1. Login works with admin credentials.
2. Approve/reject one testimonial and confirm list refresh.
3. Update one contact status and confirm persistence after refresh.

## License

MIT
