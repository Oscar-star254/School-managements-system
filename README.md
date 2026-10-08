# SmartPOS

**Smarter Checkout. Stronger Business.**

SmartPOS is a responsive, touch-first point-of-sale workspace for retail, restaurant, boutique, and grocery operators. It includes a polished checkout, cash/card/mobile payment flows, dashboard, products, inventory, sales, customers, reports, staff, expenses, and settings workspaces.

## Quick start

Requirements: Node 22+, pnpm 10+, and PostgreSQL 16+.

```bash
cp .env.example .env
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm api:dev
```

The Figma Make Vite server starts automatically. Outside Figma Make, run `pnpm dev` in a second terminal.

## Docker

```bash
docker compose up --build
```

Open `http://localhost:8080`. The API is on port 4000, discovery is at `/docs`, and health is at `/health`.

## Demo access

Seeded users use password `SmartPOS!2025`: `owner@smartpos.demo` (Owner, PIN 1001), `admin@smartpos.demo` (Admin, PIN 1002), `manager@smartpos.demo` (Manager, PIN 1003), and `cashier@smartpos.demo` (Cashier, PIN 1004).

## Architecture

- `src/` React client, Zustand checkout state, Recharts analytics, PWA shell
- `server/` Express REST API with JWT auth, Zod validation, rate limiting, tenant-scoped queries
- `prisma/` PostgreSQL domain schema
- `docker/` production Nginx and API images

Sale creation requires an `Idempotency-Key` header and runs the sale, line items, stock decrement, and stock ledger in one transaction. Offline sales are stored in IndexedDB and retried when connectivity returns.

## Permissions

Owners have full access. Admins manage configuration and operations. Managers may void, refund, adjust stock, and approve discounts above 15%. Cashiers can sell, attach customers, and discount up to 15%; refunds, voids, and price overrides require approval.

## Verification

```bash
pnpm build
pnpm test
pnpm format:check
```

For production, rotate secrets, terminate TLS at the load balancer, configure managed PostgreSQL backups, connect payment adapters, and add object storage plus transactional email/SMS.
