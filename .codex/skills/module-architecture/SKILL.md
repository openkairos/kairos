---
name: module-architecture
description: Use when working on Kairos module structure, Clean Architecture boundaries, composition files, shared module public APIs, route placement, handler boundaries, or reviewing architecture-related changes in the TypeScript backend.
allowed-tools: functions.exec_command multi_tool_use.parallel
---

# Kairos Module Architecture

Use this skill before planning, implementing, or reviewing changes that affect module structure, imports, composition, routes, or shared infrastructure APIs.

## Core Rules

- Keep business modules discoverable and vertically organized.
- Keep domain and application code independent from composition, infrastructure instances, framework routing, and runtime configuration.
- Prefer FP-friendly wiring: use pure functions and inject side effects through explicit composition.
- Treat composition files as private wiring, not as general import targets.
- Treat `index.ts` files as public API contracts, not barrels.

## Business Modules

Use this shape for business modules:

```text
src/app/<module>/
  <module>-composition.ts
  domain/
  application/
  interface/
    http/
      <module>-routes.ts
  infrastructure/
```

Rules:

- `<module>-composition.ts` wires use cases, repositories, middleware, and shared technical collaborators.
- `interface/http/<module>-routes.ts` declares the module HTTP routes and imports framework routing APIs.
- Route files may import handlers and composed middleware.
- Route files must not instantiate repositories, databases, or business use cases.
- Do not put routes inside composition files.
- Do not add business module `index.ts` until there is a clear external public API need.

## Handlers

Handlers currently stay simple by design:

- read request data
- call the composed use case
- map the result
- assign response status/body

Handlers may import composed use cases for now. Do not convert handlers to factories unless the user explicitly plans that refactor.

Handlers must not:

- instantiate infrastructure
- contain business rules
- perform repository/database work directly
- grow orchestration beyond thin HTTP adaptation

## Shared Modules

Shared modules are first-class modules, not dumping grounds.

Use concern-first shared modules. A shared folder name should describe the reusable concern, not a broad architectural layer.

```text
src/app/shared/<concern>/
  index.ts
  ...
```

Examples:

```text
src/app/shared/kernel/
src/app/shared/http/
src/app/shared/persistence/mongodb/
src/app/shared/security/password/
```

Rules:

- Files inside a shared concern may use the structure that best fits that concern.
- `*-composition.ts` wires only its own concern.
- `index.ts` explicitly exports only the public API allowed outside the concern.
- Never use `export *` from shared public API files.
- Do not create a root shared index that aggregates unrelated shared modules.
- Business composition may import shared public APIs from these indexes.
- Domain/application code may import pure shared primitives, but must not import composed infrastructure values.
- MongoDB clients, typed collections, collection names, and collection schema types are valid shared persistence resources.
- Shared modules must not import business modules. If shared code needs a business type, error, or port, the code belongs in that business module.
- Shared MongoDB schema files should describe persistence documents directly instead of extending business domain entities.
- Business-specific behavior belongs to the owning business module, even when it uses shared primitives.
- App-level runtime orchestration belongs outside `shared` when it composes business modules.
- Startup/runtime interfaces belong to the module whose use case they deliver.

## Feature-Specific Infrastructure

If a file implements a business port, it belongs to the owning business module even if it uses shared infrastructure.

Repository adapters belong under the owning module's infrastructure:

```text
src/app/<module>/infrastructure/repository/
```

Do not put feature-specific repository adapters in `shared`.

## Public API Rules

Use `index.ts` only when a module is consumed from outside its folder.

Allowed:

```ts
export { mongoDBClient, usersCollection } from './mongodb-composition';
export type { UsersCollection } from './users-collection-schema';
```

Avoid:

```ts
export * from './mongodb-composition';
export * from './create-mongodb-client';
```

Internal files must not import their own module root index if that creates cycles or hides ownership.

## Import Boundaries

Allowed direction:

```text
app startup/config
  -> module routes / module composition / shared public APIs
    -> interface / application / infrastructure
      -> domain
```

Forbidden:

```text
domain/application -> composition
domain/application -> composed infrastructure values
shared technical composition -> business modules
route files -> repositories or database collections
```

Use leaf config imports such as `@/config/security`; avoid importing `@/config` from composition if it creates route/config cycles.

## Validation Checklist

Before finishing architecture changes:

- No imports from the old `@/composition/*` tree remain.
- No domain/application files import `*-composition.ts`.
- Composition files contain wiring only.
- Route files contain route declarations only.
- Shared module indexes use explicit named exports.
- No `export *` from composition files.
- Handlers remain thin.
- Run lint, format check, tests, and build through the project runtime.
