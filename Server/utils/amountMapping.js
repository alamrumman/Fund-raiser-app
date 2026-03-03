const mappingYeartoAmount = {
  first: 200,
  second: 250,
  third: 300,
};

const getAmountForYear = (year) => {
  return mappingYeartoAmount[year] || null;
};

module.exports = { getAmountForYear };
