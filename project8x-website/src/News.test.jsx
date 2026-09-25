import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";
import {
  NEWS_SLOTS,
  archiveStories,
  currentStories,
} from "./news/newsContent.js";

function renderAt(path) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

const sample = [
  {
    id: "avaya-old",
    slot: "avaya",
    slotLabel: "Avaya",
    headline: "Avaya old",
    take: "Superseded Avaya brief.",
    sourceUrl: "https://example.com/avaya-old",
    sourceName: "Avaya",
    date: "2026-01-01",
    status: "archived",
    publishedAt: "2026-01-02T00:00:00Z",
  },
  {
    id: "avaya-current",
    slot: "avaya",
    slotLabel: "Avaya",
    headline: "Avaya current",
    take: "The prior current story stays when the beat is quiet.",
    sourceUrl: "https://example.com/avaya",
    sourceName: "Avaya",
    date: "2026-06-01",
    status: "current",
    publishedAt: "2026-06-02T00:00:00Z",
  },
  {
    id: "avaya-newer-archived",
    slot: "avaya",
    slotLabel: "Avaya",
    headline: "Avaya newer archived",
    take: "Archived even though the date is newer.",
    sourceUrl: "https://example.com/avaya-new",
    sourceName: "Avaya",
    date: "2026-08-01",
    status: "archived",
    publishedAt: "2026-08-02T00:00:00Z",
    replacesId: "avaya-old",
  },
  {
    id: "cisco-only",
    slot: "cisco",
    slotLabel: "Cisco",
    headline: "Cisco only",
    take: "Single current story. A quiet month keeps this card.",
    sourceUrl: "https://example.com/cisco",
    sourceName: "Cisco",
    date: "2026-03-01",
    status: "current",
    publishedAt: "2026-03-02T00:00:00Z",
  },
  {
    id: "genesys-older",
    slot: "genesys",
    slotLabel: "Genesys",
    headline: "Genesys older current",
    take: "Older current Genesys brief.",
    sourceUrl: "https://example.com/genesys-old",
    sourceName: "Genesys",
    date: "2026-02-01",
    status: "current",
    publishedAt: "2026-02-02T00:00:00Z",
  },
  {
    id: "genesys-newer",
    slot: "genesys",
    slotLabel: "Genesys",
    headline: "Genesys newer",
    take: "The later current story is the one card for the slot.",
    sourceUrl: "https://example.com/genesys",
    sourceName: "Genesys",
    date: "2026-07-01",
    status: "current",
    publishedAt: "2026-07-02T00:00:00Z",
  },
  {
    id: "unknown",
    slot: "not-a-slot",
    slotLabel: "Ignore",
    headline: "Ignore me",
    take: "Unknown slots never join the six-card grid.",
    sourceUrl: "https://example.com/ignore",
    sourceName: "Ignore",
    date: "2026-12-01",
    status: "current",
    publishedAt: "2026-12-02T00:00:00Z",
  },
  {
    id: "connect-archived-only",
    slot: "amazon_connect_or_verint",
    slotLabel: "Amazon Connect",
    headline: "Connect archived only",
    take: "A slot with no current story stays empty. No filler.",
    sourceUrl: "https://example.com/connect",
    sourceName: "AWS",
    date: "2026-05-01",
    status: "archived",
    publishedAt: "2026-05-02T00:00:00Z",
  },
];

const batchIds = [
  "avaya-aura-10-3-2026-08",
  "cisco-webex-ai-agent-gpt-5-4-2026-09",
  "genesys-agentic-orchestration-2026-09",
  "amazon-connect-agentic-cx-designer-2026-09",
  "ai-cx-best-buy-handoff-2026-09",
  "gov-us-rejects-un-ai-governance-2026-09",
];

describe("News content helpers", () => {
  it("keeps one current story per known slot, in slot order, with no filler", () => {
    expect(NEWS_SLOTS.map((slot) => slot.key)).toEqual([
      "avaya",
      "cisco",
      "genesys",
      "amazon_connect_or_verint",
      "ai_cx",
      "government_regulation",
    ]);
    const current = currentStories(sample);
    expect(current.map((story) => story.headline)).toEqual([
      "Avaya current",
      "Cisco only",
      "Genesys newer",
    ]);
    expect(current.map((story) => story.slot)).toEqual([
      "avaya",
      "cisco",
      "genesys",
    ]);
  });

  it("lists archived stories newest first and leaves current stories out", () => {
    expect(archiveStories(sample).map((story) => story.id)).toEqual([
      "avaya-newer-archived",
      "connect-archived-only",
      "avaya-old",
    ]);
  });

  it("publishes the approved first batch as six current stories and an empty archive", () => {
    const current = currentStories();
    expect(current.map((story) => story.id)).toEqual(batchIds);
    expect(current.map((story) => story.slotLabel)).toEqual([
      "Avaya",
      "Cisco",
      "Genesys",
      "Amazon Connect",
      "AI in CX",
      "Regulation",
    ]);
    current.forEach((story) => {
      expect(story.status).toBe("current");
      expect(story.publishedAt).toBe("2026-09-25T19:00:00Z");
      expect(story.sourceUrl).toMatch(/^https:\/\//);
      expect(story).not.toHaveProperty("replacesId");
    });
    expect(archiveStories()).toEqual([]);
  });
});

describe("News page", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows News in primary nav and footer and renders the approved current stories", async () => {
    renderAt("/");
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(within(primary).getByRole("link", { name: "News" })).toHaveAttribute("href", "/news");
    const footer = screen.getByRole("navigation", { name: "Footer" });
    expect(within(footer).getByRole("link", { name: "News" })).toHaveAttribute("href", "/news");

    await userEvent.click(within(primary).getByRole("link", { name: "News" }));

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Industry notes for contact-center operators.",
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/if a beat is quiet, we leave the prior piece up/i)).toBeInTheDocument();
    expect(screen.queryByText(/\[placeholder\]/i)).not.toBeInTheDocument();

    const current = screen.getByRole("region", { name: /current stories/i });
    const cards = within(current).getAllByRole("article");
    expect(cards).toHaveLength(6);
    expect(within(cards[0]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Avaya Aura 10.3 sets a supported path to modernize without a forced rip-and-replace"
    );
    expect(within(cards[1]).getByRole("link", { name: /cisco webex/i })).toHaveAttribute(
      "href",
      "https://help.webex.com/en-us/article/nv7abhz/What%27s-new-for-administrators-in-Webex-Contact-Center"
    );
    expect(within(cards[3]).getByText("Amazon Connect")).toBeInTheDocument();
    expect(within(cards[4]).getByText("AI in CX")).toBeInTheDocument();
    expect(within(cards[5]).getByText("Regulation")).toBeInTheDocument();

    const archive = screen.getByRole("region", { name: /^archive$/i });
    expect(within(archive).queryByRole("article")).not.toBeInTheDocument();
    expect(within(archive).getByText("No archived notes yet.")).toBeInTheDocument();
    expect(within(primary).getByRole("link", { name: "News" })).toHaveClass("is-active");
  });

  it("links to /news from the homepage without taking over the hero", () => {
    renderAt("/");
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Contact-center systems that hold under real load.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Industry notes from the platforms we deliver on." })
    ).toHaveAttribute("href", "/news");
  });
});
