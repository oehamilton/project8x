import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App.jsx";

function renderAt(path) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

const POSITIONING = "Command and Control for Agentic Operations";
const CLARIFIER = "provision, govern, observe, and stop AI agents";

describe("AgentForge page copy", () => {
  afterEach(() => {
    cleanup();
  });

  it("pairs the positioning line with its plain-language clarifier in the hero", () => {
    renderAt("/AgentForge");
    const line = screen.getByText(new RegExp(`${POSITIONING}: ${CLARIFIER}`));
    expect(line.tagName).toBe("STRONG");
    expect(document.body.textContent).not.toMatch(/Command and Control of Agentic/);
  });

  it("describes governed provisioning as a capability section", () => {
    renderAt("/AgentForge");
    expect(screen.getByRole("heading", { level: 2, name: "Governed provisioning" })).toBeInTheDocument();
    expect(
      screen.getByText(/onboarded through a defined questionnaire and approval flow/)
    ).toHaveTextContent(/permissions, topics, schemas, and tenant isolation before they can act/);
  });

  it("never uses the uncleared product name", () => {
    renderAt("/AgentForge");
    expect(document.body.textContent).not.toMatch(/Jurivane/i);
  });
});
