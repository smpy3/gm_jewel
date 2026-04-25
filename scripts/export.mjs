/**
 * Export script: builds the Next.js app for static hosting (GitHub Pages).
 * It supports both modern `output: 'export'` builds (out/ generated on build)
 * and older setups that still require `next export`.
 */

import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { join } from "node:path";

const run = (cmd, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit" });
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} failed (${code})`))));
  });

const main = async () => {
  const nextCli = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
  await run(process.execPath, [nextCli, "build"]);

  // When `output: 'export'` is enabled, Next generates `out/` during build.
  if (existsSync("out")) return;

  // Fallback for older Next versions/configs.
  await run(process.execPath, [nextCli, "export"]);
};

main().catch((err) => {
  console.error(err?.message ?? err);
  process.exit(1);
});
