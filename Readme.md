# 🧑‍💼 User Management System

A **full-stack MERN (MongoDB, Express, React, Node.js)** application for managing users with **role-based access control**.

Admins can add, edit, and delete users, while employees can view and edit their own profiles.  
The project demonstrates authentication, authorization, and CRUD functionality with clean UI and REST API integration.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Vite + Bootstrap |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (JSON Web Token) |
| Authorization | Role-based (Admin / Employee) |

---

## 🧭 Project Structure

user-management-project/
├── user-management/ # Backend (Express + MongoDB)
│ ├── server.js
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── config/
│ ├── package.json
│ └── .env.example
│
├── user-management-frontend/ # Frontend (React + Vite)
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/user-management-system.git
cd user-management-system

2️⃣ Backend Setup
cd user-management
npm install


Create a .env file:

MONGO_URI=mongodb://127.0.0.1:27017/user-management
JWT_SECRET=yourSecretKey


Then run the server:

npm run dev


Backend will run on:
➡️ http://localhost:5000

3️⃣ Frontend Setup
cd ../user-management-frontend
npm install
npm run dev


Frontend will run on:
➡️ http://localhost:5173

🔑 Default Admin Login

After backend starts, create an admin account using Thunder Client or Postman:

POST → http://localhost:5000/auth/register

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin@123",
  "role": "admin"
}


Then log in on the frontend with:

Email: admin@example.com

Password: Admin@123

🧠 Features

✅ User Registration & Login (JWT-based)
✅ Role-based Access Control
✅ Admin Dashboard (Add / Edit / Delete users)
✅ Employee Dashboard (View own info)
✅ Secure Authentication using Bcrypt
✅ MongoDB Integration via Mongoose
✅ Responsive UI with Bootstrap
✅ Protected Frontend Routes

🧩 API Endpoints
Method	Endpoint	Description	Access
POST	/auth/register	Register new user	Public
POST	/auth/login	Login user	Public
GET	/users	Fetch all users	Admin
PUT	/users/:id	Update user	Admin
DELETE	/users/:id	Delete user	Admin
📷 Screenshots

Add screenshots of:

Login Page

Admin Dashboard

Manage Users Page

(You can upload images in your GitHub repo’s /assets folder and reference them here.)

🧰 Tools Used

VS Code + Thunder Client

MongoDB Compass

Vite Development Server

Git + GitHub

🧾 License

This project is open-source under the MIT License — feel free to use and modify.

💬 Author

👤 Rohit Swami
📧 swamirohit11215@gmail.com
]
🔗 https://github.com/rohit5900

⭐ If you like this project, give it a star on GitHub to show support!