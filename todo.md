# SkillVault Development Roadmap 🗺️

> **Philosophy:** Notes > CRUD | Editing > Submitting | Search > Navigation

---

## ✅ Phase 1 — Foundation & CRUD (COMPLETED)

**Status:** ✅ Complete
**Objective:** Build basic note management with modern UX patterns

### What Was Built

- [x] Django REST API with Concept & Tag models
- [x] React frontend with TypeScript
- [x] CRUD operations (Create, Read, Update, Delete)
- [x] Search functionality
- [x] Pagination with infinite scroll
- [x] Tag filtering and management
- [x] React Query for state management
- [x] React Window for list virtualization
- [x] Optimistic updates for deletions
- [x] Dark mode support
- [x] Responsive design with Tailwind CSS

**Key Achievement:** Solid foundation with modern tech stack ✨

---

## 🔴 Phase 2 — Authentication & User Management

**Status:** 🚧 Next Up**Objective:** Secure the app and enable multi-user support

> **Main Focus:** Session-based authentication (simple & secure)

### 2.1 Session Authentication (🎯 PRIMARY)

**Why:** Simple, secure, works great for web apps, built into Django
**Note:** Session-based authentication is secure for browser applications when implemented correctly, but it doesn’t scale well to stateless systems, non-browser clients, cross-domain APIs, or third-party access. JWTs address these architectural constraints and avoid CSRF by not relying on cookies, but they shift risk toward XSS since tokens are typically accessible to JavaScript.

#### Backend

- [x] Configure Django session authentication
- [x] User registration endpoint (`/api/auth/register/`)
- [x] Login endpoint (`/api/auth/login/`)
- [x] Logout endpoint (`/api/auth/logout/`)
- [x] Get current user endpoint (`/api/auth/me/`)
- [ ] Password reset flow
  - [ ] Request reset endpoint
  - [ ] Email with reset link
  - [ ] Reset password endpoint
- [ ] User model extensions
  - [ ] Profile fields (name, bio, avatar)
  - [ ] Preferences (theme, default view)
- [x] Protect API endpoints (by default all routes are protected via permission_class = isAuthenticated)
- [ ] Add user relationship to Concept model
  - [ ] Foreign key to User
  - [ ] Migration to add user field
- [ ] Filter concepts by authenticated user
- [x] Update serializers to include user context

#### Frontend

- [ ] Login page with form validation
  - [x] Email/username input
  - [ ] Password input with show/hide toggle
  - [ ] "Remember me" checkbox
  - [ ] Error handling
- [ ] Registration page
  - [x] Email validation
  - [ ] Password strength indicator
  - [x] Confirm password field
  - [ ] Terms & conditions checkbox
- [x] Session management
  - [x] Axios credentials configuration (`withCredentials: true`)
  - [x] CSRF token handling
  - [x] Session persistence
- [x] Protected routes
  - [x] Auth context/provider
  - [x] Redirect to login if unauthenticated
  - [x] Preserve redirect URL after login
- [ ] User profile page
  - [ ] View profile
  - [ ] Edit profile
  - [ ] Change password
- [x] Logout functionality
  - [x] Logout button in nav
  - [x] Clear local state
  - [x] Redirect to login
- [ ] Password reset UI
  - [ ] Forgot password link
  - [ ] Email input form
  - [ ] Reset confirmation page

#### Security

- [x] CSRF protection (Django default)
- [ ] Rate limiting on auth endpoints
  - [ ] Login attempts (5 per minute)
  - [ ] Registration (3 per hour)
  - [ ] Password reset (3 per hour)
- [ ] Secure password hashing (Django default with PBKDF2)
- [ ] Session security
  - [ ] HttpOnly cookies
  - [ ] Secure flag (HTTPS only)
  - [ ] SameSite=Lax
  - [ ] Session timeout (2 weeks)
- [ ] Environment variables for secrets
- [ ] Account lockout after failed attempts

---

### 2.2 JWT Authentication (⚪ OPTIONAL/ALTERNATIVE)

**Why:** Stateless, good for mobile apps and microservices
**Status:** ⏳ Optional Enhancement

#### Backend

