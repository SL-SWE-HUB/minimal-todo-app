## 📝 MinTodoApp

 A full-stack To-Do List web application built with **Spring Boot** (Java) for the backend and **React** for the frontend. The app supports user registration, login, and authenticated CRUD operations on personal todo items.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Overview](#api-overview)
- [Authentication Details](#authentication-details)
- [Common Issues & Debugging Tips](#common-issues--debugging-tips)
- [Future Enhancements](#future-enhancements)

---

## Features

- 🔐 User registration & login with session-based authentication
- ➕ Add, edit, delete personal todos
- 📦 RESTful API endpoints
- ⚙️ Role-based access control (future support)
- 🌐 CORS & CSRF handling for secure cross-origin requests

---

## Tech Stack

#### Backend
- Java 17+
- Spring Boot
- Spring Security
- Spring Data JPA (Hibernate)
- H2 (in-memory DB for development)
- Maven

#### Frontend
- JavaScript (ES6+)
- React
- Axios (HTTP requests)
- React Router
- Context API / useState/useEffect Hooks
- Vite or Create React App (project scaffolding & dev server)

---

## Architecture

```text
Frontend (React) <--> Backend (Spring Boot API) <--> Database (H2)
        |                           |
   Axios HTTP                Spring Security
     Calls                    (Session Auth)
```

---

## Getting Started

## Backend Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/MinTodoApp.git
   cd MinTodoApp/backend
   ```

2. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

3. App runs at `http://localhost:8080`

## Frontend Setup

1. Go to frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000`

---

## API Overview

| Method | Endpoint                  | Description                   |
|--------|---------------------------|-------------------------------|
| POST   | `/todo/register`          | Register new user             |
| POST   | `/todo/login`             | Log in user (sets session)    |
| GET    | `/todo/user/{id}`         | Get todos for user ID         |
| POST   | `/todo/create`            | Add new todo for current user |
| DELETE | `/todo/delete/{id}`       | Delete a todo by ID           |

---

## Authentication Details

- Uses Spring Security session-based authentication (`JSESSIONID`)
- After login, cookies should include `JSESSIONID` automatically
- Backend checks the session for authentication status via `SecurityContextHolder`

### Security Config Highlights

- `HttpSessionSecurityContextRepository` is used to persist login sessions.
- All endpoints are open during development for testing:
  ```java
  .authorizeHttpRequests(auth -> auth
      .requestMatchers(HttpMethod.POST, "/**").permitAll()
      ...
  )
  ```

---

## Common Issues & Debugging Tips

- **403 Forbidden** or **401 Unauthorized**:
  - Make sure cookies are sent with Axios requests:
    ```js
    axios.defaults.withCredentials = true;
    ```
  - Verify backend has:
    ```java
    .csrf(csrf -> csrf.disable()) // for development
    .cors(cors -> cors.configurationSource(corsConfigurationSource))
    ```

- **SecurityContext is null**:
  - Ensure login endpoint sets authentication properly.
  - Ensure your `SecurityFilterChain` includes:
    ```java
    .securityContext(securityContext -> securityContext
      .securityContextRepository(new HttpSessionSecurityContextRepository())
    );
    ```

- **User is anonymous despite login**:
  - Double-check login credentials are correct.
  - Check if browser stores and sends `JSESSIONID` cookie.

---

## Future Enhancements

- 🛡 Add role-based security (e.g., admin)
- 🧪 Unit + integration tests
- 🗄 Switch to PostgreSQL or MySQL
- 📱 Responsive UI with better UX
- 📦 Docker containerization for full-stack deployment
