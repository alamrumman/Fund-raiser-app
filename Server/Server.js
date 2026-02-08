require("dotenv").config();
const express = require("express");
const cors = require("cors");

const amountCalroutes = require("./Routes/AmountRoutes");
const hookroutes = require("./Routes/HookRoutes");
const connectDB = require("./Configs/dbconnection");
const transaction = require("./Models/Transaction");

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

/* Payment status API (used by redirect page) */
app.get("/api/payment-status", async (req, res) => {
  try {
    const { orderId } = req.query;
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

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.send("✅ Backend API is running");
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
