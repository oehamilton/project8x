import { createHash } from "node:crypto";

// Product names that must not appear publicly. Stored only as SHA-256 hashes of
// the lowercase word so the names themselves are never written into the repo.
const BANNED_NAME_HASHES = new Set([
  "afff003b5acdc7b073170efac54ad14d27b4408b1e648d53d59c06c950580004",
]);

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

/** Returns the words in `text` whose lowercase hash is on the banned list. */
export function findBannedNames(text) {
  const words = String(text).toLowerCase().match(/[a-z0-9]+/g) ?? [];
  return [...new Set(words)].filter((word) => BANNED_NAME_HASHES.has(sha256(word)));
}

/** Old spelling we no longer use publicly; safe to name. */
export const RETIRED_SPELLING = /AgentForge8X/i;
