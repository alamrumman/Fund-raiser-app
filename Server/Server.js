require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const amountCalroutes = require("./Routes/AmountRoutes");
const hookroutes = require("./Routes/HookRoutes");
const connectDB = require("./Configs/dbconnection");
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: ["http://localhost:5173", "https://fund-raiser-app-1.onrender.com"],
    credentials: true,
  }),
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use("/api/amount", amountCalroutes);
app.use("/api/hooks", hookroutes);

app.get("/api/payment-status", async (req, res) => {
  const tx = await transaction.findOne({ orderId: req.query.orderId });
  if (!tx) return res.status(404).json({ status: "NOT_FOUND" });
  res.json({ status: tx.status });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error booting the server");
  }
  console.log(`Server listening at ${PORT}`);
});