- [ ] Install `djangorestframework-simplejwt`
- [ ] Configure JWT settings
  - [ ] Access token lifetime (5 min)
  - [ ] Refresh token lifetime (7 days)
  - [ ] Token rotation
- [ ] Token endpoints
  - [ ] `/api/auth/token/` - Get access/refresh tokens
  - [ ] `/api/auth/token/refresh/` - Refresh access token
  - [ ] `/api/auth/token/verify/` - Verify token validity
- [ ] JWT authentication class for views
- [ ] Protect API with JWT permissions

#### Frontend

- [ ] JWT token storage strategy
  - [ ] Option A: httpOnly cookies (more secure)
  - [ ] Option B: localStorage (simpler but less secure)
- [ ] Axios interceptors
  - [ ] Add Bearer token to requests
  - [ ] Refresh token on 401 response
  - [ ] Retry failed requests after refresh
- [ ] Token refresh logic
  - [ ] Background refresh before expiry
  - [ ] Handle refresh failures
- [ ] Logout (clear tokens)

#### Considerations

- ⚠️ More complex than sessions
- ⚠️ Requires client-side token management
- ✅ Better for mobile apps
- ✅ Scales horizontally easier

---

### 2.3 OAuth / BetterAuth (⚪ SIDE TASK)

**Why:** Social login convenience, modern auth patterns
**Status:** ⏳ Future Enhancement

#### Backend

- [ ] Choose OAuth provider
  - [ ] Google OAuth
  - [ ] GitHub OAuth
  - [ ] Discord OAuth (optional)
- [ ] Install `django-allauth` or `python-social-auth`
- [ ] Configure OAuth credentials
  - [ ] Get client ID/secret from providers
  - [ ] Set redirect URLs
- [ ] OAuth callback endpoints
- [ ] Link social accounts to existing users
- [ ] Handle OAuth errors

#### BetterAuth Integration (Alternative)

- [ ] Evaluate BetterAuth library
- [ ] Install and configure
- [ ] Set up authentication providers
- [ ] Implement BetterAuth UI components
- [ ] Handle authentication flows

#### Frontend

- [ ] "Sign in with Google" button
- [ ] "Sign in with GitHub" button
- [ ] OAuth callback handler
- [ ] Link/unlink social accounts in profile
- [ ] Handle OAuth errors gracefully

#### Considerations

- ⚠️ External dependency (Google, GitHub)
- ⚠️ Additional security surface
- ✅ Better user experience
- ✅ No password to remember

---

## 🔴 Phase 3 — Foundation Cleanup

**Status:** ⏳ Pending
**Objective:** Prepare codebase for rich note-taking experience

### Refactoring

- [ ] Remove traditional CRUD forms (after auth is done)
- [ ] Simplify concept creation (quick add)
- [ ] Update data models for content blocks
- [ ] Clean up unused routes
- [ ] Standardize error handling

### Infrastructure

- [ ] Set up proper logging
- [ ] Add monitoring/health checks
- [ ] Database backup strategy
- [ ] CI/CD pipeline basics

---

## 🟡 Phase 4 — Core Note-Taking UX (🔥 NEW FOCUS)

**Status:** ⏳ Pending**Objective:** Replace CRUD forms with **Notion-style note entry**

> **This is the heart of the product**

### Content Model (Frontend-First)

- [ ] Rich text editor implementation
  - [ ] Evaluate options: TipTap, Slate, Lexical, or ProseMirror
  - [ ] Block-based editing (paragraphs, headings, lists, code blocks)
  - [ ] Markdown shortcuts support (e.g., `#` for heading, `*` for lists)
  - [ ] Toolbar for formatting (bold, italic, links, etc.)
- [ ] Content structure redesign
  - [ ] Notes are no longer "title + textarea"
  - [ ] Support for multiple content blocks
  - [ ] Block reordering (drag & drop)

### Auto-Save Behavior

- [ ] Debounced auto-save (500ms-1s delay)
- [ ] Save indicator (saving... / saved)
- [ ] Network error handling
- [ ] Retry logic for failed saves
- [ ] Conflict detection (basic)

### Inline Editing

