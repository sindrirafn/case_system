# Case Management System — MVP Roadmap

## Working Product Name: Casevia

---

## Purpose of this document

This document outlines the step-by-step roadmap for building the MVP of this project.

The goal is to:
- stay focused and avoid overengineering early
- build features in a logical order
- avoid getting stuck polishing UI too early
- introduce testing at the right time (not just at the end)

This is not meant to be a strict timeline, but rather a structured build order from start to MVP.

---

## Ground Rules (Important)

Before starting, a few rules I want to follow while building this:

1. Do not spend time polishing UI before the backend feature works.
2. Every endpoint must be manually tested (Swagger/Postman) before moving on.
3. Testing is introduced early and expanded gradually — not left until the end.
4. Stick to MVP scope — no extra features before core functionality is complete.
5. When stuck, simplify instead of redesigning everything.

---

## Phase 1 — Project Setup

- Create repository structure
- Create backend (.NET Web API project)
- Create frontend (React + TypeScript project)
- Add README, LICENSE, and .gitignore
- Add product definition document
- Add this roadmap document

---

## Phase 2 — Backend Foundation

- Clean default template files
- Create folder structure:
  - Controllers
  - Models
  - DTOs
  - Services
  - Data
- Install required packages:
  - Entity Framework Core
  - SQLite provider
- Create base models:
  - User
  - Customer
  - Case
  - Comment
- Create AppDbContext
- Configure database connection
- Register DbContext in Program.cs
- Create first migration
- Create database
- Confirm application runs successfully

---

## Phase 3 — Seed Data

- Add seed data logic
- Seed:
  - Users
  - Customers
  - Cases
  - Comments
- Verify data exists and looks realistic

---

## Phase 4 — Read-Only API

- Implement GET /api/cases
- Test in Swagger
- Implement GET /api/cases/{id}
- Test in Swagger
- Implement GET /api/users
- Test in Swagger
- Implement GET /api/customers
- Test in Swagger

---

## Phase 5 — Filtering and Search

- Add filtering to cases endpoint:
  - status
  - priority
  - category
  - assigned user
- Add keyword search (title/description)
- Test combinations in Swagger

---

## Phase 6 — Initial Testing Setup

- Create test project
- Set up xUnit
- Add basic unit tests for case-related logic
- Add at least one integration test for API endpoint
- Ensure tests run successfully before continuing

---

## Phase 7 — Write Operations

- Implement POST /api/cases
- Test manually
- Implement PUT /api/cases/{id}
- Test manually
- Implement POST /api/cases/{id}/comments
- Test manually
- Expand unit tests where relevant
- Add/update integration tests for core flows

---

## Phase 8 — Dashboard Backend

- Implement GET /api/dashboard/summary
- Test endpoint manually
- Add tests if logic is non-trivial

---

## Phase 9 — Frontend Foundation

- Set up React project structure
- Set up routing
- Create API layer
- Create layout components
- Create placeholder pages
- Verify frontend can communicate with backend

---

## Phase 10 — Cases List UI

- Build cases list page
- Fetch and display real data
- Add search input
- Add filter controls
- Connect filters to API
- Test behavior manually

---

## Phase 11 — Case Details UI

- Build case details page
- Display all case metadata
- Display comments
- Add controls for:
  - status
  - priority
  - assignee
- Add comment form
- Test full flow manually

---

## Phase 12 — Create Case UI

- Build create case form
- Add validation
- Connect to backend
- Redirect to created case
- Test manually

---

## Phase 13 — Dashboard UI

- Build dashboard page
- Add stat cards
- Connect to summary endpoint
- Verify data accuracy

---

## Phase 14 — Authentication

- Implement login endpoint (backend)
- Add password hashing
- Add JWT generation
- Test authentication manually
- Build login page (frontend)
- Store token
- Attach token to API requests
- Protect routes
- Add basic role-based UI behavior

---

## Phase 15 — Final Testing & Polish

- Add missing unit tests for core services
- Add a few additional integration tests
- Test all major flows end-to-end
- Add:
  - loading states
  - empty states
  - error handling
- Improve UI consistency (spacing, layout, clarity)

---

## Phase 16 — Portfolio Readiness

- Clean up code and structure
- Improve README:
  - project overview
  - tech stack
  - features
- Add screenshots
- Add notes about architecture
- Add testing summary
- Final review of repository

---

## Definition of MVP Complete

The MVP is considered complete when:

- Cases can be created, viewed, and updated
- Comments work correctly
- Filtering and search work
- Dashboard displays meaningful data
- Authentication is functional
- Core logic has basic automated tests
- The application is usable and reasonably polished

---

## Final Note

The goal of this project is not just to “build something that works”, but to:

- follow a structured development process
- demonstrate backend and frontend understanding
- show awareness of testing and architecture
- create a strong, realistic portfolio project

---