# Backend (NestJS) for Project Management

## Setup

1. Copy `.env.example` to `.env` and set DB credentials.
2. Install deps:

```bash
cd backend
npm install
```

3. Run dev server:

```bash
npm run start:dev
```

The backend listens on the port from `PORT` env (default `3001`).

## API

- `GET /projects` — list projects
- `GET /projects/:id` — get project
- `POST /projects` — create project (json body)
- `PUT /projects/:id` — update project
- `DELETE /projects/:id` — delete project

TypeORM `synchronize: true` is enabled for convenience in development.
