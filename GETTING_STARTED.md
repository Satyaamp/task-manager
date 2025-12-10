# 🚀 QUICK SETUP

# 1. BACKEND

### ✅ Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or cloud)
- Git installed
---

### ✅ Setup & Run

1️⃣ Clone the repository
```bash
git clone https://github.com/Satyaamp/task-manager
cd task-manager
````

2️⃣ Install backend dependencies

```bash
cd backend
npm install
```

3️⃣ Setup environment variables
Create `.env` using example:

```bash
cp .env.example .env
```

Update values inside `.env`.

4️⃣ Start the server

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
4. Use token in header:

```
Authorization: Bearer <JWT_TOKEN>
```
### ✅ Endpoints
![ AUTH ROUTES](backend/screenshots/AuthEndpoints.png)


5. Access task APIs:

```
/api/tasks
```
### ✅ Endpoints
![📌 Task APIs (CRUD)](backend/screenshots/taskendpoints.png)

---

### ✅ Notes

* Authentication is required for all task APIs
* Passwords are stored securely using bcrypt
* Unauthorized requests are blocked

---

⭐ This project demonstrates **clean backend architecture, authentication and security best practices**.

---
<br><br><br>

# 2. FRONTEND

