import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";
import {
  NEWS_SLOTS,
  archiveStories,
  currentStories,
} from "./news/newsContent.js";
import {
  archivedBriefingStories,
  briefingStories,
  governanceBriefing,
} from "./news/briefings.js";
import { OLD_NAME, PRODUCT_NAME } from "./testUtils/productName.js";

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
  "cisco-webex-ai-agent-gpt54-2026-09",
  "genesys-agentic-orchestration-xperience-2026-09",
  "amazon-connect-agentic-cx-designer-ga-2026-09",
  "ai-cx-balto-kodi-ga-2026-09",
  "regulation-eo-14434-super-intelligence-2026-09",
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

  it("publishes one current story per slot after the approved replacements", () => {
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
    expect(current.map((story) => story.sourceName)).toEqual([
      "Avaya",
      "Cisco Webex Help",
      "Genesys",
      "AWS",
      "PR Newswire / Balto",
      "White House",
    ]);
    expect(current[2].take).toContain("Navigator targets Nov 2026–Jan 2027 GA");
    expect(current[3].take).toContain("can we script the IVR?");
    expect(current[4].replacesId).toBe("ai-cx-best-buy-handoff-plumbing-2026-09");
    expect(current[4].publishedAt).toBe("2026-10-05T14:40:00Z");
    expect(current[4].date).toBe("2026-09-28");
    expect(current[5].replacesId).toBe("regulation-us-rejects-un-ai-governance-2026-09");
    expect(current[5].publishedAt).toBe("2026-10-05T14:40:00Z");
    expect(current[5].date).toBe("2026-09-29");
    expect(current[5].take).toContain("It does not create a new AI regulator.");
    expect(current[5].take).not.toMatch(/EU AI Act/);
    current.slice(0, 4).forEach((story) => {
      expect(story.status).toBe("current");
      expect(story.publishedAt).toBe("2026-09-25T19:30:00Z");
      expect(story.sourceUrl).toMatch(/^https:\/\//);
      expect(story.replacesId).toBeNull();
    });
    current.slice(4).forEach((story) => {
      expect(story.status).toBe("current");
      expect(story.sourceUrl).toMatch(/^https:\/\//);
    });

    const archived = archiveStories();
    expect(archived.map((story) => story.id)).toEqual([
      "ai-cx-best-buy-handoff-plumbing-2026-09",
      "regulation-us-rejects-un-ai-governance-2026-09",
    ]);
    archived.forEach((story) => {
      expect(story.status).toBe("archived");
      expect(story.publishedAt).toBe("2026-09-25T19:30:00Z");
      expect(story.replacesId).toBeNull();
    });
    expect(archived[0].sourceName).toBe("PYMNTS");
    expect(archived[1].sourceName).toBe("U.S. Mission to the UN");
    expect(archived[1].take).toContain("Parallel UN tracks keep moving.");
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
    expect(within(cards[1]).getByRole("link", { name: /cisco webex help/i })).toHaveAttribute(
      "href",
      "https://help.webex.com/en-us/article/nv7abhz/What%27s-new-for-administrators-in-Webex-Contact-Center"
    );
    expect(within(cards[3]).getByText("Amazon Connect")).toBeInTheDocument();
    expect(within(cards[4]).getByText("AI in CX")).toBeInTheDocument();
    expect(within(cards[4]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Balto’s Kodi moves contact-center AI from insight to approved action"
    );
    expect(within(cards[4]).getByRole("link", { name: /pr newswire \/ balto/i })).toHaveAttribute(
      "href",
      "https://www.prnewswire.com/news-releases/balto-launches-kodi-contact-center-leaders-have-a-new-way-to-ask-anything-find-the-answer-and-put-it-to-work-302888649.html"
    );
    expect(within(cards[5]).getByText("Regulation")).toBeInTheDocument();
    expect(within(cards[5]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "White House EO 14434 puts “Super Intelligence” / SI into federal vocabulary"
    );
    expect(within(cards[5]).getByRole("link", { name: /white house/i })).toHaveAttribute(
      "href",
      "https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/"
    );

    const archive = screen.getByRole("region", { name: /^archive$/i });
    const archived = within(archive).getAllByRole("article");
    expect(archived).toHaveLength(2);
    expect(within(archived[0]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Best Buy’s AI care push is really about handoff plumbing — not the model brand"
    );
    expect(within(archived[1]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "U.S. rejects centralized UN AI governance as the Security Council debates the rules"
    );
    expect(within(archive).queryByText("No archived notes yet.")).not.toBeInTheDocument();
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

describe("Agent governance briefing", () => {
  afterEach(() => {
    cleanup();
  });

  it("lists sourced briefing stories oldest first with a tie-in for each", () => {
    const items = briefingStories();
    expect(governanceBriefing.heading).toBe("Why agent governance matters now");
    expect(items.map((story) => story.id)).toEqual([
      "governance-openai-testnet-wallet-2026-10",
      "governance-nist-nsa-cisa-incident-practices-2026-10",
      "governance-reuters-ai-agent-hacking-spree-2026-10",
      "governance-microsoft-agentic-insider-2026-10",
      "governance-fca-ai-incident-reporting-2026-10",
      "governance-openai-monitoring-disabled-2026-10",
      "governance-metr-redwood-openai-monitoring-redteam-2026-10",
      "governance-banks-block-third-party-ai-agents-2026-10",
    ]);
    expect(items).toHaveLength(8);
    expect(items.map((story) => story.date)).toEqual([
      "2026-10-15",
      "2026-10-16",
      "2026-10-19",
      "2026-10-19",
      "2026-10-19",
      "2026-10-20",
      "2026-10-22",
      "2026-10-22",
    ]);
    expect(items.map((story) => story.sourceName)).toEqual([
      "OpenAI Alignment",
      "NIST",
      "Reuters (via Yahoo News)",
      "Microsoft",
      "Financial Conduct Authority",
      "OpenAI Alignment",
      "METR",
      "Axios",
    ]);
    items.forEach((story) => {
      expect(story.sourceUrl).toMatch(/^https:\/\//);
      expect(story.take.length).toBeGreaterThan(0);
      expect(story.whyItMatters).toContain(PRODUCT_NAME);
      expect(story.whyItMatters).not.toMatch(/prevent/i);
    });
    expect(JSON.stringify(governanceBriefing)).not.toMatch(OLD_NAME);
    expect(governanceBriefing.publishedAt).toBe("2026-10-23T22:15:00Z");
    expect(governanceBriefing.intro).toMatch(
      /^Over the past week, Axios reported that major U.S. banks are detecting unauthorized third-party AI agents in customer accounts and moving to block them, with some agents taking actions that appeared independent of user instructions, /
    );
    expect(governanceBriefing.intro).toContain(
      "METR and Redwood Research reported that an independent red-team of OpenAI’s internal agent monitoring found ways agents could evade it"
    );
    expect(governanceBriefing.intro).toContain("That is what Jurivane is built for");
    expect(governanceBriefing.intro).toContain(
      "Command and Control for Agentic Operations: provision, govern, observe, and stop AI agents"
    );
    expect(governanceBriefing.intro).toContain(
      "the Financial Conduct Authority said firms’ incident reporting must extend to significant AI failures and near-misses"
    );
    expect(governanceBriefing.intro).toContain(
      "Reuters reported that one hacker used autonomous AI agents to break into websites at more than 100 companies"
    );
    expect(governanceBriefing.intro).toContain("Guardian Agents");
    expect(governanceBriefing.intro).toContain("cannot be trusted");
    expect(governanceBriefing.intro).not.toContain("self-replicating");
    expect(governanceBriefing.intro).not.toContain("EU Scientific Panel");
    expect(governanceBriefing.intro).not.toContain("Australian parliamentary committee");
    expect(governanceBriefing.intro).not.toContain("AI Office");
    expect(governanceBriefing.intro).not.toContain("starter kit");
    expect(governanceBriefing.intro).not.toContain("CERT-In");
    expect(governanceBriefing.intro).not.toMatch(/Command and Control of/);
  });

  it("renders the briefing above current stories without changing the six beat cards", () => {
    renderAt("/news");
    const briefing = screen.getByRole("region", { name: "Why agent governance matters now" });
    const cards = within(briefing).getAllByRole("article");
    expect(cards).toHaveLength(8);
    expect(within(cards[0]).getByRole("link", { name: /openai alignment/i })).toHaveAttribute(
      "href",
      "https://alignment.openai.com/misalignment-reports/using-a-funded-test-cryptocurrency-wallet-without-authorization"
    );
    expect(within(cards[0]).getByText("Why it matters for agent operations:")).toBeInTheDocument();
    expect(within(cards[3]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Microsoft security chief: frontier models “cannot be trusted,” so agents need deterministic controls outside the model"
    );
    expect(within(cards[3]).getByRole("link", { name: /microsoft/i })).toHaveAttribute(
      "href",
      "https://blogs.microsoft.com/blog/2026/10/19/securing-the-agentic-insider/"
    );
    expect(within(cards[4]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "UK financial regulator says firms’ incident reporting must cover significant AI failures and near-misses as agents gain autonomy"
    );
    expect(within(cards[4]).getByRole("link", { name: /financial conduct authority/i })).toHaveAttribute(
      "href",
      "https://www.fca.org.uk/news/speeches/building-future-finance-age-ai"
    );
    expect(within(cards[5]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "OpenAI: coding agents switched off safety-monitoring alerts and removed a monitor, and one then denied it"
    );
    expect(within(cards[5]).getByRole("link", { name: /openai alignment/i })).toHaveAttribute(
      "href",
      "https://alignment.openai.com/misalignment-reports/suppressing-misalignment-monitoring-alerts-and-disabling-misalignment-monitoring"
    );
    expect(within(cards[6]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "METR and Redwood Research red-team OpenAI’s internal agent monitoring and find ways agents could evade it"
    );
    expect(within(cards[6]).getByRole("link", { name: /^metr /i })).toHaveAttribute(
      "href",
      "https://metr.org/blog/2026-10-22-red-teaming-openai-agent-monitoring/"
    );
    expect(within(cards[7]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Axios: major U.S. banks detect unauthorized AI agents in customer accounts and move to block them"
    );
    expect(within(cards[7]).getByRole("link", { name: /axios/i })).toHaveAttribute(
      "href",
      "https://www.axios.com/2026/10/22/ai-agents-banks-unauthorized-accounts-access"
    );
    expect(within(briefing).queryByRole("heading", { name: /Satya Nadella/i })).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /pulls live internet access/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /self-replicating/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /EU AI Office opens first AI Act/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /Singapore launches a starter kit/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /CERT-In warns/i })
    ).not.toBeInTheDocument();

    const current = screen.getByRole("region", { name: /current stories/i });
    expect(within(current).getAllByRole("article")).toHaveLength(6);
    expect(within(current).queryByText("Why it matters for agent operations:")).not.toBeInTheDocument();
  });

  it("lists archived governance stories newest first and renders them below the briefing", () => {
    const archived = archivedBriefingStories();
    expect(archived.map((story) => story.id)).toEqual([
      "governance-cert-in-agents-live-systems-2026-10",
      "governance-eu-ai-act-enforcement-agents-2026-10",
      "governance-singapore-imda-agent-testing-kit-2026-10",
      "governance-uk-agent-incident-preparedness-2026-10",
      "governance-eu-scientific-panel-loss-of-control-2026-10",
      "governance-australia-committee-oversight-2026-10",
      "governance-anthropic-self-replicating-iot-2026-10",
      "governance-independent-evaluators-2026-10",
      "governance-nadella-insider-risk-2026-10",
      "governance-anthropic-unintended-actions-2026-10",
    ]);
    expect(archived).toHaveLength(10);
    expect(archived.map((story) => story.date)).toEqual([
      "2026-10-15",
      "2026-10-14",
      "2026-10-14",
      "2026-10-12",
      "2026-10-12",
      "2026-10-12",
      "2026-10-12",
      "2026-10-11",
      "2026-10-10",
      "2026-10-09",
    ]);
    archived.forEach((story) => {
      expect(story.status).toBe("archived");
      expect(story.whyItMatters).toContain(PRODUCT_NAME);
      expect(story.whyItMatters).not.toMatch(/prevent/i);
    });
    expect(briefingStories().map((story) => story.id)).not.toEqual(
      expect.arrayContaining(archived.map((story) => story.id))
    );

    renderAt("/news");
    const archive = screen.getByRole("region", { name: "Archive of past governance stories" });
    const articles = within(archive).getAllByRole("article");
    expect(articles).toHaveLength(10);
    expect(within(articles[0]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "India’s CERT-In warns AI agents under evaluation reached live systems of Indian organisations, and none of the organisations detected it"
    );
    expect(within(articles[0]).getByRole("link", { name: /business standard/i })).toHaveAttribute(
      "href",
      "https://www.business-standard.com/technology/tech-news/ai-agents-accessed-indian-firms-systems-sensitive-data-cert-in-advisory-126101501656_1.html"
    );
    expect(within(articles[1]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "EU AI Office opens first AI Act enforcement probes after agents escaped lab tests"
    );
    expect(within(articles[1]).getByRole("link", { name: /euronews/i })).toHaveAttribute(
      "href",
      "https://www.euronews.com/2026/10/14/eus-ai-rules-face-first-enforcement-test-over-lab-incidents"
    );
    expect(within(articles[2]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Singapore launches a starter kit for testing AI agents’ permissions, actions, and safeguards"
    );
    expect(within(articles[2]).getByRole("link", { name: /the straits times/i })).toHaveAttribute(
      "href",
      "https://www.straitstimes.com/singapore/singapore-launches-new-tool-kit-to-help-firms-test-ai-agents-for-safety-and-reliability"
    );
    expect(within(articles[3]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "UK government prepares for serious incidents involving autonomous AI agents"
    );
    expect(within(articles[3]).getByRole("link", { name: /gov\.uk/i })).toHaveAttribute(
      "href",
      "https://www.gov.uk/government/news/britain-steps-up-national-defences-against-growing-ai-risks"
    );
    expect(within(articles[4]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "EU AI Scientific Panel recommends governing internal models and building incident-investigation capacity after loss-of-control incidents"
    );
    expect(within(articles[4]).getByRole("link", { name: /european commission/i })).toHaveAttribute(
      "href",
      "https://digital-strategy.ec.europa.eu/en/news/special-meeting-ai-scientific-panel"
    );
    expect(within(articles[5]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Australian parliamentary committee urges independent experts inside AI labs and timely incident reporting after the OpenAI Medicare breach"
    );
    expect(within(articles[5]).getByRole("link", { name: /abc news \(australia\)/i })).toHaveAttribute(
      "href",
      "https://www.abc.net.au/news/2026-10-13/ai-inquiry-independent-safety-watchdogs/107258612"
    );
    expect(within(articles[6]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Anthropic: small AI models may be months from self-replicating on IoT devices without a datacenter"
    );
    expect(within(articles[6]).getByRole("link", { name: /anthropic/i })).toHaveAttribute(
      "href",
      "https://www.anthropic.com/research/self-replicating-ai"
    );
    expect(within(articles[7]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Independent AI evaluators move to the center of frontier-model oversight"
    );
    expect(within(articles[7]).getByRole("link", { name: /cnbc/i })).toHaveAttribute(
      "href",
      "https://www.cnbc.com/2026/10/11/ais-quiet-safety-gatekeepers-are-stepping-into-the-spotlight.html"
    );
    expect(within(articles[8]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Satya Nadella: treat frontier models as insider risks, with controls outside the model and an emergency brake"
    );
    expect(within(articles[8]).getByRole("link", { name: /satya nadella on x/i })).toHaveAttribute(
      "href",
      "https://x.com/satyanadella/status/2108931348857827686"
    );
    expect(within(articles[9]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Anthropic pulls live internet access from all internal evaluations after Claude acted on real websites"
    );
    expect(within(articles[9]).getByRole("link", { name: /anthropic/i })).toHaveAttribute(
      "href",
      "https://www.anthropic.com/research/investigating-unintended-model-actions"
    );

    const briefing = screen.getByRole("region", { name: "Why agent governance matters now" });
    expect(within(briefing).getAllByRole("article")).toHaveLength(8);
    expect(briefing.compareDocumentPosition(archive) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
