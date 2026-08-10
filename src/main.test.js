// node src/main.test.js
import assert from "node:assert/strict";
import { countdown, nextSession } from "./main.js";

const now = new Date("2026-09-20T12:00:00");
const dates = [
  new Date("2026-10-16T20:00"),
  new Date("2026-09-25T20:00"),
  new Date("2026-08-28T20:00"),
];

assert.deepEqual(nextSession(dates, now), new Date("2026-09-25T20:00"));
assert.equal(nextSession([new Date("2020-01-01")], now), null);
assert.deepEqual(countdown(new Date("2026-09-22T13:01:02"), now), {
  d: "02",
  h: "01",
  m: "01",
  s: "02",
});
assert.deepEqual(countdown(now, new Date("2027-01-01")), {
  d: "00",
  h: "00",
  m: "00",
  s: "00",
});

console.log("ok");
