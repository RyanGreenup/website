import { baseFmt } from "@rs/oxlint-config/fmt";

export default {
  ...baseFmt,
  ignorePatterns: [...(baseFmt.ignorePatterns ?? []), ".astro"],
};
