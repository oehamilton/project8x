// Monthly refresh: replace or archive a slot only when a new credible story
// exists. If a beat is quiet, leave the prior current story up — do not invent
// filler, and do not set status to "archived" until a replacement is ready.
// An empty slot keeps that prior current story. When you do replace one, set
// the outgoing story to status "archived" and set replacesId on the new story.
// currentStories() shows one status==="current" story per slot, in slot order.
// archiveStories() lists status==="archived", newest date first.

const stories = [
  {
    id: "avaya-aura-10-3-2026-08",
    slot: "avaya",
    slotLabel: "Avaya",
    headline: "Avaya Aura 10.3 sets a supported path to modernize without a forced rip-and-replace",
    take: "Avaya announced Aura 10.3 with stronger security (including continued JITC certification and 4096-bit RSA certificates), RHEL 9.6, and ESXi 9.x support — aimed at enterprises and government shops that need to stay current without abandoning proven voice estates. GA is expected Sept. 28, 2026. For migration programs, the practical read is planning certainty: security and hypervisor alignment first, then Infinity/Nexus moves on your timeline.",
    sourceUrl: "https://www.avaya.com/en/newsroom/2026/pr-us-260804/",
    sourceName: "Avaya",
    date: "2026-08-04",
    status: "current",
    publishedAt: "2026-09-25T19:00:00Z",
  },
  {
    id: "cisco-webex-ai-agent-gpt-5-4-2026-09",
    slot: "cisco",
    slotLabel: "Cisco",
    headline: "Webex Contact Center pushes AI Agent engines to GPT-5.4 — and puts a clock on older engines",
    take: "Cisco’s Sept. 24 admin release notes move Webex AI Agent from GPT-4.1 to GPT-5.4 under Webex AI Pro 2.0 engines (including US/EU variants). Support for version 1.0 engines ends Feb. 15, 2027 — another quiet deprecation that lands on roadmaps only if someone is watching release notes. Same wave consolidates digital-channel asset config into Control Hub and advances ServiceNow-native voice integration. Operators: inventory AI Agent engine versions and plan the 2.0 cutover before the hard date.",
    sourceUrl: "https://help.webex.com/en-us/article/nv7abhz/What%27s-new-for-administrators-in-Webex-Contact-Center",
    sourceName: "Cisco Webex",
    date: "2026-09-24",
    status: "current",
    publishedAt: "2026-09-25T19:00:00Z",
  },
  {
    id: "genesys-agentic-orchestration-2026-09",
    slot: "genesys",
    slotLabel: "Genesys",
    headline: "Genesys Cloud stakes agentic orchestration — with a real governance plane",
    take: "At Xperience 2026, Genesys introduced Cloud Navigator, Cloud Orchestrator, Contextual Intelligence, and the AI Control Plane as an integrated agentic foundation — intent to outcome under defined governance. Contextual Intelligence and the AI Control Plane are available now; Navigator is expected later this Genesys fiscal year and Orchestrator early next. For operators, the story is not another bot feature: it’s orchestration plus a control plane so autonomy stays auditable across AI, people, and systems.",
    sourceUrl: "https://www.genesys.com/company/newsroom/announcements/genesys-launches-new-innovations-that-advance-genesys-cloud-as-the-agentic-orchestration-platform-for-customer-experience",
    sourceName: "Genesys",
    date: "2026-09-02",
    status: "current",
    publishedAt: "2026-09-25T19:00:00Z",
  },
  {
    id: "amazon-connect-agentic-cx-designer-2026-09",
    slot: "amazon_connect_or_verint",
    slotLabel: "Amazon Connect",
    headline: "Amazon Connect Customer makes agentic CX designer generally available",
    take: "Amazon Connect Customer made agentic CX designer generally available on Sept. 2 — a no-code canvas that pairs LLM conversation with deterministic workflows for eligibility, routing, and compliance. Business teams can design, test, and launch voice and digital self-service without a handoff to engineering. It’s live in major AWS regions; the practical read is faster self-service iteration with the guardrails you define on the canvas.",
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2026/09/agentic-cx-designer/",
    sourceName: "AWS",
    date: "2026-09-02",
    status: "current",
    publishedAt: "2026-09-25T19:00:00Z",
  },
  {
    id: "ai-cx-best-buy-handoff-2026-09",
    slot: "ai_cx",
    slotLabel: "AI in CX",
    headline: "Best Buy’s AI care push is really about handoff plumbing — not the model brand",
    take: "PYMNTS (Sept. 24) reports Best Buy cut transfers and raised containment using a Gemini-based assistant wired into records and knowledge, plus Generative Knowledge Assist on the agent desktop. Vendor-reported metrics (not independently verified): transfer rates down 1.5–2 points; containment up >50%. The durable lesson for architects: context survival across AI↔human handoffs is still the gap. Prompt-driven build cycles in weeks only help if knowledge and CRM data are actually connected.",
    sourceUrl: "https://www.pymnts.com/news/artificial-intelligence/2026/best-buy-uses-ai-to-stop-passing-customers-around/",
    sourceName: "PYMNTS",
    date: "2026-09-24",
    status: "current",
    publishedAt: "2026-09-25T19:00:00Z",
  },
  {
    id: "gov-us-rejects-un-ai-governance-2026-09",
    slot: "government_regulation",
    slotLabel: "Regulation",
    headline: "U.S. rejects centralized UN AI governance as the Security Council debates the rules",
    take: "On Sept. 23, White House OSTP Director Michael Kratsios told the UN Security Council the U.S. “totally rejects” efforts by international bodies to assert centralized control/global governance of AI (framed as superintelligence), pointing instead to national sovereignty and the G20 Carolina Principles. Parallel UN tracks (Global Dialogue on AI Governance / scientific panel) keep moving. For contact-center and AI programs: expect fragmented national rules, not a single global stack — design disclosure, audit, and data residency for the jurisdictions you serve (EU AI Act transparency duties remain a near-term product requirement on platforms like Webex AI Agent).",
    sourceUrl: "https://usun.usmission.gov/u-s-intervention-in-the-un-security-council-meeting-on-artificial-intelligence-and-international-security/",
    sourceName: "U.S. Mission to the UN",
    date: "2026-09-23",
    status: "current",
    publishedAt: "2026-09-25T19:00:00Z",
  },
];

export default stories;
