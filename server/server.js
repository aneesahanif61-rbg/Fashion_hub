import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import webhookRouter from "./routes/webhookRoutes.js";

dotenv.config();

const app = express();

// Database connection
connectDB();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Clerk middleware
app.use(clerkMiddleware());

// Webhook route (raw body required)
app.use(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  webhookRouter
);

// JSON middleware
app.use(express.json());

// User routes
app.use("/api/users", userRouter);

// Home route
app.get("/", (req, res) => {
  res.send("Dooch By Shaima API is running");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
