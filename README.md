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

## API Documentation

The following API endpoints have been implemented for Lab 03:

### 1. Create a Book
* **Endpoint:** `POST /api/books`
* **Sample Payload:**
  ```json
  {
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "price": 29.99,
    "genre": "Software Engineering",
    "published_year": 2008
  }
  ```
* **Success Response:** `201 Created`

### 2. Get All Books
* **Endpoint:** `GET /api/books`
* **Success Response:** `200 OK` (Returns an array of books)

### 3. Get Book by ID
* **Endpoint:** `GET /api/books/:id`
* **Success Response:** `200 OK` (Returns single book object) or `404 Not Found`

### 4. Update a Book
* **Endpoint:** `PUT /api/books/:id`
* **Sample Payload:**
  ```json
  {
    "price": 34.99
  }
  ```
* **Success Response:** `200 OK`

### 5. Delete a Book
* **Endpoint:** `DELETE /api/books/:id`
* **Success Response:** `200 OK`