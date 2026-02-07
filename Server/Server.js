require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const amountCalroutes = require("./Routes/AmountRoutes");
const hookroutes = require("./Routes/HookRoutes");
const connectDB = require("./Configs/dbconnection");
const transaction = require("./Models/Transaction"); 

const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fund-raiser-app-1.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB
connectDB();

// API ROUTES — MUST COME FIRST
app.use("/api/amount", amountCalroutes);
app.use("/api/hooks", hookroutes);

// Payment status API (USED BY REDIRECT PAGE)
app.get("/api/payment-status", async (req, res) => {
  const tx = await transaction.findOne({ orderId: req.query.orderId });
  if (!tx) return res.status(404).json({ status: "NOT_FOUND" });
  res.json({ status: tx.status });
});

// SERVE FRONTEND BUILD
app.use(express.static(path.join(__dirname, "dist")));

// SPA FALLBACK — MUST BE LAST
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
