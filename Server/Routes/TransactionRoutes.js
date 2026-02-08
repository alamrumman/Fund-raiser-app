const express = require("express");
const router = express.Router();
const Transaction = require("../Models/Transaction");

router.get("/success-aggregate", async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      // 1️⃣ Only successful transactions
      { $match: { status: "SUCCESS" } },

      // 2️⃣ Group by gender + year
      {
        $group: {
          _id: {
            gender: "$gender", // SD / SW
            year: "$year", // first / second / third
          },
          totalAmount: { $sum: "$amount" },
          transactions: {
            $push: {
              name: "$name",
              amount: "$amount",
              orderId: "$orderId",
              createdAt: "$createdAt",
            },
          },
        },
      },
    ]);

    // 3️⃣ Shape response (simple JS, very light)
    const result = {
      SD: { third: {}, second: {}, first: {} },
      SW: { third: {}, second: {}, first: {} },
    };

    data.forEach((item) => {
      const { gender, year } = item._id;
      result[gender][year] = {
        totalAmount: item.totalAmount,
        transactions: item.transactions,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("❌ aggregate error:", err);
    res.status(500).json({ message: "Unable to fetch transactions" });
  }
});

module.exports = router;
