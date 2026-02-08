const Transaction = require("../Models/Transaction");
const FundStats = require("../Models/FundStats");

const imbWebhook = async (req, res) => {
  try {
    console.log("🔔 IMB WEBHOOK RECEIVED:", req.body);

    const { status, order_id, result } = req.body;

    if (!order_id) {
      return res.sendStatus(400);
    }

    // 1️⃣ Find transaction
    const tx = await Transaction.findOne({ orderId: order_id });

    // IMB retries webhooks → always return 200
    if (!tx) {
      return res.sendStatus(200);
    }

    // 2️⃣ Already processed → do nothing (VERY IMPORTANT)
    if (tx.status === "SUCCESS") {
      return res.sendStatus(200);
    }

    // 3️⃣ Success case
    if (status === "SUCCESS" && result?.txnStatus === "COMPLETED") {
      // Update transaction
      tx.status = "SUCCESS";
      tx.utr = result.utr;
      tx.gatewayTxnId = result.tr;
      await tx.save();

      // Increment global stats ONCE
      await FundStats.updateOne(
        { _id: "GLOBAL_STATS" },
        {
          $inc: {
            totalAmount: tx.amount,
            totalTransactions: 1,
          },
        },
      );
    } else {
      // 4️⃣ Failed case
      tx.status = "FAILED";
      await tx.save();
    }

    // IMB expects 200 OK
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ IMB webhook error:", err);
    res.sendStatus(500);
  }
};

module.exports = { imbWebhook };
