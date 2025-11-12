require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");           // 👈 Add this line
const connectDB = require("./config/db");
const app = express();

connectDB();

const isDev = process.env.NODE_ENV !== "production";

// ✅ Enable CORS before Helmet
app.use(
  cors({
    origin: isDev ? "http://localhost:5173" : "https://yourfrontenddomain.com",
    credentials: true,
  })
);

if (isDev) {
  // Relaxed CSP for local development
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: [
            "'self'",
            "http://localhost:5000",
            "http://localhost:5173",  // 👈 allow React frontend too
            "ws://localhost:5000",
            "http://127.0.0.1:9222",
            "http://localhost:9222",
            "https://chrome-devtools-frontend.appspot.com",
          ],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
        },
      },
    })
  );
} else {
  // Strict CSP for production
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
      },
    })
  );
}

app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
