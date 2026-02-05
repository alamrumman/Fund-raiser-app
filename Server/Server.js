require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const amountCalroutes = require("./Routes/AmountRoutes");
const connectDB = require("./Configs/dbconnection");
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());

connectDB();

app.use("/api/amount", amountCalroutes);

app.listen("3000", (err) => {
  if (err) {
    console.log("Error booting the server");
  }
  console.log("Server listening at port 3000");
});
