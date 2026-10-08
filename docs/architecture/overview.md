# PawPetStore Architecture Overview

## 1. System High-Level Design
PawPetStore is engineered as a clean, high-performance modular monolith using Next.js App Router, React 19, TypeScript, Tailwind CSS, and Prisma ORM with PostgreSQL.

```
                  +-----------------------------------+
                  |         Browser / Client          |
                  +-----------------+-----------------+
                                    |
                    HTTPS / JSON    | Server Components / RSC
                                    v
+-----------------------------------------------------------------------+
|                             Next.js Host                              |
|                                                                       |
|  +----------------------------+      +-----------------------------+  |
|  |       Frontend Layer       |      |     API Route Handlers      |  |
|  |                            |      |     (app/api/*)             |  |
|  | - Next.js App Router       |      +--------------+--------------+  |
|  | - UI Components (shadcn/ui)|                     |                 |
|  | - State (Zustand & Hooks)  |                     v                 |
|  | - Theme Manager (L/D)      |      +-----------------------------+  |
|  +----------------------------+      |        Backend Layer        |  |
|                                      |                             |  |
|                                      | - Controllers               |  |
|                                      | - Domain Services           |  |
|                                      | - Zod Input Validators      |  |
|                                      | - Auth & Permission Guards  |  |
|                                      +--------------+--------------+  |
|                                                     |                 |
+-----------------------------------------------------|-----------------+
                                                      |
                                                      v
                                       +-----------------------------+
                                       |      Data Access Layer      |
                                       |                             |
                                       | - Prisma ORM Client         |
                                       | - Connection Pooling        |
                                       +--------------+--------------+
                                                      |
                                                      v
                                       +-----------------------------+
                                       |     PostgreSQL Database     |
                                       +-----------------------------+
```

## 2. Directory Separation
- **`frontend/`**: Contains presentation logic, pages (`app/`), design system primitives (`components/ui`), layouts, features, Zustand store, and hooks.
- **`backend/`**: Contains business logic, domain services, controllers, middlewares, and Zod validators.
- **`prisma/`**: Contains relational database schema, migrations, and seed scripts.
- **`public/`**: Contains static brand assets, breed imagery, pet photography, product catalog assets.
- **`docs/`**: Comprehensive architectural specifications and decision records.
