# AGENTS.md - fut-score-bot Development Guide

## Project Overview

**fut-score-bot** is a full-stack **football prediction platform** with dual frontends (web + Telegram bot). Users make score predictions, earn points based on accuracy, and compete on leaderboards.

**Architecture**: Next.js 15 (frontend) + Express (some older routes) + Telegram Bot API + PostgreSQL + Prisma ORM

### Directory Structure
- **`/app`** – Next.js pages and Server Actions (15.2.4)
- **`/src`** – Legacy Node.js code + Telegram bot (`/src/bot`)
- **`/components`** – React UI: Radix UI primitives + custom layouts
- **`/lib`** – Core: Prisma singleton, NextAuth config
- **`/schemas`** – Zod validation schemas
- **`/utils`** – Utility functions (logging, scoring, formatting)
- **`/prisma`** – Database schema + migrations (PostgreSQL)

---

## Critical Architecture Patterns

### 1. **Database & Prisma Client**
```typescript
// /lib/prisma.ts – Singleton pattern (ALWAYS use this)
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
```
- **Why**: Avoid multiple Prisma instances in development
- **Usage**: All DB queries import from `@l/prisma`
- **Cascading deletes** configured on `Prediction` and `Odd` models for data integrity

### 2. **Authentication & Session Management**
- **Provider**: NextAuth with **JWT strategy** (not database sessions)
- **Config**: `/lib/auth.ts` with `CredentialsProvider`
- **Token payload**: `{ id, role, username, email }`
- **Protected route**: `/predictions/:path*` via `/middleware.ts`
- **Sign-in redirect**: `/login` (redirects unauthenticated users)
- **Key callback**: `session` callback adds custom fields to `session.user`

```typescript
// Session access pattern
const session = await getServerSession(authOptions);
const userId = session.user.id; // Custom field from JWT callback
```

### 3. **Telegram Logging (Critical Pattern)**
```typescript
// /utils/telegram-logger.ts – Audit trail for all user actions
const tgLog = async (message: string) => { /* ... */ }
```
**Used for**:
- Login success/failure (with reason)
- Sign-outs
- Prediction creation
- Errors during operations

**Location check**: `typeof window === "undefined"` (server-side only)
- **Server**: Direct API call with `LOGS_TELEGRAM_TOKEN` + `MY_CHAT_ID`
- **Client**: `/api/telegram-log` route proxy

⚠️ **Required env vars**: `LOGS_TELEGRAM_TOKEN`, `MY_CHAT_ID`

### 4. **Prediction Scoring Engine**
```typescript
// /utils/evaluatePrediction.ts
export const evaluatePrediction = (prediction, event) => {
  // 1. Exact score match → exact_score_odds (e.g., "1:0" → odds.oneZero)
  // 2. Partial match (result only) → match_result_odds (1, X, 2)
  // 3. No match → 0 points with "Incorrect" status
}
```
**Score key mapping**:
- Exact: `${numberMap[home]}${numberMap[away]}` (e.g., "zeroOne", "twoTwo")
- Result: `"one"` | `"x"` | `"two"`
- Fallback: `"anyOther"` for scores > 3

### 5. **Server Actions & Cache Revalidation**
```typescript
// /app/create-predictions/actions.ts pattern
"use server";
export const createPrediction = async (payload, userId) => {
  // 1. Batch insert predictions
  await prisma.prediction.createMany({ data, skipDuplicates: true });
  // 2. Log via Telegram
  await tgLog(`✅ Predictions made...`);
  // 3. Revalidate UI
  revalidatePath(`/create-predictions`);
};
```
**Key points**:
- Always `"use server"` directive
- Use `revalidatePath` for ISR updates (not redirect)
- Log all user actions before returning

### 6. **Zod Schema Validation**
```typescript
// /schemas/login.ts pattern
export const LoginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;
```
**Convention**:
- File: `schemas/{feature}.ts`
- Export both schema AND inferred type
- Used in `actions.ts` with `safeParse`

### 7. **Tailwind CSS + Radix UI Component Pattern**
```typescript
// /components/ui/form.tsx – Integrated FormProvider
// /components/ui/button.tsx, select.tsx, etc. – CVA variants
import { cn } from "@u/cn"; // Utility: clsx + tailwind-merge
```
**Styling approach**:
- `cn()` utility for conditional classes (clsx + twMerge)
- Radix UI for accessible primitives
- Tailwind v4 with PostCSS
- No custom CSS: use component props

---

## Developer Workflows

### Local Development
```bash
# Frontend
npm run next:dev          # Runs on :3000 with hot reload

# Telegram Bot
npm run start:bot         # Node.js bot from /src/bot/index.js

# Database
npm run db                # Prisma Studio GUI at :5555
npm run migrate           # Run pending migrations

# Code Quality
npm run prettier:check    # Check formatting
npm run prettier:write    # Auto-format all files
npm run lint              # ESLint (currently ignores build errors)
```

### Database Migrations
```bash
npx prisma migrate dev --name <feature_name>  # Create migration
npx prisma db push                            # Sync schema (dev only)
```
**Schema location**: `/prisma/schema.prisma` (PostgreSQL)
**Enums**: `Role` (USER, ADMIN), `EventStatus` (NOT_STARTED, FINISHED)

