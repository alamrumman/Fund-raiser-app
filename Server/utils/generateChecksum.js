const crypto = require("crypto");

/**
 * Zaakpay checksum generation
 * @param {Object} payload
 * @param {string} secretKey
 */
const generateChecksum = (payload, secretKey) => {
  // Zaakpay requires fields to be sorted alphabetically
  const sortedKeys = Object.keys(payload).sort();

  const checksumString = sortedKeys
    .map((key) => `${key}=${payload[key]}`)
    .join("&");

  return crypto
    .createHmac("sha256", secretKey)
    .update(checksumString)
    .digest("hex");
};

module.exports = generateChecksum;
