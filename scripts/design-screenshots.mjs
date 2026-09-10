#!/usr/bin/env node
/**
 * Capture desktop and mobile screenshots of public routes via Playwright CLI.
 * Usage: BASE_URL=http://localhost:3000 node scripts/design-screenshots.mjs [baseline|after]
 */

import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const label = process.argv[2] === "after" ? "after" : "baseline";
const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const outDir = join(root, "docs", "design-audit", label);

const routes = [
  ["home", "/"],
  ["schedule", "/schedule"],
  ["calendar", "/calendar"],
  ["classes", "/classes"],
  ["locations", "/locations"],
  ["instructors", "/instructors"],
  ["about", "/about"],
  ["faq", "/faq"],
  ["contact", "/contact"],
  ["class-children", "/classes/children-class"],
  ["location-croydon", "/locations/croydon"],
  ["instructor-master-kim", "/instructors/master-kim"],
  ["about-history", "/about/history-of-hapkido"],
];

const viewports = [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
];

mkdirSync(outDir, { recursive: true });

function run(args) {
  const result = spawnSync("npx", ["playwright-cli", ...args], {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe",
  });
  if (result.status !== 0) {
    throw new Error(
      `playwright-cli ${args.join(" ")} failed\n${result.stderr || result.stdout}`,
    );
  }
  return result.stdout;
}

run(["open", baseUrl]);

for (const [name, path] of routes) {
  run(["goto", `${baseUrl}${path}`]);
  for (const [vp, width, height] of viewports) {
    run(["resize", String(width), String(height)]);
    const file = join(outDir, `${name}-${vp}.png`);
    run(["screenshot", "--filename", file, "--full-page"]);
    console.log(`wrote ${file}`);
  }
}

run(["close"]);
console.log(`Done. Screenshots in ${outDir}`);
