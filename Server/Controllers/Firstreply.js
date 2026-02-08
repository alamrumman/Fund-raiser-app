// simple api to activate the contribute now button and beat renders free service

const answer = async (req, res) => {
  res.status(200).json({ message: "Backend activated" });
};

module.exports = { answer };
