# Solution Document – CMS & Discovery Backend

## 1. Overview
This solution implements a backend system composed of two main services:

- **CMS (Content Management System)**:
  Internal system used by content editors to manage programs and their metadata.

- **Discovery**:
  Public-facing system that allows end users to browse and search published programs.

The two services are separated to ensure low coupling, clear responsibilities, and better scalability.

---

## 2. Architecture Design
- CMS and Discovery are implemented as separate NestJS applications.
- Both services communicate with the same PostgreSQL database (for this assignment).
- The design supports future extensions such as:
  - External search engines
  - Background import pipelines
  - Caching layers

---

## 3. Data Model
The main entities in the system are:

- **Program**
- **Episode**
- **Category**

Key relationships:
- A program can have multiple episodes.
- A program can belong to a category.

PostgreSQL was chosen due to its strong relational capabilities and built-in full-text search support.

---

## 4. Search Strategy
Search functionality is implemented using **PostgreSQL Full-Text Search**:

- A generated `tsvector` column is created from program `title` and `description`.
- A GIN index is applied on the `tsvector` column.
- Search queries use `tsquery` operators for efficient matching.

This approach provides good performance without introducing additional infrastructure.

---

## 5. API Design
### CMS APIs
- Provide CRUD operations for managing programs.
- Designed for internal usage with validation and clear request/response contracts.
- Pagination is applied to all listing endpoints.

### Discovery APIs
- Read-only APIs for public users.
- Return only published programs.
- Optimized for high read traffic and search operations.

---

## 6. Scalability Considerations
The system is designed with scalability in mind:

- Pagination to limit payload size.
- Database indexing for search and primary keys.
- Separation of read-heavy (Discovery) and write-heavy (CMS) workloads.
- Future improvements:
  - Redis caching
  - PostgreSQL read replicas
  - External search services (OpenSearch / Elasticsearch)

---

## 7. Challenges & Solutions
### Entity and Database Alignment
Ensuring that TypeORM entities match the existing PostgreSQL schema (UUIDs, timestamps, generated columns) required careful mapping.

### Search Performance
Instead of using `LIKE` queries, PostgreSQL Full-Text Search was chosen to provide better performance and scalability.

---

## 8. Future Improvements
- Import data from external sources (e.g., YouTube APIs).
- Background jobs for syncing content.
- Authentication and authorization for CMS users.
- Observability (logging, metrics, tracing).

---

## 9. Conclusion
This solution demonstrates a scalable, modular backend design that follows best practices in API design, data modeling, and system architecture.
