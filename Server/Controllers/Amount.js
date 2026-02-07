const transaction = require("../Models/Transaction");
const axios = require("axios");

const amountRecalculate = async (req, res) => {
  try {
    const { name, year, isSW, phone } = req.body;

    const mappingYeartoAmount = {
      first: 200,
      second: 250,
      third: 10, // use 10 for live testing
    };

    const amount = mappingYeartoAmount[year];
    if (!amount) {
      return res.status(400).json({ message: "Wrong year selected" });
    }

    const orderId = `ORD_${Date.now()}`;

    await transaction.create({
      name,
      year,
      amount,
      orderId,
      status: "PENDING",
      gender: isSW ? "SW" : "SD",
    });

    const payload = new URLSearchParams({
      customer_mobile: phone || "9999999999",
      user_token: process.env.IMB_USER_TOKEN,
      amount: amount.toString(),
      order_id: orderId,
      redirect_url: `https://fund-raiser-app.onrender.com/payment-processing?order_id=${orderId}`,
      remark1: year,
    });

    const { data } = await axios.post(
      "https://pay.imb.org.in/api/create-order",
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (data.status !== true) {
      console.error("IMB ERROR:", data);
      return res.status(400).json({ message: data.message });
    }

    return res.json({
      payment_url: data.result.payment_url,
    });
  } catch (error) {
    console.error("🔥 Error in amountRecalculate:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { amountRecalculate };
