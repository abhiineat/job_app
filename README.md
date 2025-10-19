# JobApp Backend

**JobApp** is a backend API for a Job & Internship platform built with **Node.js, Express, PostgreSQL, Prisma, Redis, Kafka, and Docker**.  
It supports user authentication, job postings, real-time notifications, and caching for optimized performance.

---

## 🛠️ Tech Stack

- **Backend:** Node.js + Express
- **Database:** PostgreSQL (Dockerized) + Prisma ORM
- **Caching:** Redis (Dockerized)
- **Message Queue:** Kafka + Zookeeper (Dockerized)
- **Authentication:** JWT + bcrypt
- **Containerization:** Docker & Docker Compose

---

## 🚀 Features

### 1. Users
- Signup / login with JWT authentication
- Passwords hashed using bcrypt
- Profile management

### 2. Jobs
- Create, read, update, delete jobs
- Search & filter jobs
- User-specific job management

### 3. Real-time Notifications
- Kafka producers/consumers handle async events
- Example: job application notifications

### 4. Caching
- Redis caches frequently accessed job listings
- Reduces database load

### 5. Dockerized
- All services (Postgres, Redis, Kafka, Zookeeper, Node.js API) run in containers
- One `docker-compose.yml` to start the full stack


