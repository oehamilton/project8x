import stories from "./stories.js";

export const NEWS_SLOTS = [
  { key: "avaya", label: "Avaya" },
  { key: "cisco", label: "Cisco" },
  { key: "genesys", label: "Genesys" },
  { key: "amazon_connect_or_verint", label: "Amazon Connect" },
  { key: "ai_cx", label: "AI in CX" },
  { key: "government_regulation", label: "Regulation" },
];

const slotOrder = new Map(NEWS_SLOTS.map((slot, index) => [slot.key, index]));

export function slotLabel(key) {
  return NEWS_SLOTS.find((slot) => slot.key === key)?.label ?? key;
}

export function formatStoryDate(isoDate) {
  const [year, month, day] = String(isoDate).split("-").map(Number);
  if (!year || !month || !day) return String(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function currentStories(source = stories) {
  const chosen = new Map();
  for (const story of source) {
    if (story.status !== "current" || !slotOrder.has(story.slot)) continue;
    const existing = chosen.get(story.slot);
    if (!existing || String(story.date) >= String(existing.date)) {
      chosen.set(story.slot, story);
    }
  }
  return NEWS_SLOTS.map((slot) => chosen.get(slot.key)).filter(Boolean);
}

export function archiveStories(source = stories) {
  return source
    .filter((story) => story.status === "archived")
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export { stories };