### Build & Deployment
```bash
npm run build             # Vite build (legacy site, ignored in Next.js)
npm run next:build        # Next.js production build
npm run next:start & npm run start:bot  # Production (full app)
```

---

## Import Path Aliases
**Configured in `tsconfig.json`**:
```json
"@c/*": "./components/*"    // UI & Layout
"@l/*": "./lib/*"           // Core libs (auth, prisma)
"@s/*": "./schemas/*"       // Zod schemas
"@u/*": "./utils/*"         // Utilities
```
**Always use aliases** for clean imports; relative imports are discouraged.

---

## Data Model Highlights

### User (Core Entity)
```prisma
model User {
  id: String @id @default(cuid())
  telegramId, email, hashedPassword, username, firstName, lastName
  role: Role @default(USER)  // USER or ADMIN
  predictions: Prediction[]   // Cascade delete
  results: Results?           // One-to-one
}
```

### Event (Match)
```prisma
model Event {
  id: Int @id
  startDate, tournament, home, away, score, country
  status: EventStatus @default(FINISHED)
  odd: Odd?           // One-to-one, cascade delete
  predictions: Prediction[]
}
```

### Prediction & Scoring
- **Unique constraint**: `@@unique([userId, eventId])` – one prediction per user per event
- **Result columns**: `total`, `exactScore`, `oneXTwo`, plus per-tournament scores
- **Accuracy tracking**: `exactScorePercentage`, `oneXTwoPercentage`

---

## Form & Input Patterns

### Creating a New Form
1. **Define schema** in `/schemas/{feature}.ts` with Zod
2. **Create form component** in `/app/{feature}/Form.tsx` with `"use client"`
3. **Export action** from `/app/{feature}/actions.ts` with `"use server"`
4. **Handle submission**:
   ```typescript
   const form = useForm({ resolver: zodResolver(Schema) });
   const onSubmit = async (data) => {
     const result = await someAction(data);
     form.reset(); // Clear form on success
   };
   ```
5. **Revalidate cache** in action: `revalidatePath("/route")`
6. **Log everything**: `await tgLog(...)`

### Dynamic Form Fields (Events)
```typescript
// /app/create-predictions/Form.tsx pattern
const FormSchema = z.strictObject(
  events.reduce(
    (acc, item) => ({ ...acc, [item.id]: z.optional(z.string()) }),
    {}
  )
);
// Creates schema with dynamic event IDs as keys
```

---

## Error Handling & Observability

### Try-Catch with Logging
```typescript
try {
  // Operation
  await tgLog(`✅ Success message`);
} catch (error) {
  await tgLog(`❌ Error: ${JSON.stringify(error)}`);
  console.log(error);
}
```
**Convention**: Always log errors to Telegram AND console

### Password Hashing
```typescript
// /lib/auth.ts uses bcryptjs v3.0.3
const hashedPassword = await bcryptjs.hash(password, saltRounds);
const match = await bcryptjs.compare(password, hashedPassword);
```

---

## Testing & Type Safety

- **TypeScript strict mode** enabled: `"strict": true`
- **Null checks**: `strictNullChecks: true`
- **No build errors ignored** in `next.config.ts` (flag for cleanup)
- **ESLint config**: React-app preset with max-warnings: 0

### Type Exports
Always export types alongside schemas:
```typescript
export type FeatureName = z.infer<typeof FeatureSchema>;
```

---

## Common Gotchas & Patterns

| Issue | Pattern | Example |
|-------|---------|---------|
| **Multiple Prisma instances** | Import singleton from `@l/prisma` | ✅ Only in `/lib/prisma.ts` |
| **Lost session data** | Add to JWT callback in `authOptions` | ✅ `/lib/auth.ts` lines 10-19 |
| **UI not updating** | Use `revalidatePath` in Server Actions | ✅ `/app/create-predictions/actions.ts` |
| **Missing Telegram logs** | Check env: `LOGS_TELEGRAM_TOKEN`, `MY_CHAT_ID` | ✅ `/utils/telegram-logger.ts` |
| **Form state after submit** | Call `form.reset()` after success | ✅ Pattern in Form components |
| **Auth protection** | Redirect early in page.tsx Server Component | ✅ `/app/create-predictions/page.tsx` lines 8-12 |
| **Unstyled components** | Always use `cn()` for Tailwind merge | ✅ Check `/utils/cn.ts` |

---

## Bot Integration (Telegram)

**Location**: `/src/bot/index.js` (separate Node.js process)
**Key files**:
- `init-bot.js` – Bot initialization
- `matches-to-buttons.js` – Match display
- `send-notification.js` – User notifications

**Coordination**: Bot reads/writes same PostgreSQL database via Prisma
- User can link `telegramId` during registration
- Predictions synced across web and Telegram interfaces

---

## Quick Reference Commands

```bash
# Development
npm run next:dev          # ← Start here

# Database operations
npm run migrate           # Apply migrations
npm run db                # Prisma Studio

# Code quality
npm run prettier:write    # Format code

# Testing
npm run next:lint         # Type check
npm run build             # Full build

# Production
npm run next:build && npm run next:start
```

---

**Last Updated**: Aug 2026

