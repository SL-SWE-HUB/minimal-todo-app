# minimal-todo-app - Full Stack Todo App

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.2-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-Router-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![H2 Database](https://img.shields.io/badge/Database-H2-blue?style=for-the-badge&logo=h2&logoColor=white)

A robust full-stack application featuring a complete CRUD workflow with user authentication. Built using Spring Boot for the REST API and React for the frontend interface.

## Overview

Modern web application architecture that features dual modes of operation:
1.  **Authenticated Mode:** Users can register, log in, and manage their personal, persistent Todo list.
2.  **Guest Mode:** Visitors can test the UI and functionality using local state without creating an account.

> [!NOTE]
> Database: This application uses an in-memory H2 database. Data is reset when the backend application is restarted.

---

## Features

### Authentication & Security
* **User Registration & Login:** Full onboarding flow.
* **Session Management:** Secure, session-based authentication handling.
* **CORS Configuration:** Pre-configured secure communication between Frontend (`localhost:3000`) and Backend (`localhost:8080`).

### Todo Management (CRUD)
* **Create:** Add new tasks with titles and detailed descriptions.
* **Read:** View all tasks associated with the logged-in user.
* **Update:** Edit task details or toggle completion status.
* **Delete:** Remove tasks permanently.

### User Interface
* **Responsive Design:** Clean, centered layout using a max-width constraint.
* **Form Navigation:** Intuitive routing between Login, Register, and Dashboard views.
* **Guest Access:** "Try without logging in" feature for quick demos.

---

## Tech Stack

| Component | Technology | Version |
| :--- | :--- | :--- |
| **Backend Framework** | Spring Boot | 3.4.2 |
| **Security** | Spring Security | (Integrated) |
| **Data Access** | Spring Data JPA | (Integrated) |
| **Database** | H2 | In-Memory |
| **Language** | Java | 17 |
| **Frontend Library** | React | Latest |
| **Routing** | React Router | Latest |

---

## Installation Guide

### Prerequisites
Ensure you have the following installed on your machine:
* **Java 17** or higher
* **Node.js** (v14+) & **npm**
* **Git**


### Backend Setup 

1.**Navigate to the backend directory:**
```cd backend/todo-backend```

2.**Install dependencies (Maven):**
```mvn clean install```

3.**Run the Spring Boot application:**
```mvn spring-boot:run```

The backend will start on http://localhost:8080


### Frontend Setup 

1.**Navigate to the frontend directory:**
```cd frontend/todo-frontend```

2.**Install dependencies:**
```npm install```

3.**Start the development server:**
```npm start```

The frontend will open at http://localhost:3000
