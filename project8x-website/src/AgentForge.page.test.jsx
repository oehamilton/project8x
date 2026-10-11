import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App.jsx";
import { PRODUCT_NAME, oldNameMentions } from "./testUtils/productName.js";

function renderAt(path) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

const POSITIONING = "Command and Control for Agentic Operations";
const CLARIFIER = "provision, govern, observe, and stop AI agents";

describe("Jurivane page copy", () => {
  afterEach(() => {
    cleanup();
  });

  it("pairs the positioning line with its plain-language clarifier in the hero", () => {
    renderAt("/jurivane");
    const line = screen.getByText(new RegExp(`${POSITIONING}: ${CLARIFIER}`));
    expect(line.tagName).toBe("STRONG");
    expect(line).toHaveTextContent(
      "Command and Control for Agentic Operations: provision, govern, observe, and stop AI agents."
    );
    expect(document.body.textContent).not.toMatch(/Command and Control of Agentic/);
  });

  it("describes governed provisioning as a capability section", () => {
    renderAt("/jurivane");
    expect(screen.getByRole("heading", { level: 2, name: "Governed provisioning" })).toBeInTheDocument();
    expect(
      screen.getByText(/onboarded through a defined questionnaire and approval flow/)
    ).toHaveTextContent(/permissions, topics, schemas, and tenant isolation before they can act/);
  });

  it("uses Jurivane as the product name, with one small 'Formerly AgentForge' note", () => {
    renderAt("/jurivane");
    expect(screen.getByText("Jurivane by Project8X")).toHaveClass("sd-kicker");
    expect(document.title).toBe(`${PRODUCT_NAME} | Project8X`);
    expect(
      document.head.querySelector('meta[name="description"]').getAttribute("content")
    ).toMatch(/^Jurivane by Project8X: Command and Control for Agentic Operations\./);
    const notes = document.querySelectorAll("[data-transition-note]");
    expect(notes).toHaveLength(1);
    expect(notes[0]).toHaveTextContent("Formerly AgentForge. Same platform, new name.");
    expect(notes[0]).toHaveClass("sd-transition-note");
    expect(oldNameMentions()).toEqual([]);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(within(primary).getByRole("link", { name: "Jurivane" })).toHaveAttribute("href", "/jurivane");
    expect(within(primary).getByRole("link", { name: "Jurivane" })).toHaveClass("is-active");
    const footer = screen.getByRole("navigation", { name: "Footer" });
    expect(within(footer).getByRole("link", { name: "Jurivane" })).toHaveAttribute("href", "/jurivane");
  });

  it("shows the etymology note for the name below the hero", () => {
    renderAt("/jurivane");
    const etymology = document.querySelector("[data-etymology]");
    expect(etymology).not.toBeNull();
    expect(etymology).toHaveTextContent(/^The name \(etymology\):/);
    expect(etymology).toHaveTextContent(
      "Jurivane (joo-ri-VANE): from the Latin juris — law, right, authority — and vane, as in a weathervane, the instrument that shows direction. Governed direction for autonomous agents."
    );
    expect(etymology).toHaveClass("sd-etymology");
    expect(document.body.textContent).not.toMatch(/entomology/i);
    const hero = document.querySelector("header.sd-page-head");
    expect(hero.compareDocumentPosition(etymology) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("complementary", { name: "About the name" })).toContainElement(etymology);
  });

  it("redirects the old /agentforge and /AgentForge URLs to /jurivane", () => {
    for (const old of ["/agentforge", "/AgentForge"]) {
      cleanup();
      renderAt(old);
      expect(window.location.pathname).toBe("/jurivane");
      expect(screen.getByText("Jurivane by Project8X")).toBeInTheDocument();
    }
  });
});
