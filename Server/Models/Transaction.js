const mongoose = require("mongoose");
mongoose.connect()
const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      enum: ["first", "second", "third"],
      required: true,
    },
    gender: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    utr: String,
    gatewayTxnId: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", transactionSchema);
