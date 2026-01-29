<p align="center">
  <a href="https://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  Backend technical assignment implementing CMS and Discovery services using
  <a href="https://nestjs.com/" target="_blank">NestJS</a> and
  <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-v11-red" alt="NestJS" />
  <img src="https://img.shields.io/badge/PostgreSQL-FTS-blue" alt="Postgres FTS" />
  <img src="https://img.shields.io/badge/Swagger-OpenAPI-green" alt="Swagger" />
</p>

---

## 📌 Description

This project is a **backend technical assignment** that implements two main components:

### 🛠 CMS (Content Management System)
An internal system used by editors or administrators to:
- Create and update programs (podcasts / documentaries)
- Manage metadata such as:
  - Title
  - Description
  - Category
  - Language
  - Duration
  - Publish date
- Control program publishing state

### 🔍 Discovery
A public-facing service that allows users to:
- Browse published programs
- View program details
- Search programs efficiently using **PostgreSQL Full-Text Search**

The solution is built using **NestJS**, **TypeScript**, and **PostgreSQL**, and follows clean architecture principles with clear module boundaries.

---

## 🧱 Architecture Overview

- CMS and Discovery are implemented as **separate NestJS applications**
- Low coupling between internal (CMS) and public (Discovery) systems
- Shared PostgreSQL database (for simplicity in this assignment)
- Design supports future scalability:
  - Caching (Redis)
  - Read replicas
  - External search engines (e.g. OpenSearch / Elasticsearch)

---

## 🧪 How to Test the Assignment (Step by Step)

This section explains **exactly how to run and test the CMS and Discovery services**.

---

### 1️⃣ Start the infrastructure (PostgreSQL)

Ensure PostgreSQL is running.

If using Docker:
```bash
docker compose up -d
