const SupportTicket = require("../Models/SupportTicket");

const createSupportTicket = async (req, res) => {
  try {
    const { name, upiRef, message, image } = req.body;
    console.log("Model check:", SupportTicket);

    if (!image || !image.url || !image.publicId) {
      return res.status(400).json({ error: "Image missing" });
    }

    const ticket = await SupportTicket.create({
      name,
      upiRef,
      message,
      image,
      status: "pending",
      comments: "",
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = createSupportTicket;
