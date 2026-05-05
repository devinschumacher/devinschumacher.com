import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const homePagePath = path.resolve(import.meta.dirname, "./page.tsx");

test("home hero CTA block does not show the SERP University button", () => {
  const homeSource = fs.readFileSync(homePagePath, "utf8");
  const heroCtaBlock = homeSource.match(
    /\{\/\* CTA Buttons \*\/\}([\s\S]*?)\{\/\* Social Links \*\/\}/,
  )?.[1];

  assert.ok(heroCtaBlock);
  assert.doesNotMatch(heroCtaBlock, /SERP University/);
  assert.doesNotMatch(heroCtaBlock, /serp\.ly\/@serp\/community/);
});

test("home page does not render SERP University button CTAs", () => {
  const homeSource = fs.readFileSync(homePagePath, "utf8");

  assert.doesNotMatch(
    homeSource,
    /<Button\b[\s\S]*?SERP University[\s\S]*?<\/Button>/,
  );
});

test("home projects omit removed DAFT FM and snowboarding links", () => {
  const homeSource = fs.readFileSync(homePagePath, "utf8");

  assert.doesNotMatch(homeSource, /daft\.fm/i);
  assert.doesNotMatch(homeSource, /DAFT FM/);
  assert.doesNotMatch(homeSource, /devingoessnowboarding/i);
});
