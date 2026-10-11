export const PRODUCT_NAME = "Jurivane";
export const OLD_NAME = /AgentForge/i;

/**
 * Everything a visitor can see or hear on the current page: body text (minus
 * the one-time "Formerly AgentForge" note), accessible-name attributes, the
 * document title, and the meta description.
 */
export function userVisibleText(doc = document) {
  const body = doc.body.cloneNode(true);
  body.querySelectorAll("[data-transition-note], script").forEach((node) => node.remove());
  const attributes = [...body.querySelectorAll("[alt], [title], [aria-label], [placeholder]")].flatMap(
    (node) => ["alt", "title", "aria-label", "placeholder"].map((name) => node.getAttribute(name) ?? "")
  );
  const description = doc.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
  return [body.textContent, ...attributes, doc.title, description].join("\n");
}

/** Returns user-visible mentions of the old product name (should be none). */
export function oldNameMentions(doc = document) {
  return userVisibleText(doc).match(new RegExp(OLD_NAME.source, "gi")) ?? [];
}
