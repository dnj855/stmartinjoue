// node src/main.test.js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

// Les dates vivent à deux endroits : les data-date de #agenda (lus par main.js)
// et les startDate du JSON-LD (lus par Google). Ce test empêche la dérive.
const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const grab = (re) => [...html.matchAll(re)].map((m) => m[1]);
assert.deepEqual(
  grab(/data-date="([^"]+)"/g),
  // on ignore le fuseau : seul le couple date + heure doit correspondre
  grab(/"startDate": "([^"+]+)/g).map((d) => d.slice(0, 16)),
  "les startDate du JSON-LD ne correspondent plus aux data-date de #agenda",
);

// main.js surligne la prochaine soirée via classList.replace("bg-white","bg-yellow")
// et réécrit l'unique <span> du <li> en badge « Prochaine » : ces hypothèses doivent tenir.
const lis = [...html.matchAll(/<li\s+data-date="[^"]+"([\s\S]*?)<\/li>/g)].map(
  (m) => m[1],
);
assert.equal(lis.length, grab(/data-date="([^"]+)"/g).length);
for (const li of lis) {
  assert.match(
    li,
    /\bbg-white\b/,
    "un <li> d'agenda n'a pas la classe bg-white",
  );
  assert.equal(
    [...li.matchAll(/<span\b/g)].length,
    1,
    "un <li> d'agenda n'a pas exactement un <span> (le badge)",
  );
}

console.log("ok");
