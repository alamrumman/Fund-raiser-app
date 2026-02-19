require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const FundStats = require("./Models/FundStats");
const amountCalroutes = require("./Routes/AmountRoutes");
const hookroutes = require("./Routes/HookRoutes");
const connectDB = require("./Configs/dbconnection");
const Transaction = require("./Models/Transaction");
const TransactionRoutes = require("./Routes/TransactionRoutes");
const sigRoutes = require("./Routes/sigroutes");
const createticketRoutes = require("./Routes/createTicket");
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
app.use("/api/cloudinary", sigRoutes);
app.use("/api/ticket", createticketRoutes);

/* Payment status API (used by redirect page) */
app.get("/api/payment-status", async (req, res) => {
  try {
    const { orderId } = req.query;

    if (!orderId) {
      return res.status(400).json({ status: "INVALID_REQUEST" });
    }

    // 1️⃣ Find transaction
    const tx = await Transaction.findOne({ orderId });
    if (!tx) {
      return res.status(404).json({ status: "NOT_FOUND" });
    }

    // 2️⃣ If already final, return immediately
    if (tx.status === "SUCCESS" || tx.status === "FAILED") {
      return res.json({ status: tx.status });
    }

    // 3️⃣ Still PENDING → ask IMB
    const payload = new URLSearchParams({
      user_token: process.env.IMB_USER_TOKEN,
      order_id: orderId,
    });

    const { data: imbRes } = await axios.post(
      "https://pay.imb.org.in/api/check-order-status",
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 15000,
      },
    );

    // 🔑 THIS IS THE ONLY FIELD THAT MATTERS
    const finalStatus = imbRes?.result?.status;

    // 4️⃣ SUCCESS
    if (finalStatus === "SUCCESS") {
      tx.status = "SUCCESS";
      tx.utr = imbRes.result?.utr || null;
      tx.verifiedAt = new Date();
      tx.rawGatewayResponse = imbRes;
      await tx.save();

      return res.json({ status: "SUCCESS" });
    }

    // 5️⃣ FAILED
    if (finalStatus === "FAILED") {
      tx.status = "FAILED";
      tx.verifiedAt = new Date();
      tx.rawGatewayResponse = imbRes;
      await tx.save();

      return res.json({ status: "FAILED" });
    }

    // 6️⃣ Still pending
    return res.json({ status: "PENDING" });
  } catch (err) {
    console.error("Payment status error:", err.message);
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
