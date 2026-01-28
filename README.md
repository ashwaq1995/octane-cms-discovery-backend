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
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://github.com/nestjs/nest/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  </a>
  <img src="https://img.shields.io/badge/PostgreSQL-FTS-blue" alt="Postgres FTS" />
  <img src="https://img.shields.io/badge/Swagger-OpenAPI-green" alt="Swagger" />
</p>

---

## Description

This project is a **backend technical assignment** that implements two main components:

- **CMS (Content Management System)**
  Internal system used by editors/admins to create, update, and manage programs and their metadata.

- **Discovery**
  Public-facing system that allows users to browse and search published programs efficiently.

The solution is built with **NestJS**, **TypeScript**, and **PostgreSQL**, and uses **PostgreSQL Full-Text Search** for scalable search functionality.

---

## Architecture Overview

- CMS and Discovery are implemented as **separate services/apps**
- Clear module boundaries with **low coupling**
- Both services connect to the same PostgreSQL database (for this assignment)
- Design supports future scalability (caching, read replicas, external search engines)
