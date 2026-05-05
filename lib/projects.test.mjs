import test from "node:test";
import assert from "node:assert/strict";

import { getProjects } from "./projects.ts";

test("getProjects omits the DAFT FM project from the public projects page", async () => {
  const projects = await getProjects();

  assert.ok(projects.length > 0);
  assert.deepEqual(
    projects.map((project) => project.name).filter((name) => /daft/i.test(name)),
    [],
  );
  assert.deepEqual(
    projects.map((project) => project.url).filter((url) => /daft\.fm/i.test(url)),
    [],
  );
});
