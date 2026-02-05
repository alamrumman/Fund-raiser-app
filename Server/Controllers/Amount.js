// amount we will be reverified here and then the transaction api will be hit
const transaction = require("../Models/Transaction");
const amountRecalculate = async (req, res) => {
  try {
    // destructuring the data received from the frontend

    const { name, year, isSW } = req.body;
    const mappingYeartoAmount = {
      first: 200,
      second: 250,
      third: 300,
    };

    const finalAmount = mappingYeartoAmount[year];
    const gender = isSW ? "SW" : "SD";

    if (!finalAmount) {
      return res.status(400).json({ message: "Wrong year selected" });
    }
    // we will now create order using this finalised amount
    //every order must have unique order for which we will use date and time and store it in the database before sending it.

    const orderId = `ORD_${Date.now()}`;
    //now we will store this transaction before hitting the gateway
    await transaction.create({
      name,
      year,
      amount: finalAmount,
      orderId,
      status: "PENDING",
      gender,
    });
    return res.status(200).json({ message: "all well" });
    //now lets hit the API
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server Error" });
  }
};

module.exports = { amountRecalculate };
