# BRAIN.md — PawPetStore Persistent Engineering Memory

> **CRITICAL DIRECTIVE**: This file is the primary single source of truth for architectural context, decisions, status, and engineering guidelines. Read this file before initiating any phase, making architectural choices, or modifying core systems. Keep this file updated at the conclusion of every phase.

---

## 1. Project Vision
**PawPetStore** is a premier, full-featured pet marketplace and healthcare booking platform. It delivers an elegant, trustworthy, and modern web application where pet parents can:
- Explore and adopt pets across Dogs, Cats, Birds, and Hamsters / Small Pets.
- Browse detailed breed encyclopedia records.
- Purchase premium food, toys, cages, grooming items, and accessories.
- Manage shopping carts and secure checkouts.
- Schedule veterinary care, vaccinations, and grooming appointments.
- Track orders, past medical bookings, and personal profiles.
- Seamlessly toggle between bespoke Light and Dark themes.

The aesthetic standard is that of a funded modern startup: warm, organic, minimal, accessible, and fast—avoiding childish cartoons or cluttered templates.

---

## 2. Current Project Status
- **Overall Status**: Phase 0 Complete — Project Foundation and Architecture established.
- **Current Phase**: Phase 0 — Foundation.
- **Completed Phases**:
  - Phase 0: Project Foundation & Architecture.
- **Next Planned Phase**: Phase 1 — Design System + Core UI Primitives (Typography, Buttons, Cards, Modals, Navbar, Footer, Theme Switcher).

---

## 3. Architecture & Topology
PawPetStore is structured as a **Modular Monolith** with clear domain separation:
```
/
├── frontend/             # Next.js App Router presentation layer
│   ├── app/              # Routes, layouts, and page views
│   ├── components/       # Design system primitives, layouts, reusable UI
│   │   ├── ui/           # Atomic components (buttons, badges, inputs, dialogs)
│   │   ├── layout/       # Navbar, Footer, MobileNav, CartDrawer
│   │   └── common/       # Empty states, loading skeletons, error boundaries
│   ├── features/         # Domain-specific UI features (pets, shop, appointments, auth)
│   ├── hooks/            # Custom React hooks (theme, debounce, window dimensions)
│   ├── lib/              # Client utilities (formatting, styling clsx/twMerge)
│   ├── services/         # Client-side API client services
│   ├── store/            # Zustand global state (cart, wishlist, filters)
│   ├── types/            # Shared TypeScript domain interfaces
│   └── styles/           # CSS modules, tokens, and animations
├── backend/              # Domain logic and server controllers
│   ├── controllers/      # Request handlers and response mapping
│   ├── services/         # Pure business logic and database interactions
│   ├── routes/           # Next.js API route bridges
│   ├── middleware/       # Auth guards, role verification, rate limiting
│   ├── validators/       # Zod schemas for all mutations and queries
│   └── utils/            # Prisma singleton, response envelopes, error formatters
├── prisma/               # Database ORM definition
│   ├── schema.prisma     # Relational schema (PostgreSQL)
│   ├── seed.ts           # Rich development seed script
│   └── migrations/       # SQL migration records
├── public/               # Static assets & photography
│   ├── images/           # Category-partitioned images (pets, breeds, products, food, toys)
│   ├── icons/            # SVG vector iconography
│   └── brand/            # Official PawPetStore vector logos and marks
├── docs/                 # Engineering specifications
│   ├── architecture/     # System topologies and diagrams
│   ├── api/              # API contracts and guidelines
│   ├── database/         # Schema descriptions and relations
│   ├── design/           # Design system tokens and philosophy
│   └── decisions/        # Architecture Decision Records (ADRs)
├── tests/                # Automated unit and integration tests
├── README.md             # Public documentation and run guides
├── ROADMAP.md            # Comprehensive phase progress tracker
├── BRAIN.md              # Engineering memory
├── .env.example          # Environment blueprint
├── .gitignore            # Git exclusion definitions
└── package.json          # Root workspace orchestration
```

---

