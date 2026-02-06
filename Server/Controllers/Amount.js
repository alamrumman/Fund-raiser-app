const transaction = require("../Models/Transaction");
const generateChecksum = require("../utils/generateChecksum");
const isLive = process.env.ZAAKPAY_MODE === "LIVE";
const amountRecalculate = async (req, res) => {
  try {
    const { name, year, isSW, email } = req.body;

    const mappingYeartoAmount = {
      first: 200,
      second: 250,
      third: 300,
    };

    const finalAmount = mappingYeartoAmount[year];
    const gender = isSW ? "SW" : "SD";

    if (!finalAmount) {
      console.warn("⚠️ Invalid year received:", year);
      return res.status(400).json({ message: "Wrong year selected" });
    }

    const orderId = `ORD_${Date.now()}`;

    const savedTx = await transaction.create({
      name,
      year,
      amount: finalAmount,
      orderId,
      status: "PENDING",
      gender,
    });

    const payload = {
      merchantIdentifier: process.env.ZAAKPAY_MERCHANT_ID,
      orderId,
      amount: finalAmount * 100,
      currency: "INR",
      buyerEmail: email,
    };

    if (!process.env.ZAAKPAY_MERCHANT_ID || !process.env.ZAAKPAY_SECRET) {
      console.error("❌ Zaakpay ENV variables missing");
      throw new Error("Zaakpay configuration missing");
    }

    const checksum = generateChecksum(payload, process.env.ZAAKPAY_SECRET);

    return res.status(200).json({
      success: true,
      orderId,
      amount: finalAmount,
      currency: "INR",
      merchantIdentifier: process.env.ZAAKPAY_MERCHANT_ID,
      buyerEmail: email,
      checksum,
      mode: isLive ? "LIVE" : "TEST",
    });
  } catch (error) {
    console.error("🔥 Error in amountRecalculate:", error.message);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { amountRecalculate };
