🧑‍💼 User Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing users with role-based access control (RBAC).

👑 Admins can add, edit, or delete any user.
👨‍💼 Employees can view & update their own profile.

The project includes:

Authentication (JWT)

Authorization (Admin/Employee)

Profile page

CRUD operations

Clean UI with Bootstrap

REST API integration

🚀 Tech Stack
Layer	Technology
Frontend	React + Vite + Bootstrap
Backend	Node.js + Express
Database	MongoDB (Mongoose ODM)
Authentication	JSON Web Tokens (JWT)
Password Security	Bcrypt
🧭 Project Structure

<img> src=<img width="440" height="365" alt="image" src="https://github.com/user-attachments/assets/e677d614-22bd-439c-a9d5-f8bbf479cd8b" />



⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/rohit5900/user-management-system.git
cd user-management-system

🗄️ Backend Setup
cd user-management-backend
npm install

Create .env file:
MONGO_URI=mongo link
JWT_SECRET=yourSecretKey
NODE_ENV=development

Start backend server:
npm run dev


Backend will run at:

👉 http://localhost:5000

🎨 Frontend Setup
cd ../user-management-frontend
npm install
npm run dev


Frontend will run at:

👉 http://localhost:5173

🔑 Default Admin Login

After backend starts, manually create an admin using Thunder Client / Postman:

POST → http://localhost:5000/auth/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin@123",
  "role": "admin"
}


Then log in on frontend:

Email: admin@example.com

Password: Admin@123

🧠 Features
🔐 Authentication & Security

JWT-based login

Bcrypt password hashing

Protected routes (frontend + backend)

👑 Admin Features

Add Users

Edit Users

Delete Users

View All Users

Admin Dashboard with analytics

Notifications

👨‍💼 Employee Features

View profile

Update profile

Upload profile photo

Mark attendance

View attendance history

🎨 UI Features

Responsive design with Bootstrap

Dark mode toggle

Clean dashboard UI

Recharts analytics

🧩 API Endpoints
Auth Routes
Method	Endpoint	Description	Access
POST	/auth/register	Register new user	Public
POST	/auth/login	Login user	Public
POST	/auth/change-password	Change password	Authenticated
User Routes
Method	Endpoint	Description	Access
GET	/users	Fetch all users	Admin
PUT	/users/:id	Update user	Admin
DELETE	/users/:id	Delete user	Admin
GET	/users/me	Get current user profile	Authenticated
PUT	/users/me	Update profile	Authenticated
POST	/users/upload-photo	Upload profile picture	Authenticated
Attendance Routes
Method	Endpoint	Description	Access
POST	/attendance/mark	Mark attendance	Authenticated
GET	/attendance/me	Get attendance history	Authenticated
GET	/attendance	All attendance records	Admin
📷 Screenshots (Optional)

You can add the following:

Page	Screenshot
Login Page	(add image link)
Admin Dashboard	(add image link)
Manage Users	(add image link)
Profile Page	(add image link)

Upload images to:
/user-management-frontend/assets/
or GitHub’s built-in image uploader.

🧰 Tools Used

VS Code + Thunder Client

MongoDB Compass

Vite Dev Server

Git & GitHub

🧾 License

This project is open-source under the MIT License.
Feel free to use, modify, and contribute.

👤 Author

Rohit Swami
📧 swamirohit11215@gmail.com

🔗 GitHub: https://github.com/rohit5900

⭐ Support

If you like this project, please star the repo ⭐ on GitHub — it motivates me to build more!
