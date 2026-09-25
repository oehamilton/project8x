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
    slot: "avaya",
    headline: "Avaya old",
    take: "Superseded Avaya brief.",
    sourceUrl: "#",
    date: "2026-01-01",
    archived: true,
  },
  {
    slot: "avaya",
    headline: "Avaya current",
    take: "The prior current story stays when nothing newer is credible.",
    sourceUrl: "#",
    date: "2026-06-01",
  },
  {
    slot: "avaya",
    headline: "Avaya newer archived",
    take: "Archived even though the date is newer.",
    sourceUrl: "#",
    date: "2026-08-01",
    archived: true,
  },
  {
    slot: "cisco-collaboration",
    headline: "Cisco only",
    take: "Single current story. An empty refresh keeps this card.",
    sourceUrl: "#",
    date: "2026-03-01",
  },
  {
    slot: "genesys-ccaas",
    headline: "Genesys older current",
    take: "Older non-archived Genesys brief.",
    sourceUrl: "#",
    date: "2026-02-01",
  },
  {
    slot: "genesys-ccaas",
    headline: "Genesys newer",
    take: "Latest non-archived story wins the slot.",
    sourceUrl: "#",
    date: "2026-07-01",
  },
  {
    slot: "not-a-slot",
    headline: "Ignore me",
    take: "Unknown slots never join the six-card grid.",
    sourceUrl: "#",
    date: "2026-12-01",
  },
  {
    slot: "amazon-connect-verint",
    headline: "Connect archived only",
    take: "A slot with only archived stories stays out of the current grid.",
    sourceUrl: "#",
    date: "2026-05-01",
    archived: true,
  },
];

describe("News content helpers", () => {
  it("keeps the latest non-archived story per known slot, in slot order", () => {
    expect(NEWS_SLOTS).toHaveLength(6);
    const current = currentStories(sample);
    expect(current.map((story) => story.headline)).toEqual([
      "Avaya current",
      "Cisco only",
      "Genesys newer",
    ]);
    expect(current.map((story) => story.slot)).toEqual([
      "avaya",
      "cisco-collaboration",
      "genesys-ccaas",
    ]);
  });

  it("lists archived stories newest first and leaves current stories out", () => {
    expect(archiveStories(sample).map((story) => story.headline)).toEqual([
      "Avaya newer archived",
      "Connect archived only",
      "Avaya old",
    ]);
  });
});

describe("News page", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows News in primary nav and footer and renders six current cards plus archive", async () => {
    renderAt("/");
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(within(primary).getByRole("link", { name: "News" })).toHaveAttribute("href", "/news");
    const footer = screen.getByRole("navigation", { name: "Footer" });
    expect(within(footer).getByRole("link", { name: "News" })).toHaveAttribute("href", "/news");

    await userEvent.click(within(primary).getByRole("link", { name: "News" }));

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /notes on the platforms — and the rules around them/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("note")).toHaveTextContent(/\[placeholder\]/i);

    const current = screen.getByRole("region", { name: /current stories/i });
    const cards = within(current).getAllByRole("article");
    expect(cards).toHaveLength(6);
    expect(within(cards[0]).getByText("Avaya")).toBeInTheDocument();
    expect(within(cards[1]).getByText("Cisco / collaboration")).toBeInTheDocument();
    expect(within(cards[2]).getByText("Genesys / CCaaS")).toBeInTheDocument();
    expect(within(cards[3]).getByText("Amazon Connect / Verint")).toBeInTheDocument();
    expect(within(cards[4]).getByText("AI in CX / agentic contact center")).toBeInTheDocument();
    expect(within(cards[5]).getByText("Government / regulation")).toBeInTheDocument();
    cards.forEach((card) => {
      expect(within(card).getByRole("heading", { level: 3 }).textContent).toMatch(/\[Placeholder\]/);
    });
    expect(
      within(current).queryByRole("heading", { name: /earlier avaya brief/i })
    ).not.toBeInTheDocument();
    expect(
      within(current).queryByRole("heading", { name: /earlier genesys brief/i })
    ).not.toBeInTheDocument();

    const archive = screen.getByRole("region", { name: /^archive$/i });
    const archived = within(archive).getAllByRole("article");
    expect(archived).toHaveLength(2);
    expect(within(archived[0]).getByRole("heading", { level: 3 })).toHaveTextContent(
      /earlier genesys brief/i
    );
    expect(within(archived[1]).getByRole("heading", { level: 3 })).toHaveTextContent(
      /earlier avaya brief/i
    );
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
    const cue = screen.getByText(/briefs beside the practice, not in place of it/i);
    expect(within(cue).getByRole("link", { name: "News" })).toHaveAttribute("href", "/news");
  });
});
