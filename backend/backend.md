<div align="center">

#  Task Manager Backend API  
### Secure • Scalable • Production-Ready REST API

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-blue?logo=jsonwebtokens)
![Security](https://img.shields.io/badge/Security-Rate_Limited-red)
![Status](https://img.shields.io/badge/Status-Production_Ready-success)

A complete **Node.js + Express backend** featuring  
**JWT authentication**, **MongoDB integration**, and **secured task management APIs**.

</div>

---

## 📌 Project Overview

### 🎯 Task Objective
Build a **robust backend API** with:
- REST-based architecture  
- Clean code structure  
- Database integration  
- Full CRUD operations  
- Proper error handling  
- Bonus: Authentication & security  

### ✅ What This Project Delivers
✔ Secure Node.js & Express backend  
✔ MongoDB + Mongoose database integration  
✔ JWT-based authentication & protected routes  
✔ User-specific task management  
✔ Production-ready backend architecture  

---

## 🛠 Tech Stack

| Layer | Technology |
|------|------------|
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| Security | bcrypt, express-rate-limit |
| Environment | dotenv |
| Tools | Postman, VS Code |

---

## 🏗 Backend Architecture

![Backend Structure](screenshots/backendstructure.png)

*Clean and modular backend folder structure following separation of concerns.*
---

## 🗄 Database Design

### 👤 User Schema
- name (required)  
- email (unique, lowercase, trimmed)  
- password (bcrypt hashed)  
- timestamps  

### 📝 Task Schema
- title (required)  
- description  
- status (pending / in-progress / completed)  
- priority (low / medium / high)  
- dueDate  
- user (reference to User)  
- timestamps  

---

## 🔐 Authentication (Bonus Feature)

Authentication is implemented using **JWT**, despite being optional.

### ✅ Features Implemented
- User registration  
- User login  
- Password hashing (bcrypt)  
- JWT generation (7 days expiry)  
- Protected APIs  

### 🔑 Auth Endpoints
![🔑 Auth Endpoints](screenshots/AuthEndpoints.png)

---

## 📌 Task APIs (CRUD)

### ✅ Endpoints
![📌 Task APIs (CRUD)](screenshots/taskendpoints.png)

✅ All routes are JWT protected  
✅ Users can access only their own tasks  

---

## 🔁 API Response Examples

### ✅ Register User – POST /api/auth/register

**Request**
```json
{
    "name":"Satyam Kumar",
    "email":"satyamin@zohomail.in",
    "password":"Satyam@1234"
}
````

**Response (201)**

```json
{
    "_id": "6939507128efaf32dd488da2",
    "name": "Satyam Kumar",
    "email": "satyamin@zohomail.in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Mzk1MDcxMjhlZmFmMzJkZDQ4OGRhMiIsImlhdCI6MTc2NTM2MzgyNSwiZXhwIjoxNzY1OTY4NjI1fQ.Db_e0UHcRlprwJ-C4JsW7hC8NqSGFDtXR9wmJPOw5Ow"
}
```

---

### ✅ Login User – POST /api/auth/login

**Request**

```json
{
    "email":"satyamin@zohomail.in",
    "password":"Satyam@1234"
}
```

**Response (200)**

```json
{
    "_id": "69394c6428efaf32dd488d91",
    "name": "Satyam Kumar",
    "email": "satyamin@zohomail.in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Mzk0YzY0MjhlZmFmMzJkZDQ4OGQ5MSIsImlhdCI6MTc2NTM2MzE3OSwiZXhwIjoxNzY1OTY3OTc5fQ.AkadvW9FLPZyshxaw-twqxL6JY7PKacbMJZROJCnnUM"
}
```

---

### ✅ Create Task – POST /api/tasks

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request**

```json
{
  "title": "Finish Reaidy.io assignment",
  "description": "Complete full-stack app in 3 days",
  "priority": "high",
  "status": "pending"
}

```

**Response (201)**

```json
{
{
    "title": "Finish Reaidy.io assignment",
    "description": "Complete full-stack app in 3 days",
    "status": "pending",
    "priority": "high",
    "user": "69394c6428efaf32dd488d91",
    "_id": "69394e0d28efaf32dd488d99",
    "createdAt": "2025-12-10T10:40:13.022Z",
    "updatedAt": "2025-12-10T10:40:13.022Z",
    "__v": 0
}
```
### ✅ Get Task – GET /api/tasks

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
```


**Response (201)**

```json
[
    {
        "_id": "69394e0d28efaf32dd488d99",
        "title": "Finish Reaidy.io assignment",
        "description": "Complete full-stack app in 3 days",
        "status": "pending",
        "priority": "high",
        "user": "69394c6428efaf32dd488d91",
        "createdAt": "2025-12-10T10:40:13.022Z",
        "updatedAt": "2025-12-10T10:40:13.022Z",
        "__v": 0
    }
]
```

### ✅ Update Task – PUT /api/tasks/:id

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
```
**Request**

```json
{
  "title": "Finish Reaidy.io assignment",
  "description": "Complete full-stack app in 3 days",
  "priority": "low",
  "status": "pending"
}

```


**Response (201)**

```json
{
    "_id": "69394e0d28efaf32dd488d99",
    "title": "Finish Reaidy.io assignment",
    "description": "Complete full-stack app in 3 days",
    "status": "pending",
    "priority": "low",
    "user": "69394c6428efaf32dd488d91",
    "createdAt": "2025-12-10T10:40:13.022Z",
    "updatedAt": "2025-12-10T10:44:28.229Z",
    "__v": 0
}
```

### ✅ Delete Task – DELETE /api/tasks/:id

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
```


**Response (201)**

```json
{
    "message": "Task deleted successfully"
}
```

---

## ⚠ Validation & Error Handling

### ✅ Handled Scenarios

* Missing required fields
* Invalid credentials
* Unauthorized access
* Invalid resource IDs
* Server errors

### ✅ HTTP Status Codes

| Scenario     | Code |
| ------------ | ---- |
| Success      | 200  |
| Created      | 201  |
| Bad Request  | 400  |
| Unauthorized | 401  |
| Not Found    | 404  |
| Server Error | 500  |

---

## 🔒 Security Enhancements

✔ Strong password validation
✔ bcrypt hashing
✔ Login rate limiting
✔ Email normalization
✔ JWT-protected routes

---
## 🧪 API Testing (Postman)

### ✅ Register User – Success
![Register User](screenshots/register-user-success.jpeg)

*New user registered successfully and JWT token returned.*

---

### ❌ Register User – User Already Exists (400)
![Register User Already Exists](screenshots/user_exist.jpeg)

*Registration blocked when email already exists in database.*

---

### ✅ Login User – Success
![Login Success](screenshots/login-user-success.jpeg)

*Valid credentials return a JWT token.*

---

### ❌ Login User – Invalid Credentials (400)
![Invalid Login](screenshots/login-invalid-credentials-400.jpeg)

*Login rejected due to incorrect email or password.*

---

### ❌ Create Task Without Login (401)
![Unauthorized Task](screenshots/add-task-without-login.jpeg)

*Unauthorized request blocked because JWT token was missing.*

---

### ✅ Create Task – Authorized
![Create Task](screenshots/create-task.jpeg)

*Task created successfully for logged-in user.*

---

### ✅ Get Task – Authorized
![Get Task](screenshots/get-tasks.jpeg)

*Fetched only tasks belonging to authenticated user.*

---

### ✅ Password Stored as Hashed (bcrypt)
![Password Hashed](screenshots/password-hashed-bcrypt.jpeg)

*Passwords are securely stored using bcrypt hashing.*

---

### ✅ Update Task
![Update Task](screenshots/update-task.jpeg)

*Task details updated successfully.*

---

### ✅ Delete Task
![Delete Task](screenshots/delete-task.jpeg)

*Task deleted successfully from database.*

---


## ▶ Run Backend Locally

```bash
npm install
npm run dev
```

Server starts at:

```
http://localhost:5000
```



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