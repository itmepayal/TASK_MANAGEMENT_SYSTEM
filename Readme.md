# 📈 Task Management REST API

## 📌 Overview

A scalable and production-ready Task Management REST API built using Node.js, Express.js, MongoDB, and TypeScript.

This backend system is designed to help teams and organizations efficiently manage tasks, assignments, productivity workflows, and collaboration.

The API follows a modular and scalable architecture with support for authentication, role-based access control, task lifecycle management, advanced querying, pagination, filtering, file attachments, and production-level error handling.

---

# 🚀 Live Demo

## Swagger API Documentation

[https://task-management-system-backend-19c4.onrender.com/api/docs](https://task-management-system-backend-19c4.onrender.com/api/docs)

---

# ✨ Features

## 🔐 Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Access Control (Admin & Manager)
- Password Hashing with bcrypt

---

## ✅ Task Management Features

- Create Tasks
- Update Tasks
- Delete Tasks
- Toggle Task Completion
- Assign Tasks to Users
- Task Progress Tracking
- Checklist Management
- File Attachments
- Task Priorities
- Due Dates
- Tags Support

---

## 📄 Advanced API Features

- Server-side Pagination
- Filtering
- Sorting
- Search Support
- MongoDB Indexing
- Virtual Fields
- Pre-save Middleware
- Centralized Error Handling
- Scalable Folder Structure

---

## ⚡ Production-Level Features

- Swagger API Documentation
- Environment-Based Configuration
- Optimized MongoDB Queries
- Clean Architecture
- Modular Code Structure
- Secure Password Storage
- API Response Standardization

---

# 🏗️ Tech Stack

| Layer             | Technology          |
| ----------------- | ------------------- |
| Runtime           | Node.js             |
| Backend Framework | Express.js          |
| Language          | TypeScript          |
| Database          | MongoDB             |
| ODM               | Mongoose            |
| Authentication    | JWT                 |
| Password Hashing  | bcryptjs            |
| API Documentation | Swagger             |
| File Upload       | Multer + Cloudinary |
| Deployment        | Render              |

---

# 📁 Project Structure

```bash
src/
│
├── app/
├── config/
├── middleware/
├── models/
├── modules/
├── routes/
├── utils/
├── constants/
├── services/
├── validations/
│
└── server.ts
```

---

# 🧩 Database Models

# 👤 User Model

## Fields

| Field      | Type    | Description          |
| ---------- | ------- | -------------------- |
| name       | String  | User full name       |
| email      | String  | Unique email address |
| password   | String  | Hashed password      |
| avatar     | Object  | Profile image        |
| role       | String  | admin / manager      |
| isVerified | Boolean | Verification status  |
| createdAt  | Date    | Created timestamp    |
| updatedAt  | Date    | Updated timestamp    |

---

## User Features

- Password Hashing
- Password Comparison Method
- Email Validation
- Role Management
- Avatar Support
- MongoDB Indexes
- Virtual Fields

---

# ✅ Task Model

## Fields

| Field          | Type       | Description               |
| -------------- | ---------- | ------------------------- |
| text           | String     | Task title                |
| description    | String     | Detailed task description |
| completed      | Boolean    | Task completion status    |
| priority       | String     | low / medium / high       |
| progress       | Number     | Task progress percentage  |
| dueDate        | Date       | Task deadline             |
| tags           | Array      | Task tags                 |
| assignedTo     | ObjectId[] | Assigned users            |
| createdBy      | ObjectId   | Task creator              |
| attachments    | Array      | Uploaded files            |
| todoCheckLists | Array      | Checklist items           |
| createdAt      | Date       | Created timestamp         |
| updatedAt      | Date       | Updated timestamp         |

---

# 📎 Attachment Schema

| Field    | Type   |
| -------- | ------ |
| url      | String |
| publicId | String |
| fileName | String |
| fileType | String |
| fileSize | Number |

---

# ☑️ Checklist Schema

| Field     | Type    |
| --------- | ------- |
| title     | String  |
| completed | Boolean |

---

# ⚡ Mongoose Features Used

## Indexes

```ts
TaskSchema.index({ createdAt: -1 });
TaskSchema.index({ completed: 1 });
TaskSchema.index({ priority: 1 });
TaskSchema.index({ dueDate: 1 });
TaskSchema.index({ assignedTo: 1 });
```

---

## Pre-save Middleware

Automatically calculates task progress using checklist completion percentage.

```ts
if (task.todoCheckLists?.length > 0) {
  const completedItems = task.todoCheckLists.filter(
    (item: any) => item.completed,
  ).length;

  task.progress = Math.round(
    (completedItems / task.todoCheckLists.length) * 100,
  );
}
```

---

## Virtual Fields

### isOverdue

Checks whether a task deadline has passed.

```ts
return task.dueDate && task.dueDate < new Date() && !task.completed;
```

---

# 🔑 Authentication APIs

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/auth/register | Register User    |
| POST   | /api/auth/login    | Login User       |
| GET    | /api/auth/profile  | Get Current User |
| POST   | /api/auth/logout   | Logout User      |

---

# 📋 Task APIs

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | /api/tasks            | Create Task        |
| GET    | /api/tasks            | Get All Tasks      |
| GET    | /api/tasks/:id        | Get Single Task    |
| PATCH  | /api/tasks/:id        | Update Task        |
| PATCH  | /api/tasks/:id/toggle | Toggle Task Status |
| DELETE | /api/tasks/:id        | Delete Task        |

---

# 🔎 Query Features

## Pagination

```bash
/api/tasks?page=1&limit=10
```

---

## Filtering

```bash
/api/tasks?completed=true
```

```bash
/api/tasks?priority=high
```

---

## Sorting

```bash
/api/tasks?sort=-createdAt
```

---

## Search

```bash
/api/tasks?search=meeting
```

---

# 📦 Standard API Response

## Success Response

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

---

# 🛡️ Security Features

- Password Hashing
- JWT Authentication
- Protected Routes
- Role-Based Access Control
- Environment Variables
- Input Validation
- Centralized Error Handling
- MongoDB Injection Protection
- Rate Limiting
- Helmet Security Headers
- CORS Configuration

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/task-manager
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# 📥 Installation

## 1. Clone Repository

```bash
git clone https://github.com/itmepayal/TASK_MANAGEMENT_SYSTEM_BACKEND.git
```

---

## 2. Navigate to Project

```bash
cd TASK_MANAGEMENT_SYSTEM_BACKEND
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start Development Server

```bash
npm run dev
```

---

# ▶️ Local Development URLs

## API Base URL

```bash
http://localhost:8000
```

---

## Swagger Documentation

```bash
http://localhost:8000/api/docs
```

---

# ☁️ Deployment

## Hosted On

Render

---

## Production API

[https://task-management-system-backend-19c4.onrender.com](https://task-management-system-backend-19c4.onrender.com)

---

# 🧪 Future Improvements

- Redis Caching
- Real-Time Notifications
- Socket.IO Integration
- Email Notifications
- Docker Support
- CI/CD Pipeline
- Unit & Integration Testing
- Queue Jobs with BullMQ
- Activity Logs
- Audit Trails
- Multi-Tenant Architecture
- Team Workspaces

---

# 📊 Resume Highlights

## Key Backend Concepts Demonstrated

- REST API Design
- Scalable Backend Architecture
- Authentication & Authorization
- MongoDB Schema Design
- Mongoose Middleware
- Error Handling
- Pagination & Filtering
- File Upload Management
- Secure Password Storage
- Production Deployment
- API Documentation
- Performance Optimization

---

# 👨‍💻 Author

## Payal Yadav

Backend Developer | MERN Stack Developer

GitHub:
[https://github.com/itmepayal](https://github.com/itmepayal)

---

# 📄 License

This project is licensed under the MIT License.
