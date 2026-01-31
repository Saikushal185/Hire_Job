# Resume Matcher API Documentation

## Overview

The Resume Matcher is a FastAPI-based service that parses resumes, extracts key information, and provides AI-powered scoring and feedback.

## Base URL

```
http://localhost:8000
```

## Endpoints

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

### Parse Resume

```http
POST /api/parser
Content-Type: multipart/form-data
```

**Request:**
- `file`: PDF file (required)

**Response:**
```json
{
  "resume": {
    "profile": {
      "email": "user@example.com",
      "phone": "123-456-7890"
    },
    "text": "Extracted resume text..."
  },
  "score": {
    "totalScore": 85,
    "breakdown": {
      "contactInfo": 20,
      "education": 25,
      "experience": 20,
      "skills": 20,
      "summary": 0
    },
    "feedback": [
      "Consider adding a professional summary",
      "Use more action verbs"
    ]
  },
  "keywords": ["Python", "Machine Learning", "Data Analysis"]
}
```

**Error Responses:**

| Status | Description |
|--------|-------------|
| 400    | Invalid file format (only PDF supported) |
| 500    | Failed to parse PDF |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI analysis | No |

## Score Breakdown

| Category | Max Points | Description |
|----------|------------|-------------|
| Contact Info | 20 | Email and phone presence |
| Structure | 30 | Section organization |
| Content Length | 20 | Optimal word count (400-1000) |
| Keywords | 30 | Action verbs and skills |

## Running Locally

```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --reload --port 8000
```

## Docker

```bash
docker build -t resume-matcher .
docker run -p 8000:8000 -e OPENAI_API_KEY=your_key resume-matcher
```
