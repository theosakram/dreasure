# 💰 Dreasury

A modern financial management application built with Next.js, designed to help organizations manage cash flow, member transactions, and revolving funds efficiently.

## ✨ Features

### 🏦 Financial Management

- **Cash Flow Tracking**: Monitor deposit and withdrawal transactions with real-time balance updates
- **Member Management**: Track individual member transactions and payment histories
- **Revolving Funds**: Manage community or organizational revolving fund systems
- **Transaction Timeline**: Detailed transaction history with search and filtering capabilities

### 🎨 User Experience

- **Modern UI**: Built with Chakra UI v3 for a clean, accessible interface
- **Dark/Light Mode**: Automatic theme switching support
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Updates**: Live data synchronization with Supabase

### 🔐 Authentication & Security

- **Secure Authentication**: Powered by Supabase Auth
- **Protected Routes**: Role-based access control
- **Data Validation**: Form validation with Zod schemas

## 🛠 Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[Chakra UI v3](https://www.chakra-ui.com/)** - Modern component library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Backend & Database

- **[Supabase](https://supabase.com/)** - Backend as a Service (Database, Auth, Real-time)
- **PostgreSQL** - Database (via Supabase)

### State Management & Data Fetching

- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[TanStack Table](https://tanstack.com/table)** - Headless table library
- **[React Final Form](https://final-form.org/react)** - Form state management

### Utilities & Tools

- **[Day.js](https://day.js.org/)** - Date manipulation
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[Zod](https://zod.dev/)** - Schema validation
- **[ESLint](https://eslint.org/)** - Code linting

## 🚀 Development Setup

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Access to the Supabase project

### Getting Started

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Database Schema** (Reference only)

   The following tables should already exist in the Supabase project:

   Create the following tables in your Supabase project:

   ```sql
   -- Profiles table
   create table profiles (
     id uuid references auth.users on delete cascade,
     fullname text,
     email text,
     phone text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     primary key (id)
   );

   -- Wallets table
   create table wallets (
     id uuid default gen_random_uuid() primary key,
     name text not null,
     description text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Transactions table
   create table transactions (
     id serial primary key,
     wallet_id uuid references wallets(id) on delete cascade,
     user_id uuid references profiles(id) on delete cascade,
     type text check (type in ('deposit', 'withdraw')),
     amount numeric not null,
     description text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Installments table (for revolving funds)
   create table installments (
     id uuid default gen_random_uuid() primary key,
     user_id uuid references profiles(id) on delete cascade,
     total_to_be_paid numeric not null,
     start_date timestamp with time zone,
     due_date timestamp with time zone,
     description text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Installment payments table
   create table installment_payments (
     id uuid default gen_random_uuid() primary key,
     installment_id uuid references installments(id) on delete cascade,
     wallet_id uuid references wallets(id) on delete cascade,
     user_id uuid references profiles(id) on delete cascade,
     amount numeric not null,
     paid_date timestamp with time zone,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```

4. **Run the development server**

   ```bash
   yarn dev
   # or
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```text
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication layout group
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup page
│   ├── (main)/            # Main application layout group
│   │   ├── cash/          # Cash flow management
│   │   ├── members/       # Member management
│   │   │   └── detail/[id]/ # Member transaction details
│   │   └── revolving/     # Revolving funds
│   └── private/           # Private/protected routes
├── components/            # Reusable UI components
│   ├── containers/        # Feature-specific containers
│   ├── custom/           # Custom UI components
│   └── ui/               # Base UI components
├── features/             # Feature-based modules
│   ├── installments/     # Installment management
│   ├── profiles/         # User profile management
│   ├── transactions/     # Transaction management
│   └── wallets/          # Wallet management
├── supabase/             # Supabase configuration and utilities
├── utils/                # Utility functions and helpers
└── providers/            # React context providers
```

## 🔧 Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production with Turbopack
- `npm start` - Start production server
- `yarn lint` - Run ESLint

## 🌟 Key Features Explained

### Cash Flow Management

Track your organization's money flow with detailed transaction records, including deposits and withdrawals with automatic balance calculations.

### Member Transaction Timeline

View individual member transaction histories with a clean timeline interface showing all deposits, withdrawals, and descriptions.

### Advanced Filtering

Filter transactions by date range, member name, and transaction type to quickly find what you're looking for.

### Real-time Data

All data is synchronized in real-time using Supabase's real-time capabilities, ensuring everyone sees the latest information.

## 📄 Project Information

This is a private project for internal use only.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Chakra UI Documentation](https://www.chakra-ui.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

---

Built with ❤️ using Next.js, Chakra UI v3, and Supabase.
