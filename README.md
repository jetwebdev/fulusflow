# Fulus Flow

**Beat the dinosaur system. Send money with concierge service.**
Fulus Flow is a premium, non-custodial remittance experience built for hardworking diaspora customers who deserve speed, clarity, dignity, and dramatically lower costs than the broken legacy remittance system. This codebase powers the early concierge phase of the product while partner on-ramp and off-ramp infrastructure is being finalized.

## Vision
Fulus Flow exists to make cross-border money movement feel modern, trusted, and human again. Instead of forcing customers through overpriced, slow, confusing remittance rails, the platform is being designed to deliver a guided, high-trust experience that moves value quickly from card or partner on-ramp into crypto and onward to the destination wallet or payout rail.

The brand promise is simple:
- Premium concierge support.
- Non-custodial architecture.
- Clear pricing and transparent flow.
- Fast execution with partner-powered compliance.
- A diaspora-respectful experience built to keep more money with families.

## Current phase

This repository currently supports the **concierge launch phase**.
In this mode, Fulus Flow captures only non-sensitive customer intake data through the web app, routes that information into operations workflows, and allows the founder to complete payment processing through approved partner systems while keeping raw card data out of the application stack.

Current responsibilities of this codebase include:
- Concierge intake experience on the marketing homepage.
- Validated Next.js API route for submission handling.
- Make.com webhook forwarding.
- Google Sheets operational intake tracking.
- Early compliance flags such as KYC and threshold alerts.
- Branded customer-facing experience that feels premium from first click.

## Brand positioning

Fulus Flow is not another cold fintech dashboard and not another generic crypto checkout.
It is being built as a high-trust money movement brand for diaspora customers who work hard, send often, and are tired of losing money to bloated middlemen. The voice should stay clear, direct, confident, respectful, and emotionally grounded in one truth: every unnecessary fee steals from a family.

### Brand principles
- **Clarity over clutter** — every page should feel easy, calm, and intentional.
- **Trust over hype** — confidence comes from transparency, not noise.
- **Respect over friction** — customers should feel guided, not processed.
- **Momentum over bureaucracy** — fast action, clean handoffs, minimal confusion.
- **Premium over generic** — polished design, sharp copy, disciplined UX.

## Product experience

The target experience is simple:
1. Customer lands on Fulus Flow.
2. Customer submits a concierge transfer request.
3. Intake data flows into the operations stack.
4. Payment is confirmed through an approved provider workflow.
5. Crypto or downstream payout is completed quickly and transparently.
6. The customer feels taken care of from start to finish.

Every part of the experience should reinforce a single emotional outcome: **confidence**.

## Stack

The current product direction is centered on a lean, founder-friendly stack:
- **Frontend:** Next.js 14 App Router + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL on Hetzner
- **Auth + Wallets:** Privy embedded wallets
- **KYC:** Didit first, iDenfy at scale
- **On-ramp:** PayRam, OnRamp, and other approved partners as they come online
- **Off-ramp:** Bitget Wallet API and corridor-specific payout rails
- **Ops automation:** Make.com
- **CRM / ops storage:** Airtable and Google Sheets during early phase
- **Infra:** Hetzner + Nginx + PM2 + Cloudflare

## Concierge intake flow

The current intake architecture is designed for speed, control, and reduced operational risk during the launch window.

### Customer-side flow
- Customer enters contact details, amount, recipient details, wallet destination, and consent.
- Customer does **not** enter full card details into the form.
- Customer receives a guided, concierge-style follow-up.

### Internal flow
- Next.js validates and structures the intake request.
- The API route posts the payload to a Make.com webhook.
- Make.com writes the lead into Google Sheets and optional alerting workflows.
- The founder processes the transfer through the approved provider workflow.
- Only safe operational metadata is retained in the ops trail.

## Security posture
This project is being designed to keep sensitive payment data out of the app layer during the concierge phase.

### Non-negotiables

- Never collect PAN or CVV inside the site form.
- Never store card details in app state, logs, Sheets, Make, email, Slack, screenshots, or notes.
- Never add convenience shortcuts that expand PCI scope.
- Keep manual handling tightly controlled and temporary.
- Move to the approved hosted/whitelabel flow as soon as the provider is ready.

## Who this is for

Fulus Flow is being built for diaspora senders who:
- Support family back home regularly.
- Need speed and transparency.
- Do not want legacy remittance fees eating into hard-earned income.
- Need a smoother path into modern payment rails.
- Value personal service during early trust-building.

## Repository structure

The exact structure will evolve, but the current working model centers around:
```txt
app/
  page.tsx
  api/
    concierge-intake/
      route.ts
components/
  forms/
    ConciergeIntakeForm.tsx
backups/
  2026-05-09-concierge/
```

## Local development

Install dependencies and run locally:
```bash
npm install
npm run dev
```

For production-like behavior on the server:
```bash
npm run build
npm run start
```

## Environment variables

Add required environment variables in `.env.local` or your production environment.
```bash
MAKE_CONCIERGE_WEBHOOK_URL=https://hook.us1.make.com/your-webhook-id
```

As more providers come online, additional environment variables should be documented here with clear naming and narrow permissions.

## Deployment philosophy
This project should ship fast, but never carelessly.

That means:
- Clean commits.
- Reversible changes.
- Backups before homepage or payment-flow edits.
- Founder-friendly tooling.
- Clear operational runbooks.
- Tight compliance awareness at every milestone.

## Roadmap direction

Near-term priorities:
- Finish concierge launch flow.
- Transition to approved hosted or white-label on-ramp.
- Tighten KYC and compliance automation.
- Add wallet dashboard and quote controls.
- Launch Bangladesh-first payout experience.
- Expand the platform into a fully trusted cross-border money product.

## Final standard
Every commit, page, form, and workflow in this repository should feel like it belongs to a serious remittance brand with real ambition.

Not generic.
Not noisy.
Not bloated.

Just sharp execution, premium trust, and a product experience built to help people keep more of their money, sanity, and dignity.
>>>>>>> 3445b3fdbc1e0727b4603b65c6af986379d27f8b
