# AI Job Tracker — Frontend

Next.js frontend for the AI-Powered Job Application Tracker.

## Tech Stack
- **Next.js 14** — App Router, TypeScript
- **Tailwind CSS** — styling
- **Axios** — HTTP client with JWT interceptors
- **Recharts** — dashboard charts
- **lucide-react** — icons
- **react-hot-toast** — notifications
- **Vercel** — deployment

## Features
- JWT authentication with cookie storage
- Visual Kanban board with drag-and-drop
- AI Resume Analyzer with match scoring
- Analytics dashboard with charts
- Fully responsive design

## Local Setup
```bash
git clone https://github.com/YOUR_USERNAME/job-tracker-frontend.git
cd job-tracker-frontend

npm install

cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000/api

npm run dev
```

Visit `http://localhost:3000`

## Deployment
Deployed on Vercel. Connect repo and add `NEXT_PUBLIC_API_URL` environment variable.

## Related
- **Backend:** [job-tracker-backend](https://github.com/anshumankashyap/Job-Tracker-backend)
- **Live Demo:** [https://job-tracker-frontend.vercel.app](https://job-tracker-frontend.vercel.app)
