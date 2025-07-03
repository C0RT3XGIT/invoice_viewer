# Invoice Viewer Frontend

A modern Next.js application for viewing and managing invoices, built with TypeScript, Tailwind CSS, and Radix UI components.

## Features

- 🎨 Modern UI with Tailwind CSS and Radix UI
- 🔍 Invoice viewing and management
- 📱 Responsive design
- 🌙 Dark mode support
- 🚀 Optimized for production deployment

## Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: Supabase
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd invoice-viewer-frontend
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

4. Configure your environment variables (see Environment Variables section)

5. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_url_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Deployment

### Railway Deployment

This application is optimized for Railway deployment with:

- **Standalone output**: Configured in `next.config.mjs`
- **Docker support**: Multi-stage Dockerfile included
- **Environment variables**: Properly configured for build-time injection

#### Deploy to Railway

1. **Using Railway CLI**:

```bash
railway login
railway init
railway up
```

2. **Using Git Integration**:
   - Connect your GitHub repository to Railway
   - Set environment variables in Railway dashboard
   - Deploy automatically on git push

#### Required Environment Variables for Railway

Set these in your Railway project settings:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Other Deployment Options

- **Vercel**: One-click deployment with GitHub integration
- **Netlify**: Static export or SSR deployment
- **Docker**: Use included Dockerfile for containerized deployment

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets
├── services/           # API services
├── styles/             # Global styles
├── types/              # TypeScript type definitions
├── Dockerfile          # Docker configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Dependencies and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
