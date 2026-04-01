# 🎬 CineLog

> Your personal cinema diary — track, rate, and discover films you'll love.

---

## 💡 Project Idea

CineLog is a full-stack web application that lets users build and manage their personal movie watchlist. Users can add films, mark them as watched or in queue, give star ratings and write reviews, and receive AI-powered movie recommendations based on their taste — all wrapped in a cinematic, dark-gold interface.

---

## 👥 Team Members

| Name | Role |
|------|------|
| Beatriz Silva | Frontend Developer |
| Ravi Kumar | Backend Developer |

---

## ✨ Features

- **User Authentication** — Register and log in securely with JWT tokens
- **Personal Watchlist** — Add movies with title, year, and genre
- **Watch Status** — Mark movies as "Watched" or "In Queue"
- **Star Ratings & Reviews** — Rate films from 1 to 5 stars and write personal reviews
- **AI Recommendations** — Get personalised movie suggestions powered by Meta Llama 3.3 via Hugging Face / Groq
- **TMDB Posters** — Recommendation cards automatically fetch real movie posters from The Movie Database
- **Cinematic UI** — Dark theme with gold accents, animated particle background, and smooth transitions

---

## 🔌 API Routes

### Auth

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/auth/register` | Register a new user | None |
| POST | `/api/auth/login` | Login and receive JWT token | None |

**Register body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Movies

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/api/movies` | Get all movies for logged-in user | Bearer JWT |
| POST | `/api/movies` | Add a new movie | Bearer JWT |
| PUT | `/api/movies/:id` | Update a movie (rating, review, status) | Bearer JWT |
| DELETE | `/api/movies/:id` | Remove a movie | Bearer JWT |

**Create movie body:**
```json
{
  "title": "Inception"
}
```

**Update movie body:**
```json
{
  "rating": 5,
  "review": "Mind-blowing.",
  "status": "watched"
}
```

---

## 🗄️ Database Schema

Built with **PostgreSQL** and **Sequelize ORM**.

### Users Table

| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key, auto-increment |
| name | STRING | Required |
| email | STRING | Required, unique, validated |
| password | STRING | Required, hashed |
| profilePicture | STRING | Optional |
| createdAt | DATE | Auto |
| updatedAt | DATE | Auto |

### Movies Table

| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key, auto-increment |
| userId | INTEGER | Foreign key → Users |
| title | STRING | Required |
| imdbId | STRING | Optional |
| poster | STRING | Optional, URL |
| year | STRING | Optional |
| genre | STRING | Optional |
| status | ENUM | `want_to_watch` or `watched` |
| rating | INTEGER | Optional, 1–5 |
| review | TEXT | Optional |
| addedAt | DATE | Defaults to now |
| createdAt | DATE | Auto |
| updatedAt | DATE | Auto |

### Relationships

```
User ──< Movie
One user has many movies (watchlist)
Each movie belongs to one user
```

---

## 📸 Screenshots

### Landing Page
<img width="1889" height="955" alt="Screenshot 2026-04-02 at 01 05 32" src="https://github.com/user-attachments/assets/eccaee6f-ddab-4605-b868-a96dd31b31fd" />


### Login Page
<img width="1892" height="950" alt="Screenshot 2026-04-02 at 01 07 40" src="https://github.com/user-attachments/assets/d8d4179a-3529-4f2a-ba28-8c04541edb52" />


### Register Page
<img width="1885" height="949" alt="Screenshot 2026-04-02 at 01 08 19" src="https://github.com/user-attachments/assets/b383dc0e-a19e-469f-a19c-3fd94edac009" />

### Dashboard — — Watchlist and AI Recommendations
<img width="1881" height="909" alt="Screenshot 2026-04-02 at 01 09 07" src="https://github.com/user-attachments/assets/aaa89a0c-99cf-48a8-98d8-120efa6c1006" />

---

## 🛠️ Tech Stack

**Frontend:** Next.js 14, React, Tailwind CSS, Three.js, Axios

**Backend:** Node.js, Express, TypeScript, Sequelize, PostgreSQL, JWT

**AI:** Meta Llama 3.3 70B via Hugging Face / Groq

**External APIs:** TMDB (The Movie Database) for movie posters

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your DB credentials and JWT secret
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local   # fill in API URL, HF token, TMDB key
npm run dev
```

Visit `http://localhost:3001` 🎬
