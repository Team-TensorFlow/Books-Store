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