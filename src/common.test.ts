import { addNumbers, exampleObject } from "./common";

test("testing test", () => {
  expect(addNumbers(1, 1)).toBe(2);
});

test("test to equal", () => {
  console.log(exampleObject);
  expect(exampleObject).toEqual({ a: 1, b: 2 });
});

// test("strict equality check", () => {
//   // Testing strict equality with addNumbers function
//   expect(addNumbers(2, 2)).toBe(4);
//   // Passes because 2 + 2 is exactly 4
// });

// test("deep equality check", () => {
//   const anotherObject = { b: 2, a: 1 };
//   // Testing deep equality of objects
//   expect(exampleObject).toEqual(anotherObject);
//   // Passes because objects have the same properties and values, even though their order is different
// });
