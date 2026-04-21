# AGENTS.md - Personal Budget Tracker

## Core Principles

**Type Safety**: End-to-end TypeScript with Zod validation at boundaries.
**Composable**: Small focused modules that compose naturally.
**Well-Tested**: Unit (70%), Integration (20%), E2E (10%). Target 80%+ coverage.
**Clear APIs**: Consistent naming, single responsibility, predictable behavior.
**Developer Joy**: Fast feedback, excellent errors, self-documenting.

---

## Architecture

```
Components → Hooks → Services → Types (Zod) → Storage
```

Data flows unidirectionally. Each layer has single responsibility. Validate at boundaries.

---

## Code Standards

| Item | Convention | Example |
|------|-----------|---------|
| Types | PascalCase | `Transaction` |
| Functions | camelCase | `calculateTotal()` |
| Hooks | `use*` | `useTransactions()` |
| Services | `*Service` | `transactionService` |
| Components | PascalCase | `TransactionForm` |
| Callbacks | `on*` | `onSubmit` |

---

## Key Patterns

**Validation**: Zod schemas at boundaries. Use `safeParse` for errors, `parse` for trusted data.

**Services**: Pure functions, no side effects, dependency injection for testability.

**Hooks**: Custom hooks compose logic. Zustand selectors prevent unnecessary re-renders.

**Components**: Props are contracts. No prop drilling. Test behavior, not implementation.

**State**: Global via Zustand, local via useState, derive in hooks.

---

## Development

```bash
npm run dev          # Start dev server
npm run type-check   # Verify types
npm run test         # Run tests
npm run build        # Production build
```

---

## PR Checklist

- [ ] Types defined, no `any`
- [ ] Tests passing, coverage maintained
- [ ] ESLint passes, properly formatted
- [ ] JSDoc for public APIs
- [ ] No console.log in code

---

## Resources

[Zod](https://zod.dev) | [Zustand](https://github.com/pmndrs/zustand) | [Vitest](https://vitest.dev) | [Playwright](https://playwright.dev)

**Version**: 1.0.0 | **Updated**: 2026-04-18