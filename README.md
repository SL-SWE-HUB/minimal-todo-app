# minimal-todo-app

A minimal full‑stack Todo application demonstrating session‑based user authentication and a simple CRUD workflow. Intended for local development, demos, and learning how a Spring Boot REST API integrates with a React frontend.

> Note: The backend uses an in‑memory H2 database by default — data is lost when the backend restarts.


## Tech stack
- Backend: Java 17, Spring Boot 3.4.2 (spring-boot-starter-web, spring-boot-starter-data-jpa)
- Security: Spring Security (session-based)
- Database: H2 (in-memory by default)
- Frontend: React (Create React App) + React Router
- Build: Maven (wrapper included) for backend; npm for frontend


## Contents
```
backend/todo-backend/      # Spring Boot application (Maven project)
frontend/todo-frontend/    # React application (Create React App)
README.md                  # This file
```

## Features
- User registration and login (session-based authentication)
- Per-user Todo CRUD (create, read, update, delete)
- Guest/demo mode (frontend-only, local state)
- CORS configured for local development (frontend on http://localhost:3000 → backend on http://localhost:8080)


## Quickstart (development)
Prerequisites:
- Java 17+
- Node.js 14+ and npm (Node >=16 recommended)
- Git

1) Clone
```bash
git clone https://github.com/SL-SWE-HUB/minimal-todo-app.git
cd minimal-todo-app
```

2) Start the backend (terminal A)
```bash
cd backend/todo-backend
# Preferred: use the Maven wrapper included in repo
./mvnw spring-boot:run
# Or if you have Maven installed
mvn spring-boot:run
```
Backend: http://localhost:8080

3) Start the frontend (terminal B)
```bash
cd frontend/todo-frontend
npm install
npm start
```
Frontend: http://localhost:3000


## Run tests
- Backend:
```bash
cd backend/todo-backend
./mvnw test
```
- Frontend:
```bash
cd frontend/todo-frontend
npm test
```


## Build / Production
1) Backend package and run
```bash
cd backend/todo-backend
./mvnw clean package
java -jar target/*.jar
```

2) Frontend production build
```bash
cd frontend/todo-frontend
npm install
npm run build
# Deploy the build/ folder to static hosting or serve it from your backend (requires extra setup)
```

Notes:
- The application is configured for local development using H2 in-memory DB. To persist data between restarts, configure a persistent datasource by setting `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` in `application.properties` or via environment variables (Postgres/MySQL, etc.).
- Prefer the provided Maven wrapper (`./mvnw`) to avoid local Maven version differences.


## API (developer notes)
The backend exposes REST endpoints for authentication and todo operations. The controllers and request mappings live under `backend/todo-backend/src/main/java` (look for `controller` or `web` packages). Add API examples (curl, request/response bodies, or Swagger/OpenAPI) here if you plan to share the API with other developers or automated clients.


## Development tips
- If CORS prevents requests during development, check the backend's CORS configuration and the browser console for blocked requests.
- To use a persistent H2 file rather than in-memory, update the JDBC URL to use a file path.
- If you want to serve the frontend from the backend in production, build the frontend and configure Spring Boot to serve static resources from the `build/` output.


## Contributing
Contributions are welcome. Please open issues or PRs. If you expect outside contributors, add a `CONTRIBUTING.md` with workflow and code-style guidelines.


## License
Add a LICENSE file (for example, MIT) to clarify reuse permissions.


---

If you want, I can also:
- Add a brief API reference (endpoints + example curl requests) by scanning the backend controllers.
- Draft a CONTRIBUTING.md and/or LICENSE file.
- Add a Dockerfile and docker-compose.yml for local development (with an option for Postgres to persist data).
