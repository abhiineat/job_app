# JobApp Backend

**JobApp Backend** is a production-ready backend API for a Job & Internship platform built with **Node.js, Express, PostgreSQL, Prisma, Redis, Kafka, and Docker**.

The application is deployed on **AWS EC2**, uses **AWS RDS (PostgreSQL)** for persistence, and **Upstash Redis** for caching. Kafka is used for asynchronous event processing in development and is feature-flagged in production.

---

## 🛠️ Tech Stack

- **Backend:** Node.js + Express
- **Database:** PostgreSQL (AWS RDS) + Prisma ORM
- **Caching:** Redis (Upstash – managed, TLS-enabled)
- **Message Queue:** Kafka + Zookeeper (development only)
- **Authentication:** JWT + bcrypt
- **Containerization:** Docker & Docker Compose
- **Cloud:** AWS EC2, AWS RDS

---

## 🚀 Features

### 1. Authentication
- User signup & login using JWT
- Secure password hashing with bcrypt
- Protected routes using middleware

### 2. Job Management
- Create, read, update, delete job postings
- Search and filter jobs
- User-specific job ownership

### 3. Caching (Redis)
- Frequently accessed job listings cached in Redis
- Reduced database load and improved response time
- Managed Redis via Upstash with TLS

### 4. Event-driven Architecture (Kafka)
- Kafka producers and consumers for async workflows
- Example use case: job-related notifications
- Kafka is disabled in production using environment flags

### 5. Production Deployment
- Dockerized Node.js backend
- Deployed on AWS EC2
- PostgreSQL hosted on AWS RDS
- Redis hosted on Upstash
- Secure networking using AWS Security Groups

---

## 🌍 Live API

The backend is deployed on **AWS EC2** and is publicly accessible.

**Base URL**
http://13.234.240.210:5000/

