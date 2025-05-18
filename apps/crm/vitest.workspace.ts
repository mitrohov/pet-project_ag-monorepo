import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./vitest.browser.config.ts",
  "./vitest.node.config.ts",
]);
