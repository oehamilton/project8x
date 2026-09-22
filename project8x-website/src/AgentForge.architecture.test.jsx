import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

function renderAt(path) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

describe("AgentForge architecture diagram", () => {
  it("shows the Signal Dark event-driven diagram and keeps the page copy", () => {
    renderAt("/AgentForge");

    const diagram = screen.getByRole("img", {
      name: /event-driven architecture for agentic ai/i,
    });
    expect(diagram).not.toHaveAttribute("aria-hidden", "true");
    expect(diagram).toHaveTextContent("SalesForce (CRM)");
    expect(diagram).toHaveTextContent("Genesys");
    expect(diagram).toHaveTextContent("JIRA");
    expect(diagram).toHaveTextContent("Remedy");
    expect(diagram).toHaveTextContent("SharePoint");
    expect(diagram).toHaveTextContent("RARC");
    expect(diagram).toHaveTextContent("Cyara (Testing)");
    expect(diagram).toHaveTextContent("User Adhoc Requests");
    expect(diagram).toHaveTextContent("Automation Anywhere (RPA)");
    expect(diagram).toHaveTextContent("Dynatrace");
    expect(diagram).toHaveTextContent("Event Collection");
    expect(diagram).toHaveTextContent("Box Case");
    expect(diagram).toHaveTextContent("Lambda Functions");
    expect(diagram).toHaveTextContent("Event Bridge");
    expect(diagram).toHaveTextContent("(Automation Anywhere)");
    expect(diagram).toHaveTextContent("CDC | Adapters | Domain Events");
    expect(diagram).toHaveTextContent("Apache Flink / Databricks Streaming");
    expect(diagram).toHaveTextContent("Saga Orchestrator");
    expect(diagram).toHaveTextContent("Apache Kafka · AWS Managed Kafka");
    expect(diagram).toHaveTextContent("Event Streaming");
    expect(diagram).toHaveTextContent("Agentic AI");
    expect(diagram).toHaveTextContent("Topic | Schema Registry | Shared Ordered Durable Logs");
    expect(diagram).toHaveTextContent("Support Agent");
    expect(diagram).toHaveTextContent("OCR Agent");
    expect(diagram).toHaveTextContent("Translation Agent");
    expect(diagram).toHaveTextContent("Summary Agent");
    expect(diagram).toHaveTextContent("Compliance Agent");
    expect(diagram.textContent.match(/compliance agent/gi)).toHaveLength(1);
    expect(diagram).toHaveTextContent("MCP Servers");
    expect(diagram).toHaveTextContent("OCR Tools");
    expect(diagram).toHaveTextContent("Translation Tools");
    expect(diagram).toHaveTextContent("Claude CLI/Copilot");
    expect(diagram).toHaveTextContent("Knowledge Bases");
    expect(diagram).toHaveTextContent("AWS Services");
    expect(diagram).toHaveTextContent("Snowflake Data");
    expect(diagram).toHaveTextContent("(Attach Translated Document)");
    expect(diagram).toHaveTextContent("Publish / Subscribe");
    expect(diagram).toHaveTextContent("Choreographed Events");
    expect(diagram).toHaveTextContent("Triggered Events");
    expect(diagram).toHaveTextContent("New Document to Translate");
    expect(diagram).toHaveTextContent("Deterministic tool call");
    expect(diagram).toHaveTextContent("A2A Tasks & Events");
    expect(diagram).toHaveTextContent(
      "Observability, Governance, Security, Audit & Human-in-the-Loop"
    );
    expect(diagram).toHaveTextContent(
      "Splunk | Tracing | Policies | Authorization | Cyara Feedback | Human Validation"
    );

    expect(screen.getByRole("note")).toHaveTextContent(/working draft/i);
    expect(screen.getByRole("link", { name: "Admin" })).toHaveAttribute("href", "/admin");
    expect(screen.getByRole("heading", { name: /^communication$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^governance$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^pilot to production$/i })).toBeInTheDocument();
  });
});
