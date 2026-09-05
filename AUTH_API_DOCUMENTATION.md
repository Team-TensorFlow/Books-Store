# LAB 05 — Authentication & Authorization API Documentation

## Overview
This document describes the Authentication and Authorization endpoints added to the **JU CSE Books Store** API. The system uses **JWT (JSON Web Tokens)** for authentication and **Role-Based Access Control (RBAC)** for authorization.

**Base URL:** `http://localhost:3000`

---

## Table of Contents
1. [User Registration](#1-user-registration)
2. [User Login](#2-user-login)
3. [Protected Endpoints](#3-protected-endpoints)
4. [Role-Based Access Control](#4-role-based-access-control)
5. [Error Responses](#5-error-responses)

---

## 1. User Registration

### `POST /api/auth/register`

Creates a new user account. Passwords are hashed using **bcrypt** before being stored in the database.

**Request Headers:**
| Header       | Value            |
|-------------|------------------|
| Content-Type | application/json |

**Request Body:**
| Field    | Type   | Required | Description                        |
|----------|--------|----------|------------------------------------|
| name     | string | Yes      | Full name of the user              |
| email    | string | Yes      | Email address (must be unique)     |
| password | string | Yes      | Plain-text password (will be hashed) |
| role     | string | No       | `"user"` (default) or `"admin"`    |

### Sample Request
```json
POST /api/auth/register
Content-Type: application/json

{
  "name": "Faheem",
  "email": "faheem@example.com",
  "password": "mypassword123",
  "role": "admin"
}
```

### Sample Response — Success (201)
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Faheem",
    "email": "faheem@example.com",
    "role": "admin",
    "created_at": "2026-09-05T14:30:00.000Z",
    "updated_at": "2026-09-05T14:30:00.000Z"
  }
}
```

### Sample Response — Validation Error (400)
```json
{
  "error": "Name, email, and password are required"
}
```

### Sample Response — Duplicate Email (409)
```json
{
  "error": "User with this email already exists"
}
```

---

## 2. User Login

### `POST /api/auth/login`

Authenticates a user and returns a **JWT token** valid for 1 hour.

**Request Headers:**
| Header       | Value            |
|-------------|------------------|
| Content-Type | application/json |

**Request Body:**
| Field    | Type   | Required | Description       |
|----------|--------|----------|-------------------|
| email    | string | Yes      | Registered email  |
| password | string | Yes      | Account password  |

### Sample Request
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "faheem@example.com",
  "password": "mypassword123"
}
```

### Sample Response — Success (200)
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYWhlZW1AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjU1NDk4MDAsImV4cCI6MTcyNTU1MzQwMH0.abc123",
  "user": {
    "id": 1,
    "name": "Faheem",
    "email": "faheem@example.com",
    "role": "admin",
    "created_at": "2026-09-05T14:30:00.000Z",
    "updated_at": "2026-09-05T14:30:00.000Z"
  }
}
```

### Sample Response — Invalid Credentials (401)
```json
{
  "error": "Invalid email or password"
}
```

### Sample Response — Missing Fields (400)
```json
{
  "error": "Email and password are required"
}
```

---

## 3. Protected Endpoints

After logging in, include the JWT token in the `Authorization` header for all protected requests.

**Authorization Header Format:**
```
Authorization: Bearer <your_jwt_token>
```

### Access Levels by Endpoint

| Method | Endpoint            | Auth Required | Role Required | Description          |
|--------|---------------------|---------------|---------------|----------------------|
| GET    | /api/books          | ❌ No          | —             | Get all books        |
| GET    | /api/books/:id      | ❌ No          | —             | Get book by ID       |
| POST   | /api/books          | ✅ Yes         | admin         | Create a book        |
| PUT    | /api/books/:id      | ✅ Yes         | admin         | Update a book        |
| DELETE | /api/books/:id      | ✅ Yes         | admin         | Delete a book        |
| GET    | /api/authors        | ❌ No          | —             | Get all authors      |
| GET    | /api/authors/:id    | ❌ No          | —             | Get author by ID     |
| POST   | /api/authors        | ✅ Yes         | admin         | Create an author     |
| PUT    | /api/authors/:id    | ✅ Yes         | admin         | Update an author     |
| DELETE | /api/authors/:id    | ✅ Yes         | admin         | Delete an author     |
| GET    | /api/orders         | ✅ Yes         | user or admin | Get all orders       |
| GET    | /api/orders/:id     | ✅ Yes         | user or admin | Get order by ID      |
| POST   | /api/orders         | ✅ Yes         | user or admin | Create an order      |

### Sample: Admin Creating a Book (Protected)
```json
POST /api/books
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 29.99,
  "genre": "Software Engineering",
  "published_year": 2008
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "price": 29.99,
    "genre": "Software Engineering",
    "published_year": 2008,
    "created_at": "2026-09-05T14:35:00.000Z",
    "updated_at": "2026-09-05T14:35:00.000Z"
  }
}
```

---

## 4. Role-Based Access Control

### Roles
| Role    | Description                                              |
|---------|----------------------------------------------------------|
| `user`  | Default role. Can view books/authors and manage orders.  |
| `admin` | Can do everything a user can, plus create/update/delete books and authors. |

### Sample: Regular User Denied Access (403)
```json
POST /api/books
Content-Type: application/json
Authorization: Bearer <regular_user_token>

{
  "title": "Unauthorized Book",
  "author": "Should Fail",
  "price": 5
}
```

**Response (403):**
```json
{
  "error": "Access denied. You do not have permission to perform this action."
}
```

---

## 5. Error Responses

### Missing Token (401)
Occurs when making a request to a protected endpoint without an `Authorization` header.
```json
{
  "error": "Access denied. No token provided or invalid format."
}
```

### Invalid / Expired Token (401)
Occurs when the provided JWT token is malformed, tampered with, or expired.
```json
{
  "error": "Invalid or expired token."
}
```

### Forbidden — Insufficient Role (403)
Occurs when a logged-in user tries to access an endpoint that requires a higher role.
```json
{
  "error": "Access denied. You do not have permission to perform this action."
}
```

---

## Technologies Used
| Package          | Purpose                              |
|------------------|--------------------------------------|
| `bcrypt`         | Hashing passwords before storage     |
| `jsonwebtoken`   | Generating and verifying JWT tokens  |
| `dotenv`         | Managing environment variables       |

---

## How to Test with Newman (CLI)
```bash
npx newman run postman/Auth_Lab_Tests.postman_collection.json
```

## How to Test with Postman (GUI)
1. Import `postman/Auth_Lab_Tests.postman_collection.json` into Postman
2. Run the collection in order — it automatically saves tokens as variables
3. Review test results for each of the 13 test cases
