# HireMind - Automated Job Crawler & Resume Matcher

<p align="center">
  <img src="frontend/public/logo.png" alt="HireMind Logo" width="120"/>
</p>

<p align="center">
  <strong>🚀 AI-Powered Job Matching Platform</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## Features

- **🔍 Smart Job Crawling** - Automated job scraping from multiple sources
- **📄 Resume Parsing** - AI-powered resume analysis with scoring
- **🎯 Job Matching** - Intelligent matching based on skills and experience
- **📊 Score Breakdown** - Detailed feedback on resume improvements
- **🏢 Company Tracking** - Save and track companies of interest
- **📅 Application Calendar** - Track your job application timeline
- **👤 User Profiles** - Personalized job recommendations
- **🔐 Secure Auth** - Supabase-powered authentication

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **CSS Modules** - Scoped styling
- **Lucide React** - Beautiful icons

### Backend
- **FastAPI** - Python API for resume parsing
- **SpaCy** - NLP for keyword extraction
- **OpenAI GPT** - AI-powered resume analysis
- **Supabase** - Database and authentication

### Infrastructure
- **Vercel** - Frontend hosting
- **Docker** - Containerized resume-matcher
- **PostgreSQL** - Supabase database

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Supabase account

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Add your Supabase credentials
npm run dev
```

### Resume Matcher Setup
```bash
cd resume-matcher
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --reload
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `OPENAI_API_KEY` | OpenAI API key (optional) |

## Project Structure

```
├── frontend/           # Next.js application
│   ├── src/
│   │   ├── app/       # App router pages
│   │   ├── components/ # React components
│   │   ├── context/   # React contexts
│   │   ├── lib/       # Utilities
│   │   └── types/     # TypeScript types
│   └── public/        # Static assets
├── resume-matcher/    # FastAPI service
│   ├── main.py       # API endpoints
│   └── Dockerfile    # Container config
├── *.sql             # Database schemas
└── docs/             # Documentation
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## License

This project is licensed under the Apache 2.0 License - see [LICENSE](./LICENSE) for details.

---

<p align="center">
  Developed as a Capstone Project
</p>
