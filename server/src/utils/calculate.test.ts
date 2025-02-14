import { add, multiply } from "../utils/calculate";

describe("Math Functions", () => {
    test("adds two numbers correctly", () => {
        expect(add(2, 3)).toBe(5);
    });

    test("multiplies two numbers correctly", () => {
        expect(multiply(2, 3)).toBe(6);
    });
});
