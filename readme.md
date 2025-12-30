# SkillVault 🚀

A full-stack web application for managing and organizing learning concepts with tags. Built with Django REST Framework and React with TypeScript.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Testing](#testing)

## ✨ Features

- **Concept Management**: Create, read, update, and delete learning concepts
- **Tagging System**: Organize concepts with multiple tags
- **Infinite Scroll**: Efficient loading with React Window virtualization
- **Search & Filter**: Filter concepts by tags
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes
- **Optimistic Updates**: Instant UI feedback with React Query
- **Authentication**: User authentication system (in progress)

## 🛠 Tech Stack

### Backend

- **Django 5.2.8** - Python web framework
- **Django REST Framework** - RESTful API toolkit
- **PostgreSQL/SQLite** - Database
- **CORS Headers** - Cross-origin resource sharing

### Frontend

- **React 19.2** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Query (TanStack Query)** - Server state management
- **React Router** - Client-side routing
- **React Window** - List virtualization for performance
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Re-usable components
- **Axios** - HTTP client
- **Vitest** - Unit testing
- **Testing Library** - React component testing

## 📁 Project Structure

```
SkillVault/
├── skillvault_backend/
│   ├── manage.py
│   ├── authentication/          # User authentication app
│   ├── concepts/                # Main concepts app
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

## 📦 Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **npm or yarn**
- **pip**

## 🚀 Installation

### Backend Setup

1. Navigate to the backend directory:

```bash
cd skillvault_backend
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate     # On Windows
```

3. Install dependencies:

```bash
pip install django djangorestframework django-cors-headers
```

4. Run migrations:

```bash
python manage.py migrate
```

5. Create a superuser (optional):

```bash
python manage.py createsuperuser
```

6. Seed the database (optional):

```bash
python manage.py shell < sql/seed_concepts.sql
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd skillvault_frontend
```

2. Install dependencies:

```bash
npm install
```

## 🏃 Running the Application

### Start the Backend

```bash
cd skillvault_backend
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000`

### Start the Frontend

```bash
cd skillvault_frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔌 API Endpoints

### Concepts

- `GET /api/concepts/` - List all concepts (paginated)
  - Query params: `?search=<query>&tags=<tag1,tag2>&page=<num>`
- `POST /api/concepts/` - Create a new concept
- `GET /api/concepts/{id}/` - Retrieve a specific concept
- `PUT /api/concepts/{id}/` - Update a concept
- `DELETE /api/concepts/{id}/` - Delete a concept

### Tags

- `GET /api/tags/` - List all tags

### Example Request

```bash
curl -X POST http://localhost:8000/api/concepts/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Hooks",
    "notes": "useState and useEffect are fundamental hooks",
    "tags": ["react", "javascript"]
  }'
```

## 💻 Development

### Backend Development

- **Admin Panel**: Access at `http://127.0.0.1:8000/admin`
- **Django Shell**: `python manage.py shell`
- **Create Migrations**: `python manage.py makemigrations`
- **Apply Migrations**: `python manage.py migrate`

### Frontend Development

- **Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Preview Production Build**: `npm run preview`
- **Lint Code**: `npm run lint`

### Code Style

- Backend: Follow PEP 8 Python style guide
- Frontend: ESLint configuration included

## 🧪 Testing

### Frontend Tests

```bash
cd skillvault_frontend
npm run test          # Run tests once
npm run test:watch    # Run tests in watch mode
```

## 🎨 Key Features Implementation

### Virtualized List

Uses `react-window` for efficient rendering of large lists of concepts.

### Infinite Scroll

Automatic loading of more concepts as user scrolls.

### Tag Filtering

Click tags to filter concepts, with visual feedback for active filters.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Reetesh Tiwari**

## 🙏 Acknowledgments

- Shadcn/ui for beautiful component library
- TanStack Query for excellent data fetching
- React Window for performance optimization
