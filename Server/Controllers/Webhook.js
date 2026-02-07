const Transaction = require("../Models/Transaction");

const imbWebhook = async (req, res) => {
  try {
    console.log("🔔 IMB WEBHOOK RECEIVED:", req.body);

    const { status, order_id, result } = req.body;

    if (!order_id) {
      return res.sendStatus(400);
    }

    if (status === "SUCCESS" && result?.txnStatus === "COMPLETED") {
      await Transaction.findOneAndUpdate(
        { orderId: order_id },
        {
          status: "SUCCESS",
          utr: result.utr,
          gatewayTxnId: result.tr,
        },
      );
    } else {
      await Transaction.findOneAndUpdate(
        { orderId: order_id },
        { status: "FAILED" },
      );
    }

    // IMB expects 200 OK
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ IMB webhook error:", err);
    res.sendStatus(500);
  }
};

module.exports = { imbWebhook };
