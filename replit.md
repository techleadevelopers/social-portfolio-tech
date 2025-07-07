# GitHub Portfolio App

## Overview

This is a modern, full-stack web application that showcases a developer's GitHub profile and activities. It's built with React, TypeScript, Express.js, and PostgreSQL, featuring a sleek GitHub-inspired design with real-time data fetching and responsive layouts.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern component patterns
- **Vite** as the build tool for fast development and optimized production builds
- **Tailwind CSS** with custom CSS variables for a GitHub-inspired dark theme
- **Shadcn/ui** component library for consistent, accessible UI components
- **TanStack Query** for efficient data fetching, caching, and synchronization
- **Wouter** for lightweight client-side routing

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **RESTful API** design following conventional HTTP methods
- **Middleware-based** request processing with error handling and logging
- **GitHub API integration** for fetching real-time user and repository data

### Database Architecture
- **PostgreSQL** as the primary database
- **Drizzle ORM** for type-safe database operations
- **Schema-first** approach with TypeScript type generation
- **Neon Database** as the hosted PostgreSQL provider

## Key Components

### Data Models
- **GitHub User**: Stores user profile information (name, bio, stats, etc.)
- **GitHub Repository**: Repository details with language, stats, and pinned status
- **GitHub Activity**: Recent activity feed with action types and timestamps

### Frontend Components
- **Profile Sidebar**: User avatar, bio, statistics, and technology stack
- **Repository Cards**: Interactive cards showing repo details with external links
- **Contribution Graph**: Visual representation of coding activity over time
- **Recent Activity**: Real-time feed of GitHub actions and events
- **GitHub Header**: Navigation with search functionality and section switching

### API Endpoints
- `GET /api/github/user` - Fetch GitHub user profile
- `GET /api/github/repositories` - Get all repositories
- `GET /api/github/pinned` - Get pinned repositories
- `GET /api/github/activity` - Fetch recent activity
- `GET /api/github/contributions` - Get contribution data

## Data Flow

1. **Initial Load**: Client requests user data from `/api/github/user`
2. **Cache Strategy**: Server checks local database first, falls back to GitHub API
3. **Data Sync**: Fresh data from GitHub API updates local database
4. **Real-time Updates**: TanStack Query manages cache invalidation and background refetching
5. **Component Updates**: React components automatically re-render when data changes

## External Dependencies

### Core Framework Dependencies
- **React ecosystem**: React 18, React DOM, TypeScript
- **Build tools**: Vite, ESBuild for production builds
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer

### UI and UX Libraries
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Modern icon library
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **Date-fns**: Date manipulation and formatting

### Data Management
- **TanStack Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database operations
- **Drizzle-Zod**: Runtime validation for database schemas

### Database and Hosting
- **Neon Database**: Serverless PostgreSQL hosting
- **GitHub API**: External data source for user and repository information

## Deployment Strategy

### Development Environment
- **Concurrent development**: Client and server run simultaneously with hot reload
- **Vite dev server**: Handles frontend with HMR (Hot Module Replacement)
- **Express server**: Runs on development mode with TypeScript compilation
- **Database migrations**: Handled via Drizzle Kit push commands

### Production Build Process
1. **Frontend build**: Vite compiles React app to static assets
2. **Backend build**: ESBuild bundles Express server with external dependencies
3. **Asset serving**: Express serves static frontend files in production
4. **Database setup**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **GitHub API**: Rate limiting and authentication considerations

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
- July 07, 2025. Portfolio profissional criado com tema azul, efeitos morphismo, animações 3D e seção de carreira completa
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Design style: Tema azul profissional, efeitos morphismo avançados, animações 3D robustas
Portfolio requirements: Apresentação profissional para Tech Lead sênior com seção de carreira detalhada
```