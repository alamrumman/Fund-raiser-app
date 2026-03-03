const { getAmountForYear } = require("../utils/amountMapping");

describe("getAmountForYear", () => {
  test("first year should return 200", () => {
    expect(getAmountForYear("first")).toBe(200);
  });

  test("second year should return 250", () => {
    expect(getAmountForYear("second")).toBe(250);
  });

  test("third year should return 300", () => {
    expect(getAmountForYear("third")).toBe(300);
  });

  test("invalid year should return null", () => {
    expect(getAmountForYear("fourth")).toBeNull();
  });

  test("empty string should return null", () => {
    expect(getAmountForYear("")).toBeNull();
  });
});
