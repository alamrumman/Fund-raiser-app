const express = require("express");
const cloudinary = require("../Configs/cloudinary");

const router = express.Router();

router.get("/signature", (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "fundraiser_support" },
    process.env.API_SECRET,
  );

  return res.json({
    timestamp,
    signature,
    apiKey: process.env.API_KEY,
    cloudName: process.env.CLOUD_NAME,
  });
});

module.exports = router;
