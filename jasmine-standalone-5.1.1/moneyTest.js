import { formatCurrency } from "../../scripts/utils.js";

describe("formatCurrency", function() {
  it("should format 0 cents as $0.00", function() {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it("should format 100 cents as $1.00", function() {
    expect(formatCurrency(100)).toBe("1.00");
  });

  it("should round 150 cents to $2.00", function() {
    expect(formatCurrency(150)).toBe("2.00");
  });

  it("should round 199 cents to $2.00", function() {
    expect(formatCurrency(199)).toBe("2.00");
  });

  it("should format 200 cents as $2.00", function() {
    expect(formatCurrency(200)).toBe("2.00");
  });

  it("should round 250 cents to $3.00", function() {
    expect(formatCurrency(250)).toBe("3.00");
  });

  it("should format negative -100 cents as $-1.00", function() {
    expect(formatCurrency(-100)).toBe("-1.00");
  });

  it("should round 1 cent to $0.00", function() {
    expect(formatCurrency(1)).toBe("0.00");
  });

  it("should round 49 cents to $0.00", function() {
    expect(formatCurrency(49)).toBe("0.00");
  });

  it("should round 50 cents to $1.00", function() {
    expect(formatCurrency(50)).toBe("1.00");
  });

  it("should round 99 cents to $1.00", function() {
    expect(formatCurrency(99)).toBe("1.00");
  });

  it("should format 101 cents as $1.00", function() {
    expect(formatCurrency(101)).toBe("1.00");
  });

  it("should format 100000 cents as $1000.00", function() {
    expect(formatCurrency(100000)).toBe("1000.00");
  });

  it("should handle fractional input 100.5 cents as $1.00", function() {
    expect(formatCurrency(100.5)).toBe("1.00");
  });
});
