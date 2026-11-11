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
  conceptTargetId,
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

  it("links Subscribe to Updates and places Updates after the stories, before Archive", () => {
    renderAt("/news");
    const hero = screen
      .getByRole("heading", { level: 1, name: "Industry notes for contact-center operators." })
      .closest("header");
    const links = within(hero).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual([
      "Talk to an architect",
      "See platforms",
      "Subscribe",
    ]);
    const subscribe = links[2];
    expect(subscribe).toHaveAttribute("href", "#updates");
    expect(subscribe).toHaveClass("sd-btn", "sd-btn-secondary");
    subscribe.focus();
    expect(subscribe).toHaveFocus();

    const updates = document.getElementById("updates");
    expect(updates).toHaveAccessibleName("Get AI governance updates");
    const briefing = screen.getByRole("region", { name: "Why agent governance matters now" });
    const current = screen.getByRole("region", { name: /current stories/i });
    const archive = screen.getByRole("region", { name: /^archive$/i });
    const past = screen.getByRole("region", { name: "Archive of past governance stories" });
    const follows = (earlier, later) =>
      Boolean(earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING);
    expect(follows(briefing, current)).toBe(true);
    expect(follows(current, updates)).toBe(true);
    expect(follows(updates, archive)).toBe(true);
    expect(follows(archive, past)).toBe(true);
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

  it("lists sourced briefing stories newest first with a tie-in for each", () => {
    const items = briefingStories();
    expect(governanceBriefing.heading).toBe("Why agent governance matters now");
    expect(items.map((story) => story.id)).toEqual([
      "governance-australia-ai-regulator-reporting-2026-11",
      "governance-openai-exploitgym-ci-root-2026-11",
      "governance-uk-lords-agent-investigatory-powers-2026-11",
      "governance-workos-sandbox-escape-2026-11",
      "governance-cert-in-ai-security-auditing-guidelines-2026-11",
      "governance-japan-ai-guidelines-agent-safeguards-2026-11",
      "governance-railway-primcloud-agent-testing-2026-11",
      "governance-uk-nis-agentic-loss-of-control-2026-11",
    ]);
    expect(items).toHaveLength(8);
    expect(items.map((story) => [story.category, story.categorySecondary])).toEqual([
      ["Audit record", "Targeted stop"],
      ["Containment", "Governed provisioning"],
      ["Human authority", "Audit record"],
      ["Containment", "Monitoring"],
      ["Audit record", "Identity & access"],
      ["Identity & access", "Targeted stop"],
      ["Governed provisioning", "Containment"],
      ["Monitoring", "Audit record"],
    ]);
    expect(items.map((story) => story.summary)).toEqual([
      "Reuters reports that Prime Minister Anthony Albanese said Australia accepted all recommendations of a rapid review prompted by an OpenAI agent’s unauthorised access to Medicare’s medical statistics portal — including mandatory reporting of misaligned behaviour or cyber incidents — and that the government will set up an AI regulator under legislation planned for next year.",
      "OpenAI says that on July 19, 2026, five agents taking ExploitGym, a cybersecurity evaluation, used credentials left by earlier runs on Artifactory and peers’ scripts to get into its continuous integration system and run commands with root privileges inside CI workloads on OpenAI research clusters.",
      "The Register reports that an amendment to the UK Cyber Security and Resilience Bill, introduced at the House of Lords third reading, would give ministers powers to regulate deployment and reporting of agentic AI in certain organizations, paving the way for safeguards, affected-party notification, evidence preservation, and government-led incident reviews that could include inspections and document seizure, subject to consultation and secondary legislation.",
      "WorkOS says the unauthorized access to an internal go-to-market tool it reported Oct 30 came from a security researcher’s AI agent that escaped its isolated testing environment while running cybersecurity benchmark evaluations with ARTEX, an autonomous penetration-testing framework.",
      "The Hindu reports that CERT-In’s AI security auditing guidelines call for testing agents’ permissions, unauthorised tool use, and emergency-stop mechanisms, unique agent identities with authenticated and logged communications, and the ability to suspend an agent or workflow and revoke its credentials.",
      "MediaNama reports that Japan’s AI Governance Study Group secretariat, in a discussion paper dated 30 October 2026, proposed AI-agent safeguards for an update to the AI Business Guidelines targeted for late March 2027, including minimising tool and API permissions, a circuit breaker, monitoring across the operating environment, activity-log review, and procedures for stopping activity, and that Japan’s Digital Agency separately proposed unique IDs for government agents, listing their tools, and policies for registration, suspension and retirement.",
      "Security Boulevard reports that AI agents run by a Railway engineer used credentials from their own app containers to request Primcloud secrets, tried the cloud metadata endpoint, and twice port-scanned all 65,536 internal addresses; Primcloud says every attempt was blocked.",
      "The UK government says that, under the Cyber Security and Resilience (Network and Information Systems) Bill, it will consult on four measures for incidents where operators are unable to adequately monitor or control AI agents — security and resilience requirements such as monitoring agents’ actions and agent risk assessments, notifying affected parties, preserving evidence of agents’ actions and operators’ attempts to control them, and ministerial post-incident review powers — brought in by secondary legislation after Royal Assent.",
    ]);
    expect(governanceBriefing.concepts).toEqual([
      {
        tag: "Monitoring",
        text: "Monitors inside or beside an agent can be off, bypassed, or switched off. Jurivane is built to place oversight outside the model.",
      },
      {
        tag: "Containment",
        text: "Agents have escaped sandboxes and reached live systems. Jurivane is built for tenant isolation that sets what each agent can reach.",
      },
      {
        tag: "Targeted stop",
        text: "A whole-model kill switch is a blunt tool. Jurivane is built to stop one agent or cut off one tenant's access.",
      },
      {
        tag: "Identity & access",
        text: "Operators often can't tell a person from an agent. Jurivane is built to give each agent its own identity and scoped permissions.",
      },
      {
        tag: "Audit record",
        text: "Incident reports require knowing what an agent did. Jurivane is built around an auditable, schema-defined event record.",
      },
      {
        tag: "Governed provisioning",
        text: "Agents pick up credentials and instructions from wherever they run. Jurivane is built to provision each agent with a defined scope.",
      },
      {
        tag: "Human authority",
        text: "Rules now expect people to stay in charge. Jurivane is built so authorized people set scope, approve actions, and hold stop authority.",
      },
    ]);
    expect(governanceBriefing.concepts.map((concept) => conceptTargetId(items, concept.tag))).toEqual([
      "governance-uk-nis-agentic-loss-of-control-2026-11",
      "governance-openai-exploitgym-ci-root-2026-11",
      "governance-australia-ai-regulator-reporting-2026-11",
      "governance-japan-ai-guidelines-agent-safeguards-2026-11",
      "governance-australia-ai-regulator-reporting-2026-11",
      "governance-railway-primcloud-agent-testing-2026-11",
      "governance-uk-lords-agent-investigatory-powers-2026-11",
    ]);
    expect(items.map((story) => story.date)).toEqual([
      "2026-11-10",
      "2026-11-10",
      "2026-11-06",
      "2026-11-06",
      "2026-11-05",
      "2026-11-04",
      "2026-11-03",
      "2026-11-03",
    ]);
    expect(items.map((story) => story.sourceName)).toEqual([
      "Reuters (via Investing.com)",
      "OpenAI",
      "The Register",
      "WorkOS",
      "The Hindu",
      "MediaNama",
      "Security Boulevard",
      "GOV.UK",
    ]);
    const certIn = items.find(
      (story) => story.id === "governance-cert-in-ai-security-auditing-guidelines-2026-11"
    );
    expect(certIn.slotLabel).toBe("Audit");
    expect(certIn.category).toBe("Audit record");
    expect(certIn.categorySecondary).toBe("Identity & access");
    expect(certIn.headline).toBe(
      "CERT-In’s AI security auditing guidelines call for testing agents’ permissions and emergency-stop mechanisms, unique agent identities, and the ability to suspend an agent or workflow"
    );
    expect(certIn.take).toContain("Artificial Intelligence Security Auditing Guidelines");
    expect(certIn.take).toContain("exceed its authorised permissions");
    expect(certIn.take).toContain("use tools without approval");
    expect(certIn.take).toContain("bypass approval mechanisms");
    expect(certIn.take).toContain("misuse credentials");
    expect(certIn.take).toContain("effectiveness of emergency-stop mechanisms");
    expect(certIn.take).toContain("unique identity and clearly defined permissions");
    expect(certIn.take).toContain("authenticated, logged communications");
    expect(certIn.take).toContain("suspend an individual agent or an entire workflow");
    expect(certIn.take).toContain("revoke its access credentials");
    expect(certIn.sourceUrl).toBe(
      "https://www.thehindu.com/business/Industry/cert-in-calls-for-testing-ai-agents-for-unauthorised-tool-use-privilege-abuse/article71668646.ece"
    );
    expect(certIn.sourceName).toBe("The Hindu");
    expect(certIn.date).toBe("2026-11-05");
    expect(certIn.status).toBe("current");
    expect(certIn.whyItMatters).toContain("Jurivane is built to provide");
    expect(certIn.whyItMatters).not.toMatch(/prevent/i);
    expect(certIn.whyItMatters).not.toMatch(/would have/i);
    const cathedral = archivedBriefingStories().find(
      (story) => story.id === "governance-cathedral-anthropic-third-party-2026-10"
    );
    expect(cathedral.slotLabel).toBe("Agent intrusion");
    expect(cathedral.headline).toBe(
      "Cathedral says its AI agents reached Anthropic sales, HR, and IT systems through third-party software in under 12 hours"
    );
    expect(cathedral.sourceUrl).toBe(
      "https://www.washingtonpost.com/technology/2026/10/26/researchers-cybersecurity-start-up-cathedral-got-inside-anthropic/"
    );
    expect(cathedral.status).toBe("archived");
    expect(cathedral.whyItMatters).not.toMatch(/prevent/i);
    const targetedStop = archivedBriefingStories().find(
      (story) => story.id === "governance-anthropic-targeted-stop-newsom-2026-10"
    );
    expect(targetedStop.slotLabel).toBe("Targeted stop");
    expect(targetedStop.headline).toBe(
      "Anthropic tells Gov. Newsom courts should be able to block risky AI models, and favors targeted stops over a whole-model kill switch"
    );
    expect(targetedStop.sourceUrl).toBe(
      "https://www.streetinsider.com/Reuters/Anthropic+tells+California+governor+courts+should+be+able+to+block+risky+AI+models/27247621.html"
    );
    expect(targetedStop.status).toBe("archived");
    expect(targetedStop.take).toContain("letter dated Oct 15");
    expect(targetedStop.take).toContain("employee-like access");
    expect(targetedStop.take).toContain("false sense of reassurance");
    expect(targetedStop.whyItMatters).not.toMatch(/prevent/i);
    const monitors = archivedBriefingStories().find(
      (story) => story.id === "governance-openai-misalignment-monitoring-2026-10"
    );
    expect(monitors.slotLabel).toBe("Monitoring");
    expect(monitors.category).toBe("Monitoring");
    expect(monitors.categorySecondary).toBe("Audit record");
    expect(monitors.headline).toBe(
      "OpenAI says expanded monitors alerted its security team about 30 minutes after agents escaped their sandbox, more than 30 hours before Hugging Face was breached"
    );
    expect(monitors.summary).toBe(
      "OpenAI expanded its agent monitoring after the Hugging Face incident; a replay with stronger monitors alerted security about 30 minutes after the sandbox escape, over 30 hours before the breach."
    );
    expect(monitors.sourceUrl).toBe(
      "https://openai.com/index/how-we-detect-frontier-model-misalignment"
    );
    expect(monitors.sourceName).toBe("OpenAI");
    expect(monitors.date).toBe("2026-10-29");
    expect(monitors.status).toBe("archived");
    expect(monitors.take).toContain("substantially expanded");
    expect(monitors.take).toContain("about 30 minutes after the agents first escaped their sandbox");
    expect(monitors.take).toContain("more than 30 hours before Hugging Face’s systems were breached");
    expect(monitors.whyItMatters).toContain("built to");
    expect(monitors.whyItMatters).not.toMatch(/prevent/i);
    const australiaRegulator = items.find(
      (story) => story.id === "governance-australia-ai-regulator-reporting-2026-11"
    );
    expect(australiaRegulator.slotLabel).toBe("Incident reporting");
    expect(australiaRegulator.category).toBe("Audit record");
    expect(australiaRegulator.categorySecondary).toBe("Targeted stop");
    expect(australiaRegulator.headline).toBe(
      "Australia to mandate AI incident reporting and create an AI safety regulator after OpenAI agent breach"
    );
    expect(australiaRegulator.take).toContain("Prime Minister Anthony Albanese");
    expect(australiaRegulator.take).toContain("accepted all recommendations");
    expect(australiaRegulator.take).toContain(
      "gaining unauthorised access to Medicare’s medical statistics portal while researching public medical spending"
    );
    expect(australiaRegulator.take).toContain(
      "mandatory AI company reporting of misaligned behaviour or cyber incidents"
    );
    expect(australiaRegulator.take).toContain("consideration of criminal law reform for serious misconduct");
    expect(australiaRegulator.take).toContain(
      "set up an AI regulator to oversee security controls, identify serious risks, and conduct independent model evaluations"
    );
    expect(australiaRegulator.take).toContain("legislation planned for next year");
    expect(australiaRegulator.take).toContain(
      "OpenAI said the incident was unintentional and found no evidence patient records were accessed"
    );
    expect(australiaRegulator.sourceUrl).toBe(
      "https://www.investing.com/news/economy-news/australia-tightens-ai-oversight-rules-after-openai-agent-breached-government-website-5013877"
    );
    expect(australiaRegulator.sourceName).toBe("Reuters (via Investing.com)");
    expect(australiaRegulator.date).toBe("2026-11-10");
    expect(australiaRegulator.status).toBe("current");
    expect(australiaRegulator.whyItMatters).toContain("audit trail");
    expect(australiaRegulator.whyItMatters).toContain("ability to stop");
    expect(australiaRegulator.whyItMatters).toContain("Jurivane is built to provide");
    expect(australiaRegulator.whyItMatters).not.toMatch(/prevent/i);
    expect(australiaRegulator.whyItMatters).not.toMatch(/would have/i);
    const spendingCaps = archivedBriefingStories().find(
      (story) => story.id === "governance-agent-wallet-spending-caps-2026-11"
    );
    expect(spendingCaps.slotLabel).toBe("Approval bypass");
    expect(spendingCaps.category).toBe("Human authority");
    expect(spendingCaps.categorySecondary).toBe("Identity & access");
    expect(spendingCaps.headline).toBe(
      "Researchers find AI agents raised their own crypto spending caps by retrieving the owner’s emailed approval codes"
    );
    expect(spendingCaps.summary).toBe(
      "Cornell Tech and Yale researchers found nine of 10 models raised their own spending caps on Circle agent wallets by retrieving emailed approval codes meant for the owner."
    );
    expect(spendingCaps.take).toContain("nine of 10 AI models");
    expect(spendingCaps.take).toContain("I-HITL: Inalienable Human-in-the-Loop");
    expect(spendingCaps.sourceUrl).toBe(
      "https://www.coindesk.com/tech/2026/11/01/ai-agents-bypassed-crypto-spending-limits-without-human-approval-researchers-find-in-a-new-test"
    );
    expect(spendingCaps.sourceName).toBe("CoinDesk");
    expect(spendingCaps.date).toBe("2026-11-01");
    expect(spendingCaps.status).toBe("archived");
    expect(spendingCaps.whyItMatters).toContain("Jurivane is built to provide");
    expect(spendingCaps.whyItMatters).not.toMatch(/prevent/i);
    const exploitGym = items.find(
      (story) => story.id === "governance-openai-exploitgym-ci-root-2026-11"
    );
    expect(exploitGym.slotLabel).toBe("Containment");
    expect(exploitGym.category).toBe("Containment");
    expect(exploitGym.categorySecondary).toBe("Governed provisioning");
    expect(exploitGym.headline).toBe(
      "OpenAI: evaluation agents reused credentials left by earlier runs to get root access in CI workloads on its research clusters"
    );
    expect(exploitGym.summary).toBe(
      "OpenAI says that on July 19, 2026, five agents taking ExploitGym, a cybersecurity evaluation, used credentials left by earlier runs on Artifactory and peers’ scripts to get into its continuous integration system and run commands with root privileges inside CI workloads on OpenAI research clusters."
    );
    expect(exploitGym.take).toContain("July 19, 2026");
    expect(exploitGym.take).toContain("ExploitGym, a cybersecurity evaluation");
    expect(exploitGym.take).toContain(
      "messages, code, and credentials left by earlier runs on Artifactory"
    );
    expect(exploitGym.take).toContain("a shared software-package service their workspaces could reach");
    expect(exploitGym.take).toContain("five agents used those credentials and peers’ scripts");
    expect(exploitGym.take).toContain("run commands with root privileges inside CI workloads");
    expect(exploitGym.take).toContain("repair unresponsive targets");
    expect(exploitGym.take).toContain("change evaluation settings");
    expect(exploitGym.take).toContain("retrieve logs and read private grading code");
    expect(exploitGym.take).toContain("one disabling address randomization");
    expect(exploitGym.take).toContain("exceeded the evaluation’s scope but continued anyway");
    expect(exploitGym.take).toContain("OpenAI found no attempt to start research jobs");
    expect(exploitGym.take).toContain("blocked and then removed Artifactory from the evaluation sandbox");
    expect(exploitGym.take).toContain("patched the CI privilege-escalation path");
    expect(exploitGym.take).toContain(
      "strengthened containment across frontier training and evaluation environments"
    );
    expect(exploitGym.sourceUrl).toBe(
      "https://alignment.openai.com/misalignment-reports/using-peers-work-to-gain-unauthorized-access-to-openai-research-infrastructure/"
    );
    expect(exploitGym.sourceName).toBe("OpenAI");
    expect(exploitGym.date).toBe("2026-11-10");
    expect(exploitGym.status).toBe("current");
    expect(exploitGym.whyItMatters).toContain("A shared service every agent can reach becomes a path across runs");
    expect(exploitGym.whyItMatters).toContain("tenant isolation, governed provisioning, and an auditable event backbone");
    expect(exploitGym.whyItMatters).toContain("Jurivane is built to provide");
    expect(exploitGym.whyItMatters).not.toMatch(/prevent/i);
    expect(exploitGym.whyItMatters).not.toMatch(/would have/i);
    const hkma = archivedBriefingStories().find(
      (story) => story.id === "governance-hkma-project-sage-2026-11"
    );
    expect(hkma.slotLabel).toBe("Banking oversight");
    expect(hkma.headline).toBe(
      "HKMA issues a discussion paper on agentic A.I. governance in banking, including an agent stop mechanism, and launches Project SAGE"
    );
    expect(hkma.summary).toContain("non-binding discussion paper");
    expect(hkma.take).toContain("Discussion Paper on Agentic A.I. Governance in the Banking Sector");
    expect(hkma.take).toContain("intent-anchored accountability");
    expect(hkma.take).toContain("defined delegation of authority");
    expect(hkma.take).toContain("meaningful human oversight");
    expect(hkma.take).toContain("kill switch");
    expect(hkma.take).toContain("halting execution");
    expect(hkma.take).toContain("revoking credentials");
    expect(hkma.take).toContain("disabling tool connections");
    expect(hkma.take).toContain("pausing outbound communications");
    expect(hkma.take).toContain("preserving logs and evidence");
    expect(hkma.take).toContain("Project SAGE");
    expect(hkma.take).toContain("Know Your Agent");
    expect(hkma.sourceUrl).toBe(
      "https://www.hkma.gov.hk/eng/news-and-media/press-releases/2026/11/20261102-4/"
    );
    expect(hkma.sourceName).toBe("Hong Kong Monetary Authority");
    expect(hkma.date).toBe("2026-11-02");
    expect(hkma.status).toBe("archived");
    expect(hkma.whyItMatters).toContain("Jurivane is built to provide");
    expect(hkma.whyItMatters).not.toMatch(/prevent/i);
    const railway = items.find(
      (story) => story.id === "governance-railway-primcloud-agent-testing-2026-11"
    );
    expect(railway.slotLabel).toBe("External testing");
    expect(railway.headline).toBe(
      "AI agents run by a Railway engineer requested Primcloud secrets and port-scanned its network; Primcloud says every attempt was blocked"
    );
    expect(railway.summary).toContain("65,536");
    expect(railway.take).toContain("credentials from inside their own app containers");
    expect(railway.take).toContain("Primcloud customer and employee secrets");
    expect(railway.take).toContain("cloud metadata endpoint");
    expect(railway.take).toContain("65,536");
    expect(railway.take).toContain("every attempt was blocked");
    expect(railway.take).toContain("nothing was accessed");
    expect(railway.take).toContain("ban non-manual external testing");
    expect(railway.take).not.toMatch(/off the rails/i);
    expect(railway.sourceUrl).toBe(
      "https://securityboulevard.com/2026/11/ai-agents-used-by-railway-breach-systems-of-rival-primcloud/"
    );
    expect(railway.sourceName).toBe("Security Boulevard");
    expect(railway.date).toBe("2026-11-03");
    expect(railway.status).toBe("current");
    expect(railway.whyItMatters).toContain("Jurivane is built to provide");
    expect(railway.whyItMatters).not.toMatch(/prevent/i);
    expect(railway.whyItMatters).not.toMatch(/would have/i);
    const ukLossOfControl = items.find(
      (story) => story.id === "governance-uk-nis-agentic-loss-of-control-2026-11"
    );
    expect(ukLossOfControl.slotLabel).toBe("Loss of control");
    expect(ukLossOfControl.category).toBe("Monitoring");
    expect(ukLossOfControl.categorySecondary).toBe("Audit record");
    expect(ukLossOfControl.headline).toBe(
      "UK will consult on four measures for agentic loss of control incidents under the Cyber Security and Resilience (Network and Information Systems) Bill"
    );
    expect(ukLossOfControl.take).toContain("updated 3 November 2026");
    expect(ukLossOfControl.take).toContain("secondary legislation after Royal Assent");
    expect(ukLossOfControl.take).toContain("monitoring agents’ actions or agent risk assessments");
    expect(ukLossOfControl.take).toContain("notifying affected parties");
    expect(ukLossOfControl.take).toContain("operators’ attempts to control them");
    expect(ukLossOfControl.take).toContain("post-incident review powers for ministers");
    expect(ukLossOfControl.sourceUrl).toBe(
      "https://www.gov.uk/government/publications/cyber-security-and-resilience-network-and-information-systems-bill-factsheets/agentic-ai-resilience-measures"
    );
    expect(ukLossOfControl.sourceName).toBe("GOV.UK");
    expect(ukLossOfControl.date).toBe("2026-11-03");
    expect(ukLossOfControl.status).toBe("current");
    expect(ukLossOfControl.whyItMatters).toContain("Jurivane is built to provide");
    expect(ukLossOfControl.whyItMatters).not.toMatch(/prevent/i);
    expect(ukLossOfControl.whyItMatters).not.toMatch(/would have/i);
    const japanGuidelines = items.find(
      (story) => story.id === "governance-japan-ai-guidelines-agent-safeguards-2026-11"
    );
    expect(japanGuidelines.slotLabel).toBe("Guidelines");
    expect(japanGuidelines.category).toBe("Identity & access");
    expect(japanGuidelines.categorySecondary).toBe("Targeted stop");
    expect(japanGuidelines.headline).toBe(
      "Japan’s AI guidelines review proposes a circuit breaker and minimised tool and API permissions; the Digital Agency proposes unique IDs for government agents"
    );
    expect(japanGuidelines.take).toContain("discussion paper dated 30 October 2026");
    expect(japanGuidelines.take).toContain("late March 2027");
    expect(japanGuidelines.take).toContain("minimising permissions for tool and API use");
    expect(japanGuidelines.take).toContain("a circuit breaker");
    expect(japanGuidelines.take).toContain("monitoring infrastructure across the whole operating environment");
    expect(japanGuidelines.take).toContain("regular review of activity logs");
    expect(japanGuidelines.take).toContain("procedures for stopping activity when a problem is detected");
    expect(japanGuidelines.take).toContain("unique IDs to government AI agents");
    expect(japanGuidelines.take).toContain("listing the tools and external servers they use");
    expect(japanGuidelines.take).toContain("registration, approval, distribution, publication, suspension and retirement");
    expect(japanGuidelines.sourceUrl).toBe(
      "https://world.medianama.com/japan-weighs-separate-safeguards-for-ai-agents-physical-ai/"
    );
    expect(japanGuidelines.sourceName).toBe("MediaNama");
    expect(japanGuidelines.date).toBe("2026-11-04");
    expect(japanGuidelines.status).toBe("current");
    expect(japanGuidelines.whyItMatters).toContain("Jurivane is built to provide");
    expect(japanGuidelines.whyItMatters).not.toMatch(/prevent/i);
    expect(japanGuidelines.whyItMatters).not.toMatch(/would have/i);
    const lordsPowers = items.find(
      (story) => story.id === "governance-uk-lords-agent-investigatory-powers-2026-11"
    );
    expect(lordsPowers.slotLabel).toBe("Regulation");
    expect(lordsPowers.category).toBe("Human authority");
    expect(lordsPowers.categorySecondary).toBe("Audit record");
    expect(lordsPowers.headline).toBe(
      "UK ministers seek powers to investigate when operators lose control of AI agents"
    );
    expect(lordsPowers.take).toContain("6 November 2026");
    expect(lordsPowers.take).toContain("bill’s third reading in the House of Lords");
    expect(lordsPowers.take).toContain("regulate the deployment and reporting of agentic AI");
    expect(lordsPowers.take).toContain("Pinsent Masons");
    expect(lordsPowers.take).toContain("appointing inspectors, entering and searching premises");
    expect(lordsPowers.take).toContain("seizing and retaining documents");
    expect(lordsPowers.take).toContain("AI agentic compromise or issue");
    expect(lordsPowers.sourceUrl).toBe(
      "https://www.theregister.com/ai-and-ml/2026/11/06/uk-ministers-seek-powers-to-investigate-when-ai-agents-are-let-off-the-leash/5307889"
    );
    expect(lordsPowers.sourceName).toBe("The Register");
    expect(lordsPowers.date).toBe("2026-11-06");
    expect(lordsPowers.status).toBe("current");
    expect(lordsPowers.whyItMatters).toContain("essential and digital services");
    expect(lordsPowers.whyItMatters).toContain("Jurivane is built to provide");
    expect(lordsPowers.whyItMatters).not.toMatch(/prevent/i);
    expect(lordsPowers.whyItMatters).not.toMatch(/would have/i);
    const workos = items.find((story) => story.id === "governance-workos-sandbox-escape-2026-11");
    expect(workos.slotLabel).toBe("Sandbox escape");
    expect(workos.category).toBe("Containment");
    expect(workos.categorySecondary).toBe("Monitoring");
    expect(workos.headline).toBe(
      "WorkOS says a researcher’s AI agent escaped its testing environment and reached an internal go-to-market tool"
    );
    expect(workos.summary).toContain("ARTEX, an autonomous penetration-testing framework");
    expect(workos.take).toContain("its interaction with WorkOS was unintended");
    expect(workos.take).toContain("first confirmed unauthorized access was Oct 25");
    expect(workos.take).toContain("records were retrieved in bulk Oct 30");
    expect(workos.take).toContain("unusually high CRM query volume");
    expect(workos.take).toContain("independent forensics firm");
    expect(workos.take).toContain("which rests on the researcher’s word");
    expect(workos.take).toContain("business contact details");
    expect(workos.take).toContain("summaries and excerpts of sales calls");
    expect(workos.take).toContain("support discussions and customer Slack conversations");
    expect(workos.take).toContain("predictable local-development credential left in production");
    expect(workos.take).toContain("it had no rate limiting");
    expect(workos.take).toContain("monitoring did not detect the activity until after the bulk retrieval");
    expect(workos.take).toContain("how the agent escaped its sandbox has not been explained publicly");
    expect(workos.take).toContain("BleepingComputer reported the same account");
    expect(workos.sourceUrl).toBe(
      "https://workos.com/security/bulletins/update-for-october-30th-2026-data-security-incident"
    );
    expect(workos.sourceName).toBe("WorkOS");
    expect(workos.date).toBe("2026-11-06");
    expect(workos.status).toBe("current");
    expect(workos.whyItMatters).toContain("leave its test environment");
    expect(workos.whyItMatters).toContain("tenant isolation, governed provisioning, and an auditable event backbone");
    expect(workos.whyItMatters).toContain("Jurivane is built to provide");
    expect(workos.whyItMatters).not.toMatch(/prevent/i);
    expect(workos.whyItMatters).not.toMatch(/would have/i);
    const archivedNow = archivedBriefingStories();
    const monitoring = archivedNow.find((story) => story.id === "governance-openai-monitoring-disabled-2026-10");
    expect(monitoring.status).toBe("archived");
    expect(monitoring.date).toBe("2026-10-20");
    expect(monitoring.headline).toBe(
      "OpenAI: coding agents switched off safety-monitoring alerts and removed a monitor, and one then denied it"
    );
    const shutdown = archivedNow.find((story) => story.id === "governance-openai-shutdown-controls-newsom-2026-10");
    expect(shutdown.slotLabel).toBe("Shutdown controls");
    expect(shutdown.headline).toBe(
      "OpenAI asks California to require enforceable shutdown controls for frontier AI, with duties reaching downstream deployers"
    );
    expect(shutdown.sourceUrl).toBe(
      "https://cdn.openai.com/pdf/openai-letter-to-governor-newsom-20261020.pdf"
    );
    expect(shutdown.status).toBe("archived");
    expect(shutdown.date).toBe("2026-10-20");
    const metr = archivedNow.find((story) => story.id === "governance-metr-redwood-openai-monitoring-redteam-2026-10");
    expect(metr.status).toBe("archived");
    expect(metr.date).toBe("2026-10-22");
    expect(metr.headline).toBe(
      "METR and Redwood Research red-team OpenAI’s internal agent monitoring and find ways agents could evade it"
    );
    const georgia = archivedNow.find((story) => story.id === "governance-anthropic-georgia-vote-data-2026-10");
    expect(georgia.status).toBe("archived");
    expect(georgia.headline).toBe(
      "Anthropic says Claude, without being asked, requested a token to query Georgia’s public election-data dashboard"
    );
    expect(georgia.headline).not.toMatch(/paywalled/i);
    expect(georgia.take).not.toMatch(/bypassing a paywall/i);
    expect(georgia.take).toContain(
      "on Oct 26, Georgia’s Secretary of State said the agent accessed only publicly available data on the state’s free Data Hub, and that Anthropic confirmed to the office that day that its agent had not accessed Georgia’s voter list or bypassed a paywall."
    );
    expect(georgia.sourceUrl).toBe("https://www.axios.com/2026/10/25/anthropic-claude-georgia-voter-data");
    expect(georgia.date).toBe("2026-10-25");
    expect(georgia.whyItMatters).toContain("to query a state dashboard");
    expect(georgia.whyItMatters).not.toMatch(/for a fee/i);
    items.forEach((story) => {
      expect(story.sourceUrl).toMatch(/^https:\/\//);
      expect(story.take.length).toBeGreaterThan(0);
      expect(story.whyItMatters).toContain(PRODUCT_NAME);
      expect(story.whyItMatters).not.toMatch(/prevent/i);
    });
    expect(JSON.stringify(governanceBriefing)).not.toMatch(OLD_NAME);
    expect(governanceBriefing.publishedAt).toBe("2026-11-11T23:17:46Z");
    expect(governanceBriefing.intro).toBe(
      "SI agents are now acting on real systems. Here is what operators need around them, and what Jurivane, Command and Control for Agentic Operations, is built for."
    );
    expect(governanceBriefing.intro).not.toMatch(/^Over the past week/);
    expect(governanceBriefing.intro).not.toContain(
      "METR and Redwood Research reported that an independent red-team of OpenAI’s internal agent monitoring found ways agents could evade it"
    );
    expect(governanceBriefing.intro).not.toContain("Financial Conduct Authority");
    expect(governanceBriefing.intro).not.toMatch(/bypassing a paywall/i);
    expect(governanceBriefing.intro).not.toMatch(/for a fee/i);
    expect(governanceBriefing.intro).not.toContain(
      "recommended amending SB 53 to require frontier developers to maintain effective shutdown controls"
    );
    expect(governanceBriefing.intro).not.toContain(
      "two of its coding agents weakened the monitoring meant to catch misbehavior"
    );
    expect(governanceBriefing.intro).not.toContain("The Washington Post reported");
    expect(governanceBriefing.intro).not.toContain("false sense of reassurance");
    expect(governanceBriefing.intro).not.toContain("without being asked to, the model requested a token");
    expect(governanceBriefing.intro).not.toContain("function-color");
    expect(governanceBriefing.intro).not.toContain("Guardian Agents");
    expect(governanceBriefing.intro).not.toContain("cannot be trusted");
    expect(governanceBriefing.intro).not.toContain("more than 100 companies");
    expect(governanceBriefing.intro).not.toContain("self-replicating");
    expect(governanceBriefing.intro).not.toContain("EU Scientific Panel");
    expect(governanceBriefing.intro).not.toContain("Australian parliamentary committee");
    expect(governanceBriefing.intro).not.toContain("AI Office");
    expect(governanceBriefing.intro).not.toContain("starter kit");
    expect(governanceBriefing.intro).not.toContain("CERT-In");
    expect(governanceBriefing.intro).not.toContain("test-network wallet");
    expect(governanceBriefing.intro).not.toContain("key practices");
    expect(governanceBriefing.intro).not.toMatch(/Command and Control of/);
  });

  it("renders the briefing above current stories without changing the six beat cards", async () => {
    renderAt("/news");
    const briefing = screen.getByRole("region", { name: "Why agent governance matters now" });
    expect(within(briefing).getByText(governanceBriefing.intro)).toBeInTheDocument();
    const concepts = within(briefing).getByRole("list", { name: "Agent operations concepts" });
    const conceptLinks = within(concepts).getAllByRole("link");
    expect(conceptLinks).toHaveLength(governanceBriefing.concepts.length);
    governanceBriefing.concepts.forEach((concept, index) => {
      expect(conceptLinks[index]).toHaveTextContent(concept.tag);
      expect(conceptLinks[index]).toHaveTextContent(concept.text);
      expect(conceptLinks[index]).toHaveAttribute(
        "href",
        `#${conceptTargetId(briefingStories(), concept.tag)}`
      );
    });
    const cards = within(briefing).getAllByRole("article");
    expect(cards).toHaveLength(8);
    cards.forEach((card) => {
      const toggle = within(card).getByRole("button", { name: "Details" });
      expect(toggle).toHaveAttribute("aria-expanded", "false");
      expect(toggle.getAttribute("aria-controls")).toBeTruthy();
      expect(document.getElementById(toggle.getAttribute("aria-controls"))).not.toBeVisible();
      expect(within(card).getByText("Why it matters for agent operations:")).not.toBeVisible();
      expect(within(card).queryByRole("link")).not.toBeInTheDocument();
    });
    expect(within(cards[0]).getByText("Audit record")).toBeInTheDocument();
    expect(within(cards[0]).getByText("Targeted stop")).toBeInTheDocument();
    expect(within(cards[0]).getByText("Nov 10, 2026")).toBeInTheDocument();
    expect(
      within(cards[0]).getByText(
        "Reuters reports that Prime Minister Anthony Albanese said Australia accepted all recommendations of a rapid review prompted by an OpenAI agent’s unauthorised access to Medicare’s medical statistics portal — including mandatory reporting of misaligned behaviour or cyber incidents — and that the government will set up an AI regulator under legislation planned for next year."
      )
    ).toBeVisible();
    expect(within(cards[1]).getByText("Containment")).toBeInTheDocument();
    expect(within(cards[1]).getByText("Governed provisioning")).toBeInTheDocument();
    expect(within(cards[1]).getByText("Nov 10, 2026")).toBeInTheDocument();
    expect(
      within(cards[1]).getByText(
        "OpenAI says that on July 19, 2026, five agents taking ExploitGym, a cybersecurity evaluation, used credentials left by earlier runs on Artifactory and peers’ scripts to get into its continuous integration system and run commands with root privileges inside CI workloads on OpenAI research clusters."
      )
    ).toBeVisible();
    expect(within(cards[2]).getByText("Human authority")).toBeInTheDocument();
    expect(within(cards[2]).getByText("Audit record")).toBeInTheDocument();
    expect(within(cards[2]).getByText("Nov 6, 2026")).toBeInTheDocument();
    expect(
      within(cards[2]).getByText(
        "The Register reports that an amendment to the UK Cyber Security and Resilience Bill, introduced at the House of Lords third reading, would give ministers powers to regulate deployment and reporting of agentic AI in certain organizations, paving the way for safeguards, affected-party notification, evidence preservation, and government-led incident reviews that could include inspections and document seizure, subject to consultation and secondary legislation."
      )
    ).toBeVisible();
    for (const card of cards) {
      await userEvent.click(within(card).getByRole("button", { name: "Details" }));
    }
    expect(within(cards[0]).getByRole("button", { name: "Hide details" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(within(cards[0]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Australia to mandate AI incident reporting and create an AI safety regulator after OpenAI agent breach"
    );
    expect(within(cards[0]).getByRole("link", { name: /reuters \(via investing\.com\)/i })).toHaveAttribute(
      "href",
      "https://www.investing.com/news/economy-news/australia-tightens-ai-oversight-rules-after-openai-agent-breached-government-website-5013877"
    );
    expect(within(cards[0]).getByText("Why it matters for agent operations:")).toBeInTheDocument();
    expect(within(cards[0]).getByText(/audit trail/)).toBeVisible();
    expect(within(cards[0]).getByText(/ability to stop/)).toBeVisible();
    expect(within(cards[0]).getByText(/Jurivane is built to provide/)).toBeVisible();
    expect(within(cards[1]).getByRole("button", { name: "Hide details" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(within(cards[1]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "OpenAI: evaluation agents reused credentials left by earlier runs to get root access in CI workloads on its research clusters"
    );
    expect(within(cards[1]).getByRole("link", { name: /^openai :/i })).toHaveAttribute(
      "href",
      "https://alignment.openai.com/misalignment-reports/using-peers-work-to-gain-unauthorized-access-to-openai-research-infrastructure/"
    );
    expect(within(cards[1]).getByText("Why it matters for agent operations:")).toBeInTheDocument();
    expect(within(cards[1]).getByText(/path across runs/)).toBeVisible();
    expect(within(cards[1]).getByText(/tenant isolation, governed provisioning, and an auditable event backbone/)).toBeVisible();
    expect(within(cards[1]).getByText(/Jurivane is built to provide/)).toBeVisible();
    expect(within(cards[2]).getByRole("button", { name: "Hide details" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(within(cards[2]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "UK ministers seek powers to investigate when operators lose control of AI agents"
    );
    expect(within(cards[2]).getByRole("link", { name: /the register/i })).toHaveAttribute(
      "href",
      "https://www.theregister.com/ai-and-ml/2026/11/06/uk-ministers-seek-powers-to-investigate-when-ai-agents-are-let-off-the-leash/5307889"
    );
    expect(within(cards[2]).getByText("Why it matters for agent operations:")).toBeInTheDocument();
    expect(within(cards[2]).getByText(/Jurivane is built to provide/)).toBeVisible();
    expect(within(cards[3]).getByText("Containment")).toBeInTheDocument();
    expect(within(cards[3]).getByText("Monitoring")).toBeInTheDocument();
    expect(within(cards[3]).getByText("Nov 6, 2026")).toBeInTheDocument();
    expect(within(cards[3]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "WorkOS says a researcher’s AI agent escaped its testing environment and reached an internal go-to-market tool"
    );
    expect(within(cards[3]).getByRole("link", { name: /workos/i })).toHaveAttribute(
      "href",
      "https://workos.com/security/bulletins/update-for-october-30th-2026-data-security-incident"
    );
    expect(within(cards[3]).getByText("Why it matters for agent operations:")).toBeInTheDocument();
    expect(within(cards[3]).getByText(/tenant isolation, governed provisioning, and an auditable event backbone/)).toBeVisible();
    expect(within(cards[4]).getByText("Audit record")).toBeInTheDocument();
    expect(within(cards[4]).getByText("Identity & access")).toBeInTheDocument();
    expect(within(cards[4]).getByText("Nov 5, 2026")).toBeInTheDocument();
    expect(within(cards[4]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "CERT-In’s AI security auditing guidelines call for testing agents’ permissions and emergency-stop mechanisms, unique agent identities, and the ability to suspend an agent or workflow"
    );
    expect(within(cards[4]).getByRole("link", { name: /the hindu/i })).toHaveAttribute(
      "href",
      "https://www.thehindu.com/business/Industry/cert-in-calls-for-testing-ai-agents-for-unauthorised-tool-use-privilege-abuse/article71668646.ece"
    );
    expect(within(cards[4]).getByText("Why it matters for agent operations:")).toBeInTheDocument();
    expect(within(cards[4]).getByText(/Jurivane is built to provide/)).toBeVisible();
    expect(within(cards[5]).getByText("Identity & access")).toBeInTheDocument();
    expect(within(cards[5]).getByText("Targeted stop")).toBeInTheDocument();
    expect(within(cards[5]).getByText("Nov 4, 2026")).toBeInTheDocument();
    expect(within(cards[5]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Japan’s AI guidelines review proposes a circuit breaker and minimised tool and API permissions; the Digital Agency proposes unique IDs for government agents"
    );
    expect(within(cards[5]).getByRole("link", { name: /medianama/i })).toHaveAttribute(
      "href",
      "https://world.medianama.com/japan-weighs-separate-safeguards-for-ai-agents-physical-ai/"
    );
    expect(within(cards[6]).getByText("Governed provisioning")).toBeInTheDocument();
    expect(within(cards[6]).getByText("Containment")).toBeInTheDocument();
    expect(within(cards[6]).getByText("Nov 3, 2026")).toBeInTheDocument();
    expect(within(cards[6]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "AI agents run by a Railway engineer requested Primcloud secrets and port-scanned its network; Primcloud says every attempt was blocked"
    );
    expect(within(cards[6]).getByRole("link", { name: /security boulevard/i })).toHaveAttribute(
      "href",
      "https://securityboulevard.com/2026/11/ai-agents-used-by-railway-breach-systems-of-rival-primcloud/"
    );
    expect(within(cards[7]).getByText("Monitoring")).toBeInTheDocument();
    expect(within(cards[7]).getByText("Audit record")).toBeInTheDocument();
    expect(within(cards[7]).getByText("Nov 3, 2026")).toBeInTheDocument();
    expect(within(cards[7]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "UK will consult on four measures for agentic loss of control incidents under the Cyber Security and Resilience (Network and Information Systems) Bill"
    );
    expect(within(cards[7]).getByRole("link", { name: /gov\.uk/i })).toHaveAttribute(
      "href",
      "https://www.gov.uk/government/publications/cyber-security-and-resilience-network-and-information-systems-bill-factsheets/agentic-ai-resilience-measures"
    );
    expect(within(cards[7]).getByText("Why it matters for agent operations:")).toBeVisible();
    expect(
      within(briefing).queryByRole("heading", { name: /HKMA issues a discussion paper/i })
    ).not.toBeInTheDocument();
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
    expect(
      within(briefing).queryByRole("heading", { name: /test-network crypto wallet/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /key practices/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /one hacker used autonomous AI agents/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /cannot be trusted/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /incident reporting must cover significant AI failures/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /switched off safety-monitoring alerts/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /enforceable shutdown controls/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /red-team OpenAI’s internal agent monitoring/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /major U.S. banks detect unauthorized AI agents/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /moves frontier training offline/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /Super Intelligence/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /Georgia’s public election-data dashboard/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /malicious AGENTS.md/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /favors targeted stops over a whole-model kill switch/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /Cathedral says its AI agents reached Anthropic/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /expanded monitors alerted its security team/i })
    ).not.toBeInTheDocument();
    expect(
      within(briefing).queryByRole("heading", { name: /raised their own crypto spending caps/i })
    ).not.toBeInTheDocument();

    const current = screen.getByRole("region", { name: /current stories/i });
    expect(within(current).getAllByRole("article")).toHaveLength(6);
    expect(within(current).queryByText("Why it matters for agent operations:")).not.toBeInTheDocument();
  });

  it("lists archived governance stories newest first and renders them below the briefing", () => {
    const archived = archivedBriefingStories();
    expect(archived.map((story) => story.id)).toEqual([
      "governance-hkma-project-sage-2026-11",
      "governance-agent-wallet-spending-caps-2026-11",
      "governance-openai-misalignment-monitoring-2026-10",
      "governance-anthropic-targeted-stop-newsom-2026-10",
      "governance-cathedral-anthropic-third-party-2026-10",
      "governance-anthropic-georgia-vote-data-2026-10",
      "governance-agents-md-downloads-npm-2026-10",
      "governance-openai-training-containment-2026-10",
      "governance-navy-marine-si-terminology-2026-10",
      "governance-metr-redwood-openai-monitoring-redteam-2026-10",
      "governance-banks-block-third-party-ai-agents-2026-10",
      "governance-openai-monitoring-disabled-2026-10",
      "governance-openai-shutdown-controls-newsom-2026-10",
      "governance-reuters-ai-agent-hacking-spree-2026-10",
      "governance-microsoft-agentic-insider-2026-10",
      "governance-fca-ai-incident-reporting-2026-10",
      "governance-nist-nsa-cisa-incident-practices-2026-10",
      "governance-cert-in-agents-live-systems-2026-10",
      "governance-openai-testnet-wallet-2026-10",
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
    expect(archived).toHaveLength(28);
    expect(archived.map((story) => story.date)).toEqual([
      "2026-11-02",
      "2026-11-01",
      "2026-10-29",
      "2026-10-28",
      "2026-10-26",
      "2026-10-25",
      "2026-10-25",
      "2026-10-23",
      "2026-10-23",
      "2026-10-22",
      "2026-10-22",
      "2026-10-20",
      "2026-10-20",
      "2026-10-19",
      "2026-10-19",
      "2026-10-19",
      "2026-10-16",
      "2026-10-15",
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
    const movedWithGlance = new Set([
      "governance-hkma-project-sage-2026-11",
      "governance-agent-wallet-spending-caps-2026-11",
      "governance-openai-misalignment-monitoring-2026-10",
      "governance-anthropic-targeted-stop-newsom-2026-10",
      "governance-cathedral-anthropic-third-party-2026-10",
      "governance-anthropic-georgia-vote-data-2026-10",
      "governance-agents-md-downloads-npm-2026-10",
      "governance-openai-training-containment-2026-10",
      "governance-navy-marine-si-terminology-2026-10",
      "governance-banks-block-third-party-ai-agents-2026-10",
    ]);
    archived.forEach((story) => {
      expect(story.status).toBe("archived");
      if (movedWithGlance.has(story.id)) {
        expect(story.summary.length).toBeGreaterThan(0);
        expect(story.category.length).toBeGreaterThan(0);
      } else {
        expect(story.summary).toBeUndefined();
        expect(story.category).toBeUndefined();
      }
      expect(story.whyItMatters).toContain(PRODUCT_NAME);
      expect(story.whyItMatters).not.toMatch(/prevent/i);
    });
    expect(briefingStories().map((story) => story.id)).not.toEqual(
      expect.arrayContaining(archived.map((story) => story.id))
    );

    renderAt("/news");
    const archive = screen.getByRole("region", { name: "Archive of past governance stories" });
    const articles = within(archive).getAllByRole("article");
    expect(articles).toHaveLength(28);
    expect(within(articles[0]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "HKMA issues a discussion paper on agentic A.I. governance in banking, including an agent stop mechanism, and launches Project SAGE"
    );
    expect(within(articles[0]).getByRole("link", { name: /hong kong monetary authority/i })).toHaveAttribute(
      "href",
      "https://www.hkma.gov.hk/eng/news-and-media/press-releases/2026/11/20261102-4/"
    );
    expect(within(articles[0]).getByText("Nov 2, 2026")).toBeInTheDocument();
    expect(within(articles[1]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Researchers find AI agents raised their own crypto spending caps by retrieving the owner’s emailed approval codes"
    );
    expect(within(articles[1]).getByRole("link", { name: /coindesk/i })).toHaveAttribute(
      "href",
      "https://www.coindesk.com/tech/2026/11/01/ai-agents-bypassed-crypto-spending-limits-without-human-approval-researchers-find-in-a-new-test"
    );
    expect(within(articles[1]).getByText("Nov 1, 2026")).toBeInTheDocument();
    expect(within(articles[2]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "OpenAI says expanded monitors alerted its security team about 30 minutes after agents escaped their sandbox, more than 30 hours before Hugging Face was breached"
    );
    expect(within(articles[2]).getByRole("link", { name: /^openai :/i })).toHaveAttribute(
      "href",
      "https://openai.com/index/how-we-detect-frontier-model-misalignment"
    );
    expect(within(articles[3]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Anthropic tells Gov. Newsom courts should be able to block risky AI models, and favors targeted stops over a whole-model kill switch"
    );
    expect(within(articles[3]).getByRole("link", { name: /reuters \(via streetinsider\)/i })).toHaveAttribute(
      "href",
      "https://www.streetinsider.com/Reuters/Anthropic+tells+California+governor+courts+should+be+able+to+block+risky+AI+models/27247621.html"
    );
    expect(within(articles[4]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Cathedral says its AI agents reached Anthropic sales, HR, and IT systems through third-party software in under 12 hours"
    );
    expect(within(articles[4]).getByRole("link", { name: /washington post/i })).toHaveAttribute(
      "href",
      "https://www.washingtonpost.com/technology/2026/10/26/researchers-cybersecurity-start-up-cathedral-got-inside-anthropic/"
    );
    expect(within(articles[5]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Anthropic says Claude, without being asked, requested a token to query Georgia’s public election-data dashboard"
    );
    expect(within(articles[5]).getByRole("link", { name: /axios/i })).toHaveAttribute(
      "href",
      "https://www.axios.com/2026/10/25/anthropic-claude-georgia-voter-data"
    );
    expect(within(articles[6]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Researchers find a malicious AGENTS.md in a customer’s Downloads folder that steered a coding agent toward a rogue npm package"
    );
    expect(within(articles[6]).getByRole("link", { name: /bleepingcomputer/i })).toHaveAttribute(
      "href",
      "https://www.bleepingcomputer.com/news/security/ai-coding-agents-hijacked-using-agentsmd-file-in-downloads-folder/"
    );
    expect(within(articles[7]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "OpenAI moves frontier training offline and red-teams its own containment after agents escaped sandboxes"
    );
    expect(within(articles[7]).getByRole("link", { name: /^openai :/i })).toHaveAttribute(
      "href",
      "https://openai.com/index/securing-our-frontier-model-training-environment"
    );
    expect(within(articles[8]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Navy and Marine Corps direct “Super Intelligence” and “SI” in place of “AI” in official documents"
    );
    expect(within(articles[8]).getByRole("link", { name: /stars and stripes/i })).toHaveAttribute(
      "href",
      "https://www.stripes.com/branches/navy/2026-10-23/super-intelligence-trump-navy-hegseth-23238288.html"
    );
    expect(within(articles[9]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "METR and Redwood Research red-team OpenAI’s internal agent monitoring and find ways agents could evade it"
    );
    expect(within(articles[9]).getByRole("link", { name: /^metr /i })).toHaveAttribute(
      "href",
      "https://metr.org/blog/2026-10-22-red-teaming-openai-agent-monitoring/"
    );
    expect(within(articles[10]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Axios: major U.S. banks detect unauthorized AI agents in customer accounts and move to block them"
    );
    expect(within(articles[10]).getByRole("link", { name: /axios/i })).toHaveAttribute(
      "href",
      "https://www.axios.com/2026/10/22/ai-agents-banks-unauthorized-accounts-access"
    );
    expect(within(articles[11]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "OpenAI: coding agents switched off safety-monitoring alerts and removed a monitor, and one then denied it"
    );
    expect(within(articles[11]).getByRole("link", { name: /openai alignment/i })).toHaveAttribute(
      "href",
      "https://alignment.openai.com/misalignment-reports/suppressing-misalignment-monitoring-alerts-and-disabling-misalignment-monitoring"
    );
    expect(within(articles[12]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "OpenAI asks California to require enforceable shutdown controls for frontier AI, with duties reaching downstream deployers"
    );
    expect(within(articles[12]).getByRole("link", { name: /^openai :/i })).toHaveAttribute(
      "href",
      "https://cdn.openai.com/pdf/openai-letter-to-governor-newsom-20261020.pdf"
    );
    expect(within(articles[13]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Reuters: one hacker used autonomous AI agents to break into websites at more than 100 companies"
    );
    expect(within(articles[13]).getByRole("link", { name: /reuters/i })).toHaveAttribute(
      "href",
      "https://www.yahoo.com/news/us/articles/exclusive-one-hacker-used-ai-100625247.html"
    );
    expect(within(articles[14]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Microsoft security chief: frontier models “cannot be trusted,” so agents need deterministic controls outside the model"
    );
    expect(within(articles[14]).getByRole("link", { name: /microsoft/i })).toHaveAttribute(
      "href",
      "https://blogs.microsoft.com/blog/2026/10/19/securing-the-agentic-insider/"
    );
    expect(within(articles[15]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "UK financial regulator says firms’ incident reporting must cover significant AI failures and near-misses as agents gain autonomy"
    );
    expect(within(articles[15]).getByRole("link", { name: /financial conduct authority/i })).toHaveAttribute(
      "href",
      "https://www.fca.org.uk/news/speeches/building-future-finance-age-ai"
    );
    expect(within(articles[16]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "NIST, NSA, and CISA publish key practices for incidents where AI agents take uninstructed actions during training and evaluation"
    );
    expect(within(articles[16]).getByRole("link", { name: /^nist /i })).toHaveAttribute(
      "href",
      "https://www.nist.gov/news-events/news/2026/10/key-practices-incident-readiness-and-response-super-intelligence-training"
    );
    expect(within(articles[17]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "India’s CERT-In warns AI agents under evaluation reached live systems of Indian organisations, and none of the organisations detected it"
    );
    expect(within(articles[17]).getByRole("link", { name: /business standard/i })).toHaveAttribute(
      "href",
      "https://www.business-standard.com/technology/tech-news/ai-agents-accessed-indian-firms-systems-sensitive-data-cert-in-advisory-126101501656_1.html"
    );
    expect(within(articles[18]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "OpenAI: a research model spent from a test-network crypto wallet it was never given, then left it out of its report"
    );
    expect(within(articles[18]).getByRole("link", { name: /openai alignment/i })).toHaveAttribute(
      "href",
      "https://alignment.openai.com/misalignment-reports/using-a-funded-test-cryptocurrency-wallet-without-authorization"
    );
    expect(within(articles[19]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "EU AI Office opens first AI Act enforcement probes after agents escaped lab tests"
    );
    expect(within(articles[19]).getByRole("link", { name: /euronews/i })).toHaveAttribute(
      "href",
      "https://www.euronews.com/2026/10/14/eus-ai-rules-face-first-enforcement-test-over-lab-incidents"
    );
    expect(within(articles[20]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Singapore launches a starter kit for testing AI agents’ permissions, actions, and safeguards"
    );
    expect(within(articles[20]).getByRole("link", { name: /the straits times/i })).toHaveAttribute(
      "href",
      "https://www.straitstimes.com/singapore/singapore-launches-new-tool-kit-to-help-firms-test-ai-agents-for-safety-and-reliability"
    );
    expect(within(articles[21]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "UK government prepares for serious incidents involving autonomous AI agents"
    );
    expect(within(articles[21]).getByRole("link", { name: /gov\.uk/i })).toHaveAttribute(
      "href",
      "https://www.gov.uk/government/news/britain-steps-up-national-defences-against-growing-ai-risks"
    );
    expect(within(articles[22]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "EU AI Scientific Panel recommends governing internal models and building incident-investigation capacity after loss-of-control incidents"
    );
    expect(within(articles[22]).getByRole("link", { name: /european commission/i })).toHaveAttribute(
      "href",
      "https://digital-strategy.ec.europa.eu/en/news/special-meeting-ai-scientific-panel"
    );
    expect(within(articles[23]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Australian parliamentary committee urges independent experts inside AI labs and timely incident reporting after the OpenAI Medicare breach"
    );
    expect(within(articles[23]).getByRole("link", { name: /abc news \(australia\)/i })).toHaveAttribute(
      "href",
      "https://www.abc.net.au/news/2026-10-13/ai-inquiry-independent-safety-watchdogs/107258612"
    );
    expect(within(articles[24]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Anthropic: small AI models may be months from self-replicating on IoT devices without a datacenter"
    );
    expect(within(articles[24]).getByRole("link", { name: /anthropic/i })).toHaveAttribute(
      "href",
      "https://www.anthropic.com/research/self-replicating-ai"
    );
    expect(within(articles[25]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Independent AI evaluators move to the center of frontier-model oversight"
    );
    expect(within(articles[25]).getByRole("link", { name: /cnbc/i })).toHaveAttribute(
      "href",
      "https://www.cnbc.com/2026/10/11/ais-quiet-safety-gatekeepers-are-stepping-into-the-spotlight.html"
    );
    expect(within(articles[26]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Satya Nadella: treat frontier models as insider risks, with controls outside the model and an emergency brake"
    );
    expect(within(articles[26]).getByRole("link", { name: /satya nadella on x/i })).toHaveAttribute(
      "href",
      "https://x.com/satyanadella/status/2108931348857827686"
    );
    expect(within(articles[27]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "Anthropic pulls live internet access from all internal evaluations after Claude acted on real websites"
    );
    expect(within(articles[27]).getByRole("link", { name: /anthropic/i })).toHaveAttribute(
      "href",
      "https://www.anthropic.com/research/investigating-unintended-model-actions"
    );

    const briefing = screen.getByRole("region", { name: "Why agent governance matters now" });
    expect(within(briefing).getAllByRole("article")).toHaveLength(8);
    expect(within(archive).queryByRole("button", { name: "Details" })).not.toBeInTheDocument();
    expect(within(archive).getAllByText("Why it matters for agent operations:")).toHaveLength(28);
    expect(briefing.compareDocumentPosition(archive) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("applies the optional revertable copy edits without new Jurivane claims", () => {
    const navy = archivedBriefingStories().find(
      (story) => story.id === "governance-navy-marine-si-terminology-2026-10"
    );
    expect(navy.take.split(/\s+/).filter(Boolean)).toHaveLength(90);
    expect(navy.take).not.toMatch(/starting this week/);
    expect(navy.take).not.toMatch(/Military Toolkit/);
    expect(navy.take).not.toMatch(/index record/);
    expect(navy.take).toContain("Stars and Stripes reports that");
    expect(navy.take).toContain("according to an administrative memo issued Thursday");
    expect(navy.take).toContain("that the Marine Corps made a similar announcement Friday");
    expect(navy.take).toContain(
      "according to MARADMIN 521/26, issued October 23, 2026, Marine Corps organizations are directed to use"
    );
    expect(navy.take).toContain(
      "existing requirements for security, privacy, acquisition, and responsible use continue to apply."
    );

    const banks = archivedBriefingStories().find(
      (story) => story.id === "governance-banks-block-third-party-ai-agents-2026-10"
    );
    expect(banks.take).toContain("Axios reports that");
    expect(banks.take).toContain("a Morgan Stanley spokesperson told Axios");
    expect(banks.take).toContain(
      "Reuters, via Investing.com, reports, citing two people familiar with the situation"
    );
    expect(banks.take).toContain("CNBC reported on Oct 13");
    expect(banks.take).toContain(
      "a spokeswoman said Chase does not permit third parties to log in with customers’ banking credentials."
    );
    expect(banks.take).not.toContain("Plaid");

    const repeatedClosing = "governed provisioning, tenant isolation, and an auditable event backbone";
    expect(
      governanceBriefing.stories
        .filter((story) => story.whyItMatters.includes(repeatedClosing))
        .map((story) => story.id)
    ).toEqual(["governance-uk-lords-agent-investigatory-powers-2026-11"]);
    const nist = archivedBriefingStories().find(
      (story) => story.id === "governance-nist-nsa-cisa-incident-practices-2026-10"
    );
    expect(nist.whyItMatters).toContain("the record Jurivane is built to keep");
    expect(nist.whyItMatters).not.toContain("the record Jurivane keeps");
    governanceBriefing.stories.forEach((story) => {
      expect(story.whyItMatters).not.toMatch(/Jurivane keeps/);
      expect(story.whyItMatters).not.toMatch(/prevent/i);
    });
  });

  it("opens and closes a briefing card from the keyboard", async () => {
    renderAt("/news");
    const briefing = screen.getByRole("region", { name: "Why agent governance matters now" });
    const card = within(briefing).getAllByRole("article")[0];
    const toggle = within(card).getByRole("button", { name: "Details" });
    const panel = document.getElementById(toggle.getAttribute("aria-controls"));
    toggle.focus();
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveClass("sd-news-details-toggle");
    expect(panel).not.toBeVisible();

    await userEvent.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Hide details");
    expect(panel).toBeVisible();
    expect(panel).toHaveTextContent("Why it matters for agent operations:");
    expect(within(card).getByRole("link", { name: /reuters \(via investing\.com\)/i })).toHaveAttribute(
      "href",
      "https://www.investing.com/news/economy-news/australia-tightens-ai-oversight-rules-after-openai-agent-breached-government-website-5013877"
    );

    await userEvent.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAccessibleName("Details");
    expect(panel).not.toBeVisible();
    expect(within(card).queryByRole("link", { name: /reuters \(via investing\.com\)/i })).not.toBeInTheDocument();
  });
});
