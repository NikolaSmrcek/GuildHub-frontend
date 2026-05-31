# GuildHub Frontend

React + TypeScript + Vite frontend for GuildHub's loot distribution and loot council workflow.

## Setup

1. Install dependencies:

```bash
cd GuildHub-frontend
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## Project structure

- `src/main.tsx` — React entry point
- `src/App.tsx` — main application shell and example UI
- `src/types.ts` — shared item, request, vote, and distribution models
- `src/styles.css` — base styling for the demo frontend

## Notes

- This frontend is designed to work with the `GuildHub-backend` API using guild-scoped REST endpoints.
- Add `VITE_BACKEND_URL` to a local `.env` if you want to wire API requests directly.
