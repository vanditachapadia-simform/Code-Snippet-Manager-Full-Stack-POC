# 📘 Code Snippet Manager – Full Stack POC

A full-stack application for creating, managing, and sharing code snippets. Built with modern technologies: **Angular**, **NestJS**, **Prisma**, and **PostgreSQL**. Includes reusable components, Swagger API documentation, clipboard sharing, search/filter UI, and complete logging on both frontend and backend.

---

## 🧱 Tech Stack Overview

| Layer      | Tools & Libraries                                     |
|------------|--------------------------------------------------------|
| **Frontend** | Angular, Bootstrap, NGX Logger, CDK Clipboard         |
| **Backend**  | NestJS, Prisma ORM, Swagger, Middleware Logger       |
| **Database** | PostgreSQL (via Docker Compose)                      |
| **Dev Tools**| Docker, GitHub Copilot Code Snippet Manager          |

---

 
---

## 🔙 Backend Features (NestJS + Prisma)

- ✅ NestJS RESTful API structure
- ✅ Prisma ORM with schema/model definition
- ✅ Swagger documentation for all endpoints at `/api`
- ✅ Middleware for logging all HTTP requests
- ✅ CRUD operations for Snippets
- ✅ Connected to PostgreSQL via Prisma

---

## 🌐 Frontend Features (Angular)

- ✅ Bootstrap for UI styling
- ✅ NGX Logger for client-side logging
- ✅ `BaseFormComponent`: Reusable reactive form component with validation
- ✅ `BaseTableComponent`: Reusable component with pagination, search, and sorting
- ✅ **Copy to Clipboard** feature using Angular CDK
- ✅ **Share Snippet** feature that copies URL to clipboard
- ✅ Extendable via inheritance to any form/table in the app

---

## 🛠️ Core Functionalities

| Feature           | Description                                         |
|-------------------|-----------------------------------------------------|
| Snippet CRUD      | Create, Read, Update, Delete code snippets          |
| Copy to Clipboard | One-click copy of snippet content                   |
| Shareable Link    | Generate and copy direct URL to snippet             |
| Dynamic Forms     | Configurable forms via reusable base component      |
| Smart Tables      | Paginated, sortable, searchable UI tables           |
| API Integration   | Angular services connecting to NestJS backend       |
| Swagger UI        | Auto-generated docs using decorators                |

---

## 🔐 Prisma Snippet Model (example)

```prisma
model Snippet {
  id        Int      @id @default(autoincrement())
  title     String
  language  String
  content   String
  createdAt DateTime @default(now())
}



