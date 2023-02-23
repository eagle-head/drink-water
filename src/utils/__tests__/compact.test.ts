import { compact } from "../compact";

const input = [1, null, 2, undefined, 3];
describe("compact function", () => {
  test("should remove null and undefined values from an array", () => {
    expect(compact(input)).toEqual([1, 2, 3]);
  });

  test("should return an empty array when passed null or undefined", () => {
    expect(compact([null])).toEqual([]);
    expect(compact([undefined])).toEqual([]);
  });

  test("should not modify the original array", () => {
    compact(input);
    expect(input).toEqual([1, null, 2, undefined, 3]);
  });
});
