# PawPetStore 🐾

> **Everything They Need. Everything You Love.**  
> A modern, premium pet marketplace & healthcare booking platform engineered with Next.js 16, React 19, TypeScript, Tailwind CSS, and Prisma ORM.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748)](https://www.prisma.io/)

---

## 🌟 Overview

**PawPetStore** is an end-to-end e-commerce and pet-care ecosystem designed with the visual polish and architectural rigor of a modern funded startup. It replaces disconnected pet tools with a unified, trustworthy digital home for pet parents.

### Core Capabilities
- **🐶 Multi-Species Marketplace**: Dedicated experiences for Dogs, Cats, Birds, and Hamsters / Small Pets.
- **📚 Breed Directory**: Comprehensive breed encyclopedia with temperament, life expectancy, care instructions, and health advisories.
- **🛍️ Complete Pet Store**: Premium food, interactive toys, sturdy cages, accessories, and grooming essentials.
- **💉 Veterinary & Pet Care**: Interactive appointment booking system for vaccinations, general check-ups, and grooming.
- **🛒 High-Performance Cart & Checkout**: Dynamic order calculation, coupon codes, and payment gateway adapters (Razorpay & Stripe ready).
- **🌗 Bespoke Light & Dark Modes**: Curated design system tokens engineered specifically for high contrast, warmth, and visual comfort.
- **⚡ Blazing Fast Architecture**: Server-rendered React components with Next.js 16 App Router, responsive mobile-first UI, and strict TypeScript types.

---

## 🏗️ Architecture

PawPetStore follows a **Modular Monolith** pattern:
- **Presentation Layer (`frontend/`)**: Next.js App Router, React 19, custom atomic UI primitives, Tailwind CSS v4 design tokens, and Zustand global stores.
- **Domain & Application Layer (`backend/`)**: Controllers, domain services, middlewares, and Zod schema validators.
- **Persistence Layer (`prisma/`)**: PostgreSQL relational models managed by Prisma ORM.
- **Static Assets (`public/`)**: Organized directories for pet photography, product images, brand marks, and iconography.
- **Documentation (`docs/`)**: Architecture Decision Records (ADRs), API guidelines, and database entity relationships.

For detailed specifications, see:
- [Architecture Overview](docs/architecture/overview.md)
- [Design System Guide](docs/design/design-system.md)
- [Database Schema](docs/database/schema.md)
- [Persistent Engineering Memory (BRAIN.md)](BRAIN.md)
- [Development Roadmap](ROADMAP.md)

---

## 📂 Project Structure

```
pawpetstore/
├── frontend/             # Next.js Presentation & Client Application
│   ├── app/              # Routes & layouts
│   ├── components/       # UI primitives & shared components
│   ├── features/         # Feature modules (pets, shop, cart, auth)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Client utilities & helpers
│   ├── services/         # Client API adapters
│   ├── store/            # Zustand global stores
│   ├── types/            # TypeScript domain interfaces
│   └── styles/           # CSS styles & design tokens
├── backend/              # Server Business Logic & API Layer
│   ├── controllers/      # Route handlers
│   ├── services/         # Business logic & queries
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & role guards
│   ├── validators/       # Zod schemas
│   └── utils/            # Prisma singleton & response helpers
├── prisma/               # Database ORM
│   ├── schema.prisma     # Relational schema
│   ├── seed.ts           # Realistic database seeder
│   └── migrations/       # Migration history
├── public/               # Static assets & brand vectors
├── docs/                 # Architecture & technical documentation
├── tests/                # Test suites
├── BRAIN.md              # Project persistent memory
├── ROADMAP.md            # Progress tracker
├── README.md             # This file
├── .env.example          # Environment variable template
└── package.json          # Root workspace configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20+ (v24 recommended)
- **npm**: v10+
- **PostgreSQL**: Local instance or hosted connection (e.g., Supabase / Neon)

### 1. Installation
Clone the repository and install root workspace dependencies:
```bash
git clone https://github.com/lohithpahuja03/pawpetstore.git
cd pawpetstore
npm install
```

### 2. Environment Configuration
Copy the template environment file:
```bash
cp .env.example .env
```
Update `DATABASE_URL` with your PostgreSQL connection string.

### 3. Database Initialization
Generate the Prisma Client:
```bash
npm run prisma:generate
```

### 4. Running the Development Server
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Commands Reference

| Command | Action |
|---|---|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Compile production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint across codebase |
| `npm run typecheck` | Run TypeScript type validation (`tsc --noEmit`) |
| `npm run test` | Run test suites |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:seed` | Seed database with sample pets, products, and services |

---

## 🎨 Design System & Palette

| Token | Light Mode | Dark Mode | Semantic Meaning |
|---|---|---|---|
| **Primary** | `#1B4332` | `#4BB787` | Deep Emerald — Trust, Veterinary Health |
| **Secondary** | `#D9A066` | `#E3B27E` | Warm Biscuit — Organic Pet Warmth |
| **Accent** | `#E07A5F` | `#F08C73` | Terracotta Amber — Dynamic CTAs |
| **Background** | `#FAF8F5` | `#0D1412` | Warm Cream / Deep Forest Slate |
| **Surface** | `#FFFFFF` | `#172420` | Crisp Card / Elevated Surface |
| **Text Main** | `#1C2421` | `#F3F7F5` | Deep Charcoal / Bright Crisp White |

---

## 📈 Implementation Status

- [x] **Phase 0 — Foundation**: Architecture, tooling, design tokens, Prisma schema, documentation.
- [ ] **Phase 1 — Design System + Core UI**: Atomic primitives, theme toggle, navbar, footer.
- [ ] **Phase 2 — Homepage**: High-conversion hero, categories, featured pets, value props.
- [ ] **Phase 3 — Pet Categories**: Dedicated Dogs, Cats, Birds, Hamsters pages.
- [ ] **Phase 4 — Pet Catalog & Details**: Multi-attribute filtering, photo gallery, inquiry modal.
- [ ] **Phase 5 — General Shop**: Product catalog, reviews, variant selector.
- [ ] **Phase 6 — Pet Food Marketplace**: Dietary filtering, feeding advice.
- [ ] **Phase 7 — Toys & Accessories**: Chew toys, scratchers, cages, accessories.
- [ ] **Phase 8 — Global Search**: Fast debounced search across all entities.
- [ ] **Phase 9 — Cart & Checkout**: Slide-over cart, multi-step checkout, payment integration.
- [ ] **Phase 10 — Auth & User Portal**: Profiles, order history, appointment tracker.
- [ ] **Phase 11 — Vaccination & Pet Care**: Interactive booking wizard with time slots.
- [ ] **Phase 12 — About Us**: Brand mission, ethical adoption commitments.
- [ ] **Phase 13 — Contact Us**: Form validation, FAQ accordion, location details.
- [ ] **Phase 14 — Admin Dashboard**: Real-time business metrics and content management.
- [ ] **Phase 15 — Polish & SEO**: Meta tags, OpenGraph, performance auditing.
- [ ] **Phase 16 — Comprehensive QA**: End-to-end regression testing.
- [ ] **Phase 17 — Production Readiness**: Security hardening, deployment verification.

See [ROADMAP.md](ROADMAP.md) for granular step-by-step task tracking.

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
