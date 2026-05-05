import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const footerPath = path.resolve(import.meta.dirname, "./Footer.tsx");

test("footer links to @devinschumacher1 and no longer links to @devingoessnowboarding", () => {
  const footerSource = fs.readFileSync(footerPath, "utf8");

  assert.match(footerSource, /https:\/\/youtube\.com\/@devinschumacher1/);
  assert.doesNotMatch(footerSource, /devingoessnowboarding/);
});

test("footer omits removed project and product links", () => {
  const footerSource = fs.readFileSync(footerPath, "utf8");

  assert.doesNotMatch(footerSource, /daft\.fm/i);
  assert.doesNotMatch(footerSource, /daft fm/i);
  assert.doesNotMatch(footerSource, /serpdownloaders\.github\.io/i);
  assert.doesNotMatch(footerSource, /serp downloaders/i);
});