- [ ] No submit button
- [ ] Click to edit anywhere
- [ ] Cursor preservation on save
- [ ] Edit in place (no "edit page" navigation)
- [ ] Smooth transitions

### UX Principles to Enforce

- ✅ Typing never blocks
- ✅ Save is invisible
- ✅ Navigation never loses state
- ✅ Instant feedback

---

## 🟡 Phase 5 — Note Organization (Not CRUD Filters)

**Status:** ⏳ Pending
**Objective:** Think like a knowledge system, not a list app

### Organization Primitives

- [ ] **Tags** (already exist, now UX-first)
  - [ ] Inline tag editing (type `#tag`)
  - [ ] Tag autocomplete
  - [ ] Tag management page
  - [ ] Tag colors/icons
- [ ] **Pin / Favorite notes**
  - [ ] Toggle pin from note card
  - [ ] Pinned section at top
  - [ ] Persist pin state
- [ ] **Recently edited**
  - [ ] Track last modified timestamp
  - [ ] Sort by recency
  - [ ] Show "edited X minutes ago"
- [ ] **Soft folders / views** (not real folders)
  - [ ] Virtual collections based on queries
  - [ ] Custom views (user-defined filters)

### Views (Notion-Style Thinking)

> These are **queries**, not separate pages

- [ ] "All notes" view
  - [ ] Default landing page
  - [ ] Infinite scroll with virtualization
- [ ] "By tag" view
  - [ ] Group notes by tags
  - [ ] Collapsible tag sections
- [ ] "Recent" view
  - [ ] Last 7 days activity
  - [ ] Timeline visualization
- [ ] "Starred" view
  - [ ] Pinned/favorited notes only
  - [ ] Quick access

### Smart Filters

- [ ] Multiple tag selection (AND/OR logic)
- [ ] Date range filters
- [ ] Untagged notes view
- [ ] Archive/trash view

---

## 🟠 Phase 6 — Search That Feels Instant

**Status:** ⏳ Pending
**Objective:** Make search the primary navigation

### Global Search (Command Palette)

- [ ] **⌘K / Ctrl+K** shortcut
- [ ] Modal overlay with search input
- [ ] Real-time results (debounced)
- [ ] Keyboard navigation (arrow keys, Enter)
- [ ] Recent searches

### Search Scope

- [ ] Search across **title**
- [ ] Search across **body content**
- [ ] Search across **tags**
- [ ] Fuzzy matching
- [ ] Ranking/relevance scoring

### Search UX

- [ ] Highlight matches in results
- [ ] Show context snippets
- [ ] Empty state explanations ("No results for...")
- [ ] Search suggestions
- [ ] Filter search by tags/date

### UX Goals

- ✅ Search replaces navigation
- ✅ Zero friction
- ✅ Keyboard-first
- ✅ Feels instant (<100ms perceived latency)

### Backend

- [ ] Full-text search implementation (PostgreSQL FTS or Elasticsearch)
- [ ] Search indexing
- [ ] Query optimization
- [ ] Search analytics (popular queries)

---

## 🟠 Phase 7 — Note Linking & Knowledge Graph (Lightweight)

**Status:** ⏳ Pending
**Objective:** Add Notion-like power _without complexity_

### Linking Features

- [ ] `[[note title]]` style linking
  - [ ] Auto-complete note titles
  - [ ] Create new note from link
  - [ ] Link validation
- [ ] **Backlinks**
  - [ ] Show which notes link to current note
  - [ ] Backlinks section at bottom
  - [ ] Bidirectional link updates
- [ ] **Linked note preview**
  - [ ] Hover preview (popover)
  - [ ] Side panel preview option
  - [ ] Quick navigation to linked notes

### Data Model Updates

- [ ] Note links table (many-to-many)
- [ ] Link extraction from content
- [ ] Orphaned note detection
- [ ] Link integrity checks

### Important Constraints

- ❌ **No full graph visualization** (too complex)
- ✅ **Keep it textual and simple**
- ✅ Focus on usability over features

---

## 🟠 Phase 8 — Performance & Offline Thinking

**Status:** 🏗️ Partially Complete
**Objective:** Notes must feel instant, even at scale

### Frontend Performance

