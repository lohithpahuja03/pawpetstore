# ADR 001: Modular Monolith Architecture with Next.js App Router

## Status
Accepted

## Context
The application requires a rich full-stack experience (e-commerce marketplace, appointment booking, breed directory, authentication, and administration) without unnecessary microservice overhead.

## Decision
Adopt a Modular Monolith architecture using Next.js App Router as the unified web runtime, with strict folder and domain boundary separation:
1. `frontend/` handles presentation, React components, client hooks, and state.
2. `backend/` organizes domain services, controllers, middlewares, and validators.
3. Next.js API route handlers act as thin controllers delegating to `backend/services`.
4. `prisma/` manages data modeling and relational migrations.

## Consequences
- Fast developer velocity with unified build and type-checking.
- Zero CORS overhead.
- Simple single-process deployment to Vercel, Node, or Docker.
- Easy to extract backend into standalone service if horizontal scaling ever dictates.
