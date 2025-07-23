# Parse Platform Marketing Website

## Overview

This is a modern React/Express.js full-stack application that serves as a marketing website for the Parse Platform. The application showcases Parse's capabilities, displays GitHub statistics for Parse repositories, features a comprehensive security program page, and maintains a clean, responsive design using shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with a clear separation between client and server code:

- **Frontend**: React with TypeScript using Vite for development and building
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but can use in-memory storage for development)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing with Home and Security pages
- **State Management**: TanStack Query for API state, React Context for theme management
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with custom configuration for monorepo setup

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints under `/api` prefix
- **Data Layer**: Abstract storage interface with in-memory implementation (can be extended to use PostgreSQL with Drizzle)
- **Error Handling**: Centralized error middleware
- **Development**: Custom Vite integration for hot reloading

### Database Schema
The application defines three main entities:
- **Users**: Basic user management with username/password
- **Newsletters**: Email subscription management
- **GitHub Stats**: Repository statistics caching (stars, forks, last updated)

### API Endpoints
- `POST /api/newsletter/subscribe` - Newsletter subscription
- `GET /api/github/stats` - Fetch all GitHub repository stats
- `GET /api/github/stats/:repository` - Fetch specific repository stats
- `POST /api/github/stats/update` - Update repository statistics

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from API endpoints
2. **API Processing**: Express routes handle requests and interact with the storage layer
3. **Data Storage**: Currently uses in-memory storage, but ready for PostgreSQL migration
4. **Real-time Updates**: GitHub stats are cached and can be refreshed via API calls
5. **UI Updates**: Components automatically re-render when query data changes

## External Dependencies

### Production Dependencies
- **UI Framework**: React, Radix UI components, Tailwind CSS
- **Data Fetching**: TanStack Query for API state management
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Validation**: Zod for schema validation
- **Utilities**: date-fns, clsx, class-variance-authority

### Development Tools
- **Build Tools**: Vite, esbuild, TypeScript
- **Database Tools**: Drizzle Kit for migrations
- **Development**: tsx for TypeScript execution
- **Styling**: PostCSS, Autoprefixer

## Deployment Strategy

The application is configured for a production deployment with:

1. **Build Process**: 
   - Frontend built with Vite to `dist/public`
   - Backend bundled with esbuild to `dist/index.js`

2. **Environment Configuration**:
   - Development: Uses tsx for hot reloading
   - Production: Runs compiled JavaScript with Node.js

3. **Database Setup**:
   - Drizzle configured for PostgreSQL
   - Migration files generated in `./migrations`
   - Database URL required via environment variable

4. **Static Assets**:
   - Frontend assets served from `dist/public`
   - Express serves static files in production
   - Development uses Vite dev server integration

The application is designed to be deployed on platforms like Replit, with specific configurations for the Replit environment including error overlays and development banners.