# Books Store Web Application

A full-featured Express.js web application equipped with automated continuous integration (CI) and continuous deployment (CD) via GitHub Actions, containerized using Docker, and hosted live on an Ubuntu VPS.

---

## Live Demo

* **Live Web Application:** [http://103.191.241.109](http://103.191.241.109)
* **Server Port:** `80` (HTTP) mapped internally to container port `3000`

---

## Tech Stack

* **Backend:** Node.js (v22), Express.js
* **Containerization:** Docker
* **API Testing:** Postman & Newman CLI
* **CI/CD Pipeline:** GitHub Actions
* **Hosting / VPS:** Ubuntu 24.04 LTS (Root Access via SSH Keys)
* **Version Control:** Git & GitHub

---

## Project Structure

```text
Books-Store/
├── .github/
│   └── workflows/
│       └── ci.yml                                       # GitHub Actions CI/CD Pipeline
├── postman/
│   ├── collection.json                                  # Postman test collection
│   └── environments/
│       └── Books-Store Server.postman_environment.json  # Environment variables for Newman
├── app.js                                               # Main Express.js server application
├── Dockerfile                                           # Docker build configuration
├── package.json                                         # Node.js dependencies and scripts
└── README.md                                            # Project documentation
```

---

## API Documentation (Faheem's Module - Books API)

This section documents how to use the Books API, specifically detailing the expected inputs (Expectation) versus the JSON responses (Output) returned by the server, as per Lab 03 requirements.

### 1. Create a Book (ADD NEW RECORD)
* **Endpoint:** `POST /api/books`
* **How to use:** Send a JSON payload containing the book's details. `title`, `author`, and `price` are required.
* **Expectation (Input):**
  ```json
  {
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "price": 29.99,
    "genre": "Software Engineering",
    "published_year": 2008
  }
  ```
* **Output (201 Created):**
  ```json
  {
    "success": true,
    "message": "Book created successfully",
    "data": {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "price": "29.99",
      "genre": "Software Engineering",
      "published_year": 2008,
      "created_at": "2026-08-15T16:38:52.000Z",
      "updated_at": "2026-08-15T16:38:52.000Z"
    }
  }
  ```

### 2. Get All Books (READ ALL)
* **Endpoint:** `GET /api/books`
* **How to use:** Simply send a GET request to retrieve all books in the database.
* **Expectation (Input):** `None` (No payload required)
* **Output (200 OK):**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "id": 1,
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "price": "29.99",
        "genre": "Software Engineering",
        "published_year": 2008,
        "created_at": "2026-08-15T16:38:52.000Z",
        "updated_at": "2026-08-15T16:38:52.000Z"
      }
    ]
  }
  ```

### 3. Get Book by ID (READ BY ID)
* **Endpoint:** `GET /api/books/:id`
* **How to use:** Pass the book's unique `id` in the URL parameter.
* **Expectation (Input):** `GET /api/books/1`
* **Output (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "price": "29.99",
      "genre": "Software Engineering",
      "published_year": 2008
    }
  }
  ```

### 4. Update a Book (EDIT RECORD)
* **Endpoint:** `PUT /api/books/:id`
* **How to use:** Pass the book's `id` in the URL, and send a JSON payload with only the fields you wish to update.
* **Expectation (Input to `/api/books/1`):**
  ```json
  {
    "price": 34.99
  }
  ```
* **Output (200 OK):**
  ```json
  {
    "success": true,
    "message": "Book updated successfully",
    "data": {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "price": 34.99,
      "genre": "Software Engineering",
      "published_year": 2008
    }
  }
  ```

### 5. Delete a Book (REMOVE RECORD)
* **Endpoint:** `DELETE /api/books/:id`
* **How to use:** Pass the book's `id` in the URL to permanently delete it from the database.
* **Expectation (Input):** `DELETE /api/books/1`
* **Output (200 OK):**
  ```json
  {
    "success": true,
    "message": "Book with ID 1 successfully deleted"
  }
  ```