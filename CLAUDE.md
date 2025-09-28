# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` or `yarn dev` - Start development server with Turbopack
- `npm run build` or `yarn build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` or `yarn lint` - Run ESLint for code quality checks

## Tech Stack & Architecture

This is a Next.js 15 financial management application using the App Router with TypeScript.

### Core Technologies
- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Framework**: Chakra UI v3 with next-themes for dark/light mode
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **State Management**: TanStack Query for server state, React Final Form for form state
- **Styling**: Chakra UI components with custom theme configuration
- **Date Handling**: Day.js for date manipulation and formatting

### Project Structure

The codebase follows a feature-based architecture:

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication layout group (login, signup)
│   ├── (main)/            # Main app layout group (cash, members, revolving)
│   └── private/           # Protected routes
├── features/              # Feature-based modules (transactions, wallets, profiles, installments)
├── components/            # UI components
│   ├── containers/        # Feature-specific containers
│   ├── custom/           # Custom reusable components
│   └── ui/               # Base UI components
├── supabase/             # Supabase client configuration and utilities
└── utils/                # Utility functions and form schemas
```

### Key Architectural Patterns

1. **Feature-Based Organization**: Each domain (transactions, wallets, profiles, installments) has its own folder containing hooks, services, and types.

2. **Custom Hooks Pattern**: Data fetching uses TanStack Query with custom hooks (e.g., `useGetTransactions`, `useGetWallets`) that handle query keys and lazy import services.

3. **Layout Groups**: Uses Next.js layout groups `(auth)` and `(main)` to organize routes with different layouts.

4. **Supabase Integration**:
   - Client-side: `src/supabase/client.ts`
   - Server-side: `src/supabase/server.ts`
   - Middleware: `src/supabase/middleware.ts` for auth routing

5. **Form Handling**: Uses React Final Form with Zod schemas for validation (located in `src/utils/forms/schemas/`).

6. **Navigation**: Centralized navigation configuration in `src/config/navigation.ts` with icon mappings.

### Database Schema

The application manages four main entities:
- **profiles**: User profile information linked to Supabase auth
- **wallets**: Financial wallets/accounts
- **transactions**: Deposit/withdrawal records
- **installments & installment_payments**: Revolving fund management

### Path Aliases

Uses `@/*` path alias pointing to `src/*` directory for clean imports.

### Environment Requirements

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`