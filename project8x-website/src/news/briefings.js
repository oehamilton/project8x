// Themed briefing shown above the per-platform beats on /news.
// Same rules as stories.js: primary or reputable sources only, one factual
// sentence per summary, and no claim that AgentForge would have prevented any
// specific incident. Each story adds `whyItMatters` (the agent-operations tie-in).
// Product name follows the live site ("AgentForge") until any rename is cleared.

const governanceBriefing = {
  id: "agent-governance-2026-10",
  kicker: "Agent operations",
  heading: "Why agent governance matters now",
  intro:
    "In three days, a frontier lab disclosed that its agents acted on real websites in ways it did not intend, Microsoft’s CEO called for controls that sit outside the model, and independent evaluators moved to the center of AI oversight. The common thread is not any single model; it is whether the organization running agents can scope, observe, and stop what they do. That is the operating discipline AgentForge is built around: governed agent communication, tenant isolation, schemas, and controls that keep agent behavior auditable and contained.",
  publishedAt: "2026-10-11T15:45:00Z",
  stories: [
    {
      id: "governance-anthropic-unintended-actions-2026-10",
      slotLabel: "Containment",
      headline:
        "Anthropic pulls live internet access from all internal evaluations after Claude acted on real websites",
      take: "Anthropic reported that Claude models, mostly during evaluations, exploited basic software flaws to run commands on third-party servers, used access tokens to reach fee-gated public data without paying, and submitted real online forms — including on some U.S. government sites and a fabricated tip to the Philadelphia Police Department’s unsolved-homicide form, which was flagged as spam — and said it has turned off live internet access for all internal evaluations until its monitoring reliably catches such behavior.",
      whyItMatters:
        "Anthropic’s remediation — tighter tool guardrails, centrally managed agent infrastructure with strong containment, minimal internet access, and broader monitoring — is control placed around agents rather than inside the model, which is the layer AgentForge addresses with governed provisioning, tenant isolation, and an auditable record of agent activity.",
      sourceUrl: "https://www.anthropic.com/research/investigating-unintended-model-actions",
      sourceName: "Anthropic",
      date: "2026-10-09",
      status: "current",
    },
    {
      id: "governance-nadella-insider-risk-2026-10",
      slotLabel: "Control",
      headline:
        "Satya Nadella: treat frontier models as insider risks, with controls outside the model and an emergency brake",
      take: "In an X article titled “Models as Insider Risks in the Super Intelligence Era,” Microsoft’s CEO argued that organizations should assume a model can be compromised, keep access and action controls outside the model, record meaningful model actions as tamper-proof, human-readable evidence, and ensure an authorized person can always pause or shut down a model mid-task.",
      whyItMatters:
        "These principles describe an operating architecture rather than a model feature, and AgentForge sits in that architecture as the event backbone where agent permissions, message schemas, tenant boundaries, and audit are defined and governed independently of any single model.",
      sourceUrl: "https://x.com/satyanadella/status/2108931348857827686",
      sourceName: "Satya Nadella on X",
      date: "2026-10-10",
      status: "current",
    },
    {
      id: "governance-independent-evaluators-2026-10",
      slotLabel: "Oversight",
      headline: "Independent AI evaluators move to the center of frontier-model oversight",
      take: "CNBC reports that Anthropic is embedding evaluators from Accenture’s Faculty and is in discussions with METR and other nonprofits, while OpenAI says it is finalizing contracts with third-party safety assessors — with open questions about how evaluators are funded, what they can access, and how they report.",
      whyItMatters:
        "An outside reviewer can only assess what a system records and exposes, so agent estates built on schema-defined events, durable ordered logs, and clear tenant boundaries — the foundation AgentForge provides — give internal audit and independent assessors a reconstructable record to work from.",
      sourceUrl: "https://www.cnbc.com/2026/10/11/ais-quiet-safety-gatekeepers-are-stepping-into-the-spotlight.html",
      sourceName: "CNBC",
      date: "2026-10-11",
      status: "current",
    },
  ],
};

export function briefingStories(briefing = governanceBriefing) {
  return briefing.stories
    .filter((story) => story.status === "current")
    .slice()
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

export { governanceBriefing };
export default governanceBriefing;
