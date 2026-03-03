const Transaction = require("../Models/Transaction");
const axios = require("axios");
const { getAmountForYear } = require("../utils/amountMapping");

const amountRecalculate = async (req, res) => {
  try {
    const { name, year, isSW, phone } = req.body;

    const amount = getAmountForYear(year);
    if (!amount) {
      return res.status(400).json({ message: "Invalid year selected" });
    }

    // 2️⃣ Create internal order
    const orderId = `ORD_${Date.now()}`;

    await Transaction.create({
      name,
      year,
      gender: isSW ? "SW" : "SD",
      amount,
      orderId,
      status: "PENDING",
      source: "UNKNOWN",
      type: "CADET",
    });

    // 3️⃣ Call IMB Create Order API
    const payload = new URLSearchParams({
      customer_mobile: phone || "9999999999",
      user_token: process.env.IMB_USER_TOKEN,
      amount: amount.toString(),
      order_id: orderId,
      redirect_url: `https://fund-raiser-app-1.onrender.com/payment-processing?order_id=${orderId}`,
      remark1: year,
    });

    const { data } = await axios.post(
      "https://pay.imb.org.in/api/create-order",
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 15000,
      },
    );

    if (data.status !== true) {
      return res.status(400).json({ message: data.message || "IMB error" });
    }

    // 4️⃣ Extract IMB references (CRITICAL)
    const imbOrderId = data.result?.orderId || null;
    const checkLink = data.result?.check_link || null;
    const imbTxnRef = checkLink ? checkLink.split("/").pop() : null;

    // 5️⃣ Update transaction with IMB metadata
    await Transaction.updateOne(
      { orderId },
      {
        imbOrderId,
        imbTxnRef,
        checkLink,
      },
    );

    // 6️⃣ Return only what frontend needs
    return res.json({
      payment_url: data.result.payment_url,
      orderId,
    });
  } catch (error) {
    console.error("🔥 Create order error:", error.message);

    return res.status(500).json({
      message: "Unable to initiate payment",
    });
  }
};

module.exports = { amountRecalculate };
