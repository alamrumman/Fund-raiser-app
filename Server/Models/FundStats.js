const mongoose = require("mongoose");

const fundStatsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: "GLOBAL_STATS",
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    totalTransactions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FundStats", fundStatsSchema);
