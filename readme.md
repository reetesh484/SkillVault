# SkillVault 🚀

> A personal knowledge management app — because engineering concepts deserve better than scattered Notion pages. Store, tag, search, and revisit everything you learn in one place.

🌐 **Live Demo** — Coming soon (deploying on Railway + Vercel)

---

## ✨ Features

- **Concept Management** — Create, read, update, and delete learning concepts with rich markdown support
- **Tagging System** — Organise concepts with multiple tags and filter by them instantly
- **Full-Text Search** — PostgreSQL `tsvector`-powered search with relevance ranking *(in progress)*
- **Redis Caching** — Search and list endpoints cached for fast repeated queries *(in progress)*
- **Markdown Live Preview** — Split-pane editor with real-time rendered preview
- **Infinite Scroll** — Virtualised list rendering with React Window for large datasets
- **Stats Dashboard** — Overview of total concepts, tags, and activity *(in progress)*
- **Authentication** — JWT-based auth with session support, token expiry, and one-time reset flow
- **Optimistic Updates** — Instant UI feedback via React Query
- **Dark Mode** — Toggle between light and dark themes
- **Responsive Design** — Mobile-friendly UI with Tailwind CSS

---

## 🛠 Tech Stack

### Backend
- **Django 5.2** + **Django REST Framework** — API layer
- **PostgreSQL** — Primary database with full-text search via `tsvector`
- **Redis** — Caching layer for high-frequency endpoints
- **Celery** — Background task queue for async operations *(in progress)*
- **JWT Auth** — Token lifecycle management with expiry and blacklisting

### Frontend
- **React 19** + **TypeScript** — UI with full type safety
- **Vite** — Build tool and dev server
- **TanStack Query (React Query)** — Server state, caching, and optimistic updates
- **React Router** — Client-side routing
- **React Window** — List virtualisation for performance
- **Tailwind CSS 4** — Utility-first styling
- **Shadcn/ui** + **Radix UI** — Accessible, composable components
- **Axios** — HTTP client
- **Vitest** + **Testing Library** — Unit and component testing

---

## 🗺️ Roadmap

- [x] CRUD for concepts and tags
- [x] JWT authentication with session support
- [x] Infinite scroll with virtualised list
- [x] Tag filtering
- [x] Dark mode
- [ ] PostgreSQL full-text search with `tsvector` ranking
- [ ] Redis caching with targeted cache invalidation
- [ ] Weekly digest email via Celery Beat
- [ ] Public shareable concept links (one-time token, expiry)
- [ ] Stats dashboard (concepts per tag, activity over time)
- [ ] Deploy on Railway (backend) + Vercel (frontend)

---

## 📁 Project Structure

```
SkillVault/
├── skillvault_backend/
│   ├── manage.py
│   ├── authentication/          # JWT auth app
│   ├── concepts/                # Core concepts app
│   │   ├── models.py           # Concept & Tag models
│   │   ├── views.py            # API views
│   │   ├── serializers.py      # DRF serializers
│   │   ├── pagination.py       # Custom pagination
│   │   └── migrations/
│   ├── skillvault_backend/     # Project settings
│   └── sql/                    # SQL seed files
│
└── skillvault_frontend/
    ├── src/
    │   ├── api/                # API client & endpoints
    │   ├── components/         # React components
    │   │   ├── ConceptCard.tsx
    │   │   ├── ConceptForm.tsx
    │   │   ├── ConceptsList.tsx
    │   │   └── ui/            # Shadcn/ui components
    │   ├── hooks/             # Custom React hooks
    │   ├── pages/             # Page components
    │   ├── routes/            # Route configuration
    │   └── tests/             # Test files
    ├── package.json
    └── vite.config.ts
```

---

## 📦 Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL
- Redis
- pip + npm

---

## 🚀 Installation

### Backend Setup

```bash
cd skillvault_backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# Install dependencies
pip install django djangorestframework django-cors-headers psycopg2-binary

# Run migrations
python manage.py migrate

# (Optional) Create superuser
python manage.py createsuperuser

# (Optional) Seed database
python manage.py shell < sql/seed_concepts.sql
```

### Frontend Setup

```bash
cd skillvault_frontend
npm install
```

---

## 🏃 Running the Application

```bash
# Backend — available at http://127.0.0.1:8000
cd skillvault_backend && python manage.py runserver

# Frontend — available at http://localhost:5173
cd skillvault_frontend && npm run dev
```

---

## 🔌 API Endpoints

### Concepts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/concepts/` | List all concepts (paginated) |
| POST | `/api/concepts/` | Create a new concept |
| GET | `/api/concepts/{id}/` | Retrieve a concept |
| PUT | `/api/concepts/{id}/` | Update a concept |
| DELETE | `/api/concepts/{id}/` | Delete a concept |
| GET | `/api/concepts/search/?q=` | Full-text search |

### Tags
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tags/` | List all tags |

### Example

```bash
curl -X POST http://localhost:8000/api/concepts/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Hooks",
    "notes": "useState and useEffect are fundamental hooks",
    "tags": ["react", "javascript"]
  }'
```

---

## 💻 Development

```bash
# Backend
python manage.py makemigrations
python manage.py migrate
python manage.py shell

# Frontend
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # Lint
npm run test         # Run tests
npm run test:watch   # Watch mode
```

---

## 👤 Author

**Reetesh Tiwari**
[LinkedIn](https://linkedin.com/in/reeteshtiwari) · [GitHub](https://github.com/reetesh484)

---

## 📝 License

MIT License — open source and free to use.
