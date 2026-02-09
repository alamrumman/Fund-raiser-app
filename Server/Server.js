require("dotenv").config();
const express = require("express");
const cors = require("cors");
const FundStats = require("./Models/FundStats");
const amountCalroutes = require("./Routes/AmountRoutes");
const hookroutes = require("./Routes/HookRoutes");
const connectDB = require("./Configs/dbconnection");
const transaction = require("./Models/Transaction");
const TransactionRoutes = require("./Routes/TransactionRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

/* ---------------- MIDDLEWARE ---------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fund-raiser-app-1.onrender.com", // frontend static site
    ],
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ---------------- DB ---------------- */
connectDB();

/* ---------------- API ROUTES ---------------- */
app.use("/api/amount", amountCalroutes);
app.use("/api/hooks", hookroutes);
app.use("/api/total", TransactionRoutes);

/* Payment status API (used by redirect page) */
app.get("/api/payment-status", async (req, res) => {
  try {
    const orderId  = req.query.orderId;
    if (!orderId) {
      return res.status(400).json({ status: "INVALID_REQUEST" });
    }

    const tx = await transaction.findOne({ orderId });
    if (!tx) {
      return res.status(404).json({ status: "NOT_FOUND" });
    }

    return res.json({ status: tx.status });
  } catch (err) {
    console.error("Payment status error:", err);
    return res.status(500).json({ status: "ERROR" });
  }
});
// GET total funds
app.get("/api/fund-stats", async (req, res) => {
  try {
    const stats = await FundStats.findById("GLOBAL_STATS").lean();

    res.json({
      totalAmount: stats?.totalAmount || 0,
      totalTransactions: stats?.totalTransactions || 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch stats" });
  }
});

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.send("✅ Backend API is running");
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
