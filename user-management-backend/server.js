require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

connectDB();

const isDev = process.env.NODE_ENV !== "production";

// IMPORTANT: Body parsers MUST come BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Serve uploaded profile images
app.use("/uploads", express.static("uploads"));

if (isDev) {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
} else {
  app.use(helmet());
}

// Register routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
