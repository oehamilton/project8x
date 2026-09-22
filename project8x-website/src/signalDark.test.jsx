import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

function renderAt(path) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

describe("Signal Dark information architecture", () => {
  it("uses Marketing hero copy, one primary hierarchy, and three pillars", () => {
    renderAt("/");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        name: /contact-center systems that hold under real load/i,
      })
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^options$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^home$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^platforms$/i })).not.toBeInTheDocument();

    const architectLinks = screen.getAllByRole("link", { name: /talk to an architect/i });
    expect(architectLinks.length).toBeGreaterThan(1);
    architectLinks.forEach((link) => expect(link).toHaveAttribute("href", "/ContactUs"));

    expect(screen.getByRole("link", { name: /see agentforge/i })).toHaveAttribute(
      "href",
      "/AgentForge"
    );
    expect(
      screen.getByText(
        /Project8X designs, integrates, and stabilizes Genesys, Avaya, and Cisco platforms for Fortune 500 operations — with 35\+ years in the chair\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /delivery that survives cutover/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /genesys · avaya · cisco depth/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^agentforge$/i })).toBeInTheDocument();
    expect(
      screen.getByText(
        /architecture, integration, and program leadership for contact-center programs that have to work on day one — and day one hundred\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /platform work grounded in how queues, routing, and multi-site ops actually run — not generic it slides\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /an event-driven backbone for coordinating autonomous ai agents — isolation, schemas, and a clear path from pilot to production\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /35\+ years in contact-center and telecom delivery · fortune 500 programs · genesys · avaya · cisco/i
      )
    ).toBeInTheDocument();
    expect(screen.queryByText(/comms/i)).not.toBeInTheDocument();
  });

  it("opens AgentForge from the secondary CTA", async () => {
    renderAt("/");
    await userEvent.click(screen.getByRole("link", { name: /see agentforge/i }));
    expect(screen.getByRole("heading", { name: /^agentforge$/i })).toBeInTheDocument();
    expect(
      screen.getByText(
        /coordinate autonomous ai agents on an event-driven backbone built for real tenants — not a bolt-on chatbot\./i
      )
    ).toBeInTheDocument();
  });

  it("hides the unpublished CTO and does not invent case-study metrics", () => {
    renderAt("/about");
    expect(screen.getByRole("heading", { name: /othell hamilton/i })).toBeInTheDocument();
    expect(screen.queryByText(/^TBD$/)).not.toBeInTheDocument();

    window.history.pushState({}, "", "/work");
    renderAt("/work");
    expect(screen.getByText(/does not publish written case studies/i)).toBeInTheDocument();
  });
});