- [x] Aggressive caching (React Query) ✅
- [x] Virtualized lists (React Window) ✅
- [x] Optimistic updates for deletion ✅
- [ ] Optimistic updates for editing
- [ ] Service worker for offline support
- [ ] Local-first architecture (IndexedDB)
- [ ] Background sync

### Backend Performance

- [ ] Database indexes for search
- [ ] Query optimization (N+1 problem)
- [ ] Pagination improvements
- [ ] Read-heavy optimizations
  - [ ] Database read replicas
  - [ ] Query caching
- [ ] Evaluate if Redis is needed
  - [ ] Session caching
  - [ ] Search results caching

### Monitoring

- [ ] Frontend performance metrics (Web Vitals)
- [ ] API response time tracking
- [ ] Error rate monitoring
- [ ] User experience analytics

**Focus:** **Perceived performance**, not benchmarks

---

## 🟠 Phase 9 — Reliability & Trust

**Status:** ⏳ Pending
**Objective:** Users trust their notes

### Version History

- [ ] Basic version control for notes
- [ ] Show edit history
- [ ] Compare versions (diff view)
- [ ] Restore previous version
- [ ] Limit history (last 10 versions or 30 days)

### Data Safety

- [ ] **Soft delete** instead of hard delete
  - [ ] Deleted_at timestamp
  - [ ] Trash view
  - [ ] Auto-purge after 30 days
- [ ] **Restore deleted notes**
  - [ ] Restore from trash
  - [ ] Bulk restore
- [ ] **Conflict handling**
  - [ ] Last-write-wins strategy (for now)
  - [ ] Conflict detection UI
  - [ ] Manual merge option (future)

### Error Recovery

- [ ] Clear error messages
- [ ] Retry failed operations
- [ ] Offline queue for edits
- [ ] Data loss prevention warnings
- [ ] Export before destructive actions

### Backup & Recovery

- [ ] Automated database backups
- [ ] Point-in-time recovery
- [ ] User data export
- [ ] Import from backup

---

## 🔵 Phase 10 — Polish (Only After Core Is Solid)

**Status:** ⏳ Pending
**Objective:** Make the app delightful to use

### Keyboard Shortcuts

- [ ] Shortcut help modal (`?`)
- [ ] Global shortcuts (search, new note, etc.)
- [ ] Editor shortcuts (format, blocks)
- [ ] Navigation shortcuts
- [ ] Custom shortcut configuration

### Focus Mode

- [ ] Distraction-free writing mode
- [ ] Hide sidebar
- [ ] Fullscreen editor
- [ ] Typewriter scrolling
- [ ] Word count display

### Theming

- [x] Dark mode toggle ✅
- [ ] System theme preference
- [ ] Custom color schemes
- [ ] Font selection
- [ ] Editor width preferences

### Export & Import

- [ ] Export single note (Markdown)
- [ ] Export all notes (ZIP)
- [ ] Import from Markdown files
- [ ] Import from other apps (Notion, Evernote)
- [ ] PDF export

### Accessibility

- [ ] ARIA labels
- [ ] Keyboard navigation audit
- [ ] Screen reader testing
- [ ] Color contrast compliance (WCAG AA)
- [ ] Focus indicators

### Mobile Experience

- [ ] Responsive design improvements
- [ ] Touch gestures (swipe to delete)
- [ ] Mobile-optimized editor
- [ ] PWA capabilities
- [ ] Native app consideration

---

## 🧭 Guiding Principles

### Core Values

1. **Notes > CRUD** — This is a note-taking app, not a database UI
2. **Editing > Submitting** — Inline editing, auto-save, no forms
3. **Search > Navigation** — Find notes through search, not folders
4. **Derived state is read-only** — Don't fight the framework
5. **UX > Feature count** — Better to do 5 things well than 50 things poorly
6. **Simple data model, powerful interactions** — Complexity in UX, simplicity in data

### Technical Principles

- **Performance is a feature** — Fast apps feel better
- **Offline-first thinking** — Network should be optional
- **Progressive enhancement** — Core features work without JS
- **Accessibility is non-negotiable** — Everyone should be able to use this
- **Security by default** — Never trust user input

