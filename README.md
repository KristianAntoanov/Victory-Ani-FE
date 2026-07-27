# V&A Projects — Frontend

React + Vite + TypeScript frontend for V&A Projects, prepared to work with an external C# Web API.

## Setup

```bash
npm install
npm run dev
```

The app starts on `http://localhost:3000`.

Create `.env` from `.env.example` and point it to your API:

```env
VITE_API_BASE_URL=https://localhost:7001
```

Leave `VITE_API_BASE_URL` empty only if the API is served from the same origin as the frontend.

## Backend Endpoints

The frontend routes all HTTP calls through `src/config/api.ts`. Update that file if your C# controllers use different routes.

Current expected endpoints:

```text
POST   /api/auth/login
GET    /api/news
GET    /api/news/{id}
POST   /api/news
PUT    /api/news/{id}
DELETE /api/news/{id}
GET    /api/projects
GET    /api/projects/{id}
POST   /api/projects
PUT    /api/projects/{id}
DELETE /api/projects/{id}
POST   /api/contact-submissions
POST   /api/newsletter
```

Admin login expects `/api/auth/login` to return JSON with `token`, `accessToken`, or `jwtToken`. If a token is returned, the frontend sends it as `Authorization: Bearer <token>`.

## Scripts

```bash
npm run build
npm run preview
npm run lint
```

## Structure

```text
src/config/        API base URL and endpoint routes
src/repositories/  HTTP persistence boundary for news/projects
src/services/      API client and business services
src/content/       Static UI content used by public pages
src/pages/         Public and admin pages
src/components/    Shared UI and admin forms
```
