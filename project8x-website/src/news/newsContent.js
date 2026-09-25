import stories from "./stories.json";

// Monthly refresh: replace or archive a slot only when a new credible story
// exists. If nothing new is worth running, leave the prior current story in
// place — do not set archived on it. An empty slot keeps that prior story
// because currentStories() returns the latest non-archived item per slot.
// archiveStories() lists only items with archived: true, newest date first.
// Edit stories.json; this module is the read path.

export const NEWS_SLOTS = [
  { key: "avaya", label: "Avaya" },
  { key: "cisco-collaboration", label: "Cisco / collaboration" },
  { key: "genesys-ccaas", label: "Genesys / CCaaS" },
  { key: "amazon-connect-verint", label: "Amazon Connect / Verint" },
  { key: "ai-cx-agentic", label: "AI in CX / agentic contact center" },
  { key: "government-regulation", label: "Government / regulation" },
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

function isArchived(story) {
  return story?.archived === true;
}

export function currentStories(source = stories) {
  const latest = new Map();
  for (const story of source) {
    if (isArchived(story) || !slotOrder.has(story.slot)) continue;
    const existing = latest.get(story.slot);
    if (!existing || String(story.date) >= String(existing.date)) {
      latest.set(story.slot, story);
    }
  }
  return NEWS_SLOTS.map((slot) => latest.get(slot.key)).filter(Boolean);
}

export function archiveStories(source = stories) {
  return source
    .filter(isArchived)
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export { stories };