### Product Principles

- **Notion-inspired, not Notion-clone** — Learn from the best, don't copy
- **Keyboard-first** — Power users love keyboards
- **Beautiful defaults** — Should look good out of the box
- **Opinionated but flexible** — Strong defaults, allow customization
- **Trust through transparency** — Clear about what's happening with data

---

## 📊 Success Metrics

### Phase 1 (Foundation) — Success Criteria ✅

- [x] CRUD operations work smoothly
- [x] Search returns relevant results
- [x] Infinite scroll loads without jank
- [x] Tag filtering works instantly
- [x] List virtualization handles 1000+ items

### Phase 2 (Auth) — Success Criteria

- [ ] Users can register and login in <30 seconds
- [ ] Session persists across browser restarts
- [ ] Zero authentication bypasses
- [ ] Password reset works reliably
- [ ] Clear error messages for all auth failures

### Phase 4 (Core UX) — Success Criteria

- [ ] Users can create a note in <2 seconds
- [ ] Auto-save happens without user noticing
- [ ] Zero data loss reports
- [ ] Cursor never jumps during editing
- [ ] Editor loads in <200ms

### Phase 6 (Search) — Success Criteria

- [ ] Search results appear in <100ms
- [ ] 90%+ of navigation happens through search
- [ ] Users find notes on first search attempt

### Phase 8 (Performance) — Success Criteria

- [ ] App loads in <1s on 3G
- [ ] Virtualized list handles 10,000+ notes smoothly
- [ ] Optimistic updates feel instant

### Phase 9 (Trust) — Success Criteria

- [ ] Zero data loss incidents
- [ ] Users feel confident trying new features
- [ ] Clear recovery path for all errors

---

## 🎯 Current Sprint Focus

### This Week (Phase 2 - Session Auth)

- [ ] Set up Django session authentication
- [ ] Create user registration endpoint
- [ ] Build login/logout endpoints
- [ ] Add user relationship to Concept model
- [ ] Create login UI with form validation

### Next Week (Phase 2 - Session Auth Continued)

- [ ] Registration page with validation
- [ ] Protected routes and auth context
- [ ] User profile page
- [ ] Password reset flow
- [ ] Security hardening (rate limiting, session config)

### Following Sprint (Phase 3 - Foundation Cleanup)

- [ ] Refactor CRUD forms
- [ ] Set up logging and monitoring
- [ ] Plan content model for rich text

---

## 📝 Notes & Decisions

### Architecture Decisions

- **Why Session Auth first?** Simpler, more secure for web apps, built into Django, easier to debug
- **Why JWT as optional?** Good for mobile/API-first apps, but adds complexity we don't need yet
- **Why OAuth last?** Nice-to-have, external dependencies, can add later without breaking changes
- **Why React Query?** Built-in caching, optimistic updates, perfect for our needs
- **Why React Window?** Performance at scale without complexity
- **Why not full offline mode yet?** Core UX first, then enhancement

### Deferred Decisions

- [ ] Mobile app (native vs PWA)
- [ ] Collaboration features
- [ ] AI-powered features
- [ ] End-to-end encryption
- [ ] Public note sharing

### Rejected Ideas

- ❌ Real-time collaboration (too complex for v1)
- ❌ Full graph visualization (diminishing returns)
- ❌ Folder-based organization (goes against product vision)
- ❌ Rich media embedding (scope creep)

---

## 🔗 Resources

### Documentation

- [Django REST Framework Auth](https://www.django-rest-framework.org/api-guide/authentication/)
- [React Query Docs](https://tanstack.com/query/latest)
- [TipTap Editor](https://tiptap.dev/)
- [Web Vitals](https://web.dev/vitals/)

### Inspiration

- Notion (note-taking UX)
- Obsidian (linking & knowledge graph)
- Linear (keyboard shortcuts & speed)
- Superhuman (command palette)

---

**Last Updated:** December 30, 2025
**Current Phase:** 🔴 Phase 2 — Authentication (Session Auth Focus)
**Previous Phase:** ✅ Phase 1 — Foundation & CRUD (Complete)
**Next Milestone:** Secure multi-user support with session-based authentication
