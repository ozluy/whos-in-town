import replaceChar from "./replaceChar";

test("renders Search title", () => {
  expect(replaceChar('?-"-*-/')).toBe("%253F-%27C-%252A-%252F");
});
