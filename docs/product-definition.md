# Case Management System — Product Requirements Document (MVP)

## Working Product Name: Casevia

---

## 1. Overview

### 1.1 Purpose
Casevia is a full-stack internal platform designed to manage incoming service requests ("cases"), track their lifecycle, and provide visibility into operational workload and performance.

The system allows users to:
- create and manage cases
- assign responsibility
- track progress and communication
- filter and search cases
- view high-level operational metrics

---

### 1.2 Problem Statement
Organizations often handle requests through:
- email
- chat tools
- spreadsheets
- ad-hoc systems

This leads to:
- lost or forgotten requests
- unclear ownership
- lack of visibility
- inconsistent handling
- no measurable performance data

Casevia solves this by providing:
- structured case tracking
- clear ownership and status
- centralized communication
- searchable history
- basic analytics

---

### 1.3 Target Users

Primary:
- Support agents
- IT staff
- Operations teams

Secondary:
- Managers
- Admin users

---

### 1.4 MVP Scope

Includes:
- case lifecycle management
- comments and collaboration
- filtering and search
- dashboard insights
- basic role-based access

Excludes:
- file uploads
- notifications
- real-time updates
- integrations
- advanced analytics

---

## 2. Core Concepts

---

### 2.1 Case
A case represents a single request, issue, or task that needs to be handled.

Examples:
- "User cannot access SharePoint site"
- "VPN login fails"
- "Permissions not applied after update"

Each case:
- has an owner
- moves through statuses
- may include comments
- has priority and category
- is tracked over time

---

### 2.2 Case Lifecycle
A case progresses through predefined states:

- New  
- InProgress  
- WaitingForCustomer  
- Resolved  
- Closed  

---

### 2.3 Priority

- Low  
- Medium  
- High  
- Critical  

---

### 2.4 Category

- Access  
- Permissions  
- Bug  
- Hardware  
- Software  
- Account  
- Other  

---

### 2.5 Roles

- Admin  
- Agent  
- Viewer  

---

## 3. Features (MVP)

---

### 3.1 Authentication
- email + password login
- JWT-based authentication (implemented after core features)

---

### 3.2 Case Management

Users can:
- create cases
- view case list
- open case details
- update case fields

Editable fields:
- status
- priority
- category
- assignee
- description

---

### 3.3 Comments

Users can:
- add comments to a case
- view a chronological comment thread

---

### 3.4 Filtering and Search

Users can filter cases by:
- status
- priority
- category
- assignee

Users can:
- search by keyword (title/description)

---

### 3.5 Dashboard

Displays:
- total open cases
- cases assigned to current user
- critical cases
- recently resolved cases

---

### 3.6 User Management (Basic)

Admin users can:
- view users
- create users
- assign roles

---

## 4. Application Pages

---

- Login Page  
- Dashboard Page  
- Cases List Page  
- Case Details Page  
- Create Case Page / Modal  
- Admin Users Page  

---

## 5. Data Model (MVP)

---

### User
- Id  
- FirstName  
- LastName  
- Email  
- PasswordHash  
- Role  
- Team  
- CreatedAt  

---

### Customer
- Id  
- Name  
- Email  
- CompanyName  
- PhoneNumber  
- CreatedAt  

---

### Case
- Id  
- Title  
- Description  
- Status  
- Priority  
- Category  
- CustomerId  
- AssignedUserId  
- CreatedByUserId  
- CreatedAt  
- UpdatedAt  
- DueDate  

---

### Comment
- Id  
- CaseId  
- UserId  
- Content  
- CreatedAt  

---

## 6. API Design (High-Level)

---

### Cases
- GET /api/cases  
- GET /api/cases/{id}  
- POST /api/cases  
- PUT /api/cases/{id}  

---

### Comments
- POST /api/cases/{id}/comments  

---

### Users
- GET /api/users  
- POST /api/users  

---

### Customers
- GET /api/customers  

---

### Dashboard
- GET /api/dashboard/summary  

---

### Auth (later phase)
- POST /api/auth/login  

---

## 7. UI/UX Principles

---

- clean and structured layout  
- data-first design  
- minimal clutter  
- clear hierarchy  
- consistent use of badges and labels  

---

## 8. Non-Goals (MVP)

---

The MVP will NOT include:
- file attachments  
- real-time updates  
- notifications system  
- external integrations  
- advanced reporting  
- mobile application  

---

## 9. Testing Strategy

---

### Unit Tests
- test business logic in services
- validate case creation, updates, and assignments

### Integration Tests
- test API endpoints with database
- verify request/response behavior

### Manual Testing
- Swagger for backend
- UI flows for frontend

---

## 10. Success Criteria

---

The MVP is successful if:

- users can log in  
- cases can be created, viewed, and updated  
- comments can be added  
- filtering and search work  
- dashboard shows meaningful data  
- UI is clean and usable  
- codebase is well structured  

---

## 11. Future Enhancements

---

- audit log / activity timeline  
- SLA tracking  
- notifications  
- file attachments  
- advanced dashboards and charts  
- role-based UI restrictions  
- pagination and performance improvements  

---

## 12. Engineering Considerations

---

### Backend
- ASP.NET Core Web API  
- Entity Framework Core  
- layered architecture (Controllers → Services → Data)  

### Frontend
- React + TypeScript  
- component-based structure  
- separation of API and UI logic  

### Authentication
- JWT tokens  
- stored in local storage  
- attached to API requests  

---

## 13. Final Notes

---

This project is designed to:
- reflect real-world internal systems  
- demonstrate backend architecture skills  
- showcase frontend data handling and UI design  
- serve as a strong portfolio project for .NET + React roles  

---
