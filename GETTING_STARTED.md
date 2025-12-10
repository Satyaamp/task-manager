# 🚀 QUICK SETUP

## 🔹 1. BACKEND

### ✅ Prerequisites

* Node.js (v16 or higher recommended)
* MongoDB (local or cloud)
* Git installed

---

### ✅ Setup & Run

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/Satyaamp/task-manager
cd task-manager
```

#### 2️⃣ Install backend dependencies

```bash
cd backend
npm install
```

#### 3️⃣ Setup environment variables

Create the `.env` file using the example:

```bash
cp .env.example .env
```

* Example:

  ![.env](backend/screenshots/env.png)

* Create a strong JWT secret:

  ![jwt-secret](backend/screenshots/createstrongjwtsecretkey.png)

👉 Update all required values inside the `.env` file.

---

#### 4️⃣ Start the server

```bash
npm run dev
```

✅ Backend runs at:

```
http://localhost:5000
```

---

### ✅ Using the APIs

1. Register a user → `POST /api/auth/register`
2. Login → `POST /api/auth/login`
3. Copy the JWT token
4. Use the token in request headers:

```
Authorization: Bearer <JWT_TOKEN>
```

---

### ✅ Endpoints

**Auth Routes**

![AUTH ROUTES](backend/screenshots/AuthEndpoints.png)

---

5️⃣ Access Task APIs:

```
/api/tasks
```

**Task APIs (CRUD)**

![📌 Task APIs (CRUD)](backend/screenshots/taskendpoints.png)

---

### ✅ Notes

* Authentication is required for all Task APIs
* Passwords are securely stored using **bcrypt**
* Unauthorized requests are blocked

---

⭐ This project demonstrates **clean backend architecture, authentication and security best practices**.

---

<br><br><br>

## 🔹 2. FRONTEND

🚧 *Frontend implementation coming soon*

---

<br><br>

## 👥 Developer

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/Satyaamp.png" width="100"><br>
      <strong>Satyam Kumar</strong><br>
      <a href="https://github.com/Satyaamp">@Satyaamp</a>
    </td>
  </tr>
</table>

---

<div align="center">

### ⭐ Built with clean code, security & scalability in mind

</div>

---