## 4. Tech Stack
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling**: Tailwind CSS v4 + Curated CSS Design Tokens
- **Icons**: Lucide React
- **Component Primitives**: Custom accessible atomic components (inspired by shadcn/ui)
- **Database & ORM**: PostgreSQL via Prisma ORM v6
- **Validation**: Zod
- **Global State**: Zustand (Cart, Wishlist, Filter states)
- **Payments**: Abstracted payment gateway adapter (Razorpay & Stripe ready)
- **Runtime / Package Manager**: Node.js v24 + npm workspaces

---

## 5. Design System
- **Primary**: Deep Forest Green (`#1B4332` Light / `#4BB787` Dark)
- **Secondary**: Warm Biscuit Cream (`#D9A066` Light / `#E3B27E` Dark)
- **Accent**: Terracotta Amber (`#E07A5F` Light / `#F08C73` Dark)
- **Canvas / Background**: Warm Cream (`#FAF8F5` Light / `#0D1412` Dark)
- **Surface / Cards**: Crisp Pure White (`#FFFFFF` Light / `#172420` Dark)
- **Text Main**: Deep Charcoal (`#1C2421` Light / `#F3F7F5` Dark)
- **Text Muted**: Natural Slate (`#738078` Light / `#7E9086` Dark)
- **Theme Persistence**: `localStorage` key `pawpetstore-theme` + CSS class `.dark` on `<html>`.

---

## 6. Key Decisions
1. **ADR 001**: Single-runtime Modular Monolith using Next.js App Router. Eliminates cross-origin CORS problems, coordinates builds smoothly, and keeps full-stack code organized cleanly.
2. **Prisma Singleton Pattern**: Implemented in `backend/utils/prisma.ts` to prevent exhaustion of PostgreSQL database connection pool in Next.js hot-reload development.
3. **Price Integrity**: All checkout and cart calculations are computed server-side in `backend/services/cart.service.ts`; client-sent prices are strictly ignored.
4. **Symlink / Junction**: `frontend/public` links to root `public` so all static assets remain accessible to Next.js without duplication.

---

## 7. Database Decisions
- Relational schema defined with strict foreign keys and cascading deletes where appropriate.
- Prices stored using `Decimal(10, 2)` to eliminate floating-point arithmetic errors.
- Enums used for statuses (`PetStatus`, `ProductStatus`, `OrderStatus`, `PaymentStatus`, `AppointmentStatus`).

---

## 8. API Conventions
- Standard envelope: `{ success: boolean, data?: T, message?: string, error?: string, timestamp: string }`.
- Zod schema validation applied to all route inputs.

---

## 9. Naming Conventions
- React components: PascalCase (e.g., `PetCard.tsx`, `Navbar.tsx`).
- Utility functions & hooks: camelCase (e.g., `formatCurrency.ts`, `useTheme.ts`).
- Route paths: kebab-case (e.g., `/shop/food`, `/dogs/labrador-retriever`).
- Database models: PascalCase singular (e.g., `Pet`, `Order`, `Appointment`).

---

## 10. Authentication Decisions
- Role-based authorization: `CUSTOMER`, `ADMIN`, `VET`, `STAFF`.
- Route guards at middleware layer and service layer.

---

## 11. Important Constraints
- Never rely on purely client-side price totals.
- Maintain high accessibility contrast ratios for both light and dark modes.
- Respect `prefers-reduced-motion` in CSS animations.
- Keep the repository clean: no ad-hoc scratch files at root.

---

## 12. Known Issues & Tech Debt
- None currently.

---

## 13. Things That MUST NOT Be Changed Without Consideration
- Centralized color tokens in `globals.css`.
- Standard API response structure in `backend/utils/response.ts`.
- Prisma client singleton pattern in `backend/utils/prisma.ts`.

---

## 14. Git & Release Metadata
- **Current Branch**: `main`
- **Remote Origin**: `https://github.com/lohithpahuja03/pawpetstore.git`
- **Last Completed Commit**: `Initial commit / Foundation`
- **Next Planned Task**: Complete Phase 0 verification, commit, and push.
