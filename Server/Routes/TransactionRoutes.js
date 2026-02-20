const express = require("express");
const router = express.Router();
const Transaction = require("../Models/Transaction");

router.get("/success-aggregate", async (req, res) => {
  try {
    // 🔹 1. Cadet Transactions (SD / SW)
    const cadetData = await Transaction.aggregate([
      {
        $match: {
          status: "SUCCESS",
          type: { $ne: "SPONSOR" }, // exclude sponsors
        },
      },
      {
        $group: {
          _id: {
            gender: "$gender",
            year: "$year",
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

    // 🔹 2. Sponsor Transactions
    const sponsorData = await Transaction.aggregate([
      {
        $match: {
          status: "SUCCESS",
          type: "SPONSOR",
        },
      },
      {
        $group: {
          _id: null,
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

    // 🔹 3. Shape result
    const result = {
      SD: { third: {}, second: {}, first: {} },
      SW: { third: {}, second: {}, first: {} },
      SPONSOR: {
        totalAmount: 0,
        transactions: [],
      },
    };

    // Fill SD / SW
    cadetData.forEach((item) => {
      const { gender, year } = item._id;
      result[gender][year] = {
        totalAmount: item.totalAmount,
        transactions: item.transactions,
      };
    });

    // Fill Sponsor
    if (sponsorData.length > 0) {
      result.SPONSOR = sponsorData[0];
    }

    res.json(result);
  } catch (err) {
    console.error("❌ aggregate error:", err);
    res.status(500).json({ message: "Unable to fetch transactions" });
  }
});

module.exports = router;
