// Generates dist/_headers at build time so the members-area password
// comes from a Netlify environment variable, never from the repo.
//   MEMBERS_PASSWORD  (required) - the shared members password
//   MEMBERS_USER      (optional) - username, defaults to "members"
// If MEMBERS_PASSWORD is missing, the build FAILS on purpose, so the
// /members area can never deploy unprotected by accident.
import { writeFileSync, existsSync } from "node:fs";

const password = process.env.MEMBERS_PASSWORD;
const user = process.env.MEMBERS_USER || "members";

if (!existsSync(new URL("../dist", import.meta.url))) {
  console.error("[gen-headers] dist/ not found. Run this after 'astro build'.");
  process.exit(1);
}
if (!password) {
  console.error("\n[gen-headers] MEMBERS_PASSWORD is not set.");
  console.error("[gen-headers] Refusing to build, because /members would deploy UNPROTECTED.");
  console.error("[gen-headers] Set MEMBERS_PASSWORD in Netlify > Site configuration > Environment variables, then redeploy.\n");
  process.exit(1);
}
const contents = `# AUTO-GENERATED at build time. Do not edit by hand.
/members
  Basic-Auth: ${user}:${password}
/members/*
  Basic-Auth: ${user}:${password}
`;
writeFileSync(new URL("../dist/_headers", import.meta.url), contents);
console.log(`[gen-headers] Wrote dist/_headers protecting /members (user: ${user})`);
