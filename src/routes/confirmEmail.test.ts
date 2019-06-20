import fetch from "node-fetch";

test("sends invalid back if id is bad", async () => {
  const response = await fetch(`${process.env.TEST_HOST}/confirm/12356`);
  const text = await response.text();
  expect(text).toEqual("invalid");
});
