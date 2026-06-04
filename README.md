# Sip & Scribble

A personal journaling app built with MongoDB, Express, React, and Node.js.

## Setup

### Backend

```bash
cd backend
cp .env.example .env
# Fill in your MONGO_URI and a strong JWT_SECRET
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

For production, set `VITE_API_BASE_URL` in `frontend/.env` to point at your deployed backend.

## Environment Variables

**Backend** (`backend/.env`):
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — any long random string
- `PORT` — defaults to 5001
- `CLIENT_ORIGIN` — comma-separated allowed origins for CORS

**Frontend** (`frontend/.env`):
- `VITE_API_BASE_URL` — backend URL (only needed in production; dev uses the Vite proxy)
