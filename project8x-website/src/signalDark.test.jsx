import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";
import { spaFallbackRoutes } from "../spaFallback.js";

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
        /agent desktop, treated as delivery — the experience, the work routed to it, and how it’s stood up with genesys, avaya, or cisco rather than bolted on later\./i
      )
    ).toBeInTheDocument();
    expect(screen.queryByText(/backbone/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/kafka/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/event-driven/i)).not.toBeInTheDocument();
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
    expect(
      screen.getByRole("heading", { level: 1, name: /agent desktop, treated as delivery\./i })
    ).toBeInTheDocument();
    expect(screen.getByRole("note")).toHaveTextContent(
      /working draft — positioning and proof points are still being sharpened\./i
    );
    expect(
      screen.getByText(
        /agentforge is the project8x name for the agent experience: the desktop, the work that reaches it, and how that experience is delivered on the contact-center platforms you already run\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /^desktop$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /^work routed$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /stood up on genesys · avaya · cisco/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see our services/i })).toHaveAttribute(
      "href",
      "/CompanyServices"
    );
    screen.getAllByRole("link", { name: /talk to an architect/i }).forEach((link) => {
      expect(link).toHaveAttribute("href", "/ContactUs");
    });
    expect(screen.queryByText(/backbone/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/kafka/i)).not.toBeInTheDocument();
  });

  it("hides the unpublished CTO and does not invent case-study metrics", () => {
    renderAt("/about");
    expect(screen.getByRole("heading", { name: /othell hamilton/i })).toBeInTheDocument();
    expect(screen.queryByText(/^TBD$/)).not.toBeInTheDocument();

    window.history.pushState({}, "", "/work");
    renderAt("/work");
    expect(screen.getByText(/does not publish written case studies/i)).toBeInTheDocument();
  });

  it("puts Marketing’s tagline and the legal PDFs in the footer", () => {
    renderAt("/");
    expect(screen.getByText(/contact-center technology consulting · project8x/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^privacy$/i })).toHaveAttribute(
      "href",
      "/Privacy Policy SMS.pdf"
    );
    expect(screen.getByRole("link", { name: /^terms$/i })).toHaveAttribute(
      "href",
      "/Terms and Conditions SMS.pdf"
    );
  });

  it("uses links on a service detail page and does not show a watermarked hero", () => {
    renderAt("/service/contact-center-technology-consulting");
    const back = screen.getByRole("link", { name: /back to services/i });
    expect(back).toHaveAttribute("href", "/CompanyServices");
    screen.getAllByRole("link", { name: /talk to an architect/i }).forEach((link) => {
      expect(link).toHaveAttribute("href", "/ContactUs");
    });
    expect(screen.queryByRole("img", { name: /contact center technology consulting/i })).not.toBeInTheDocument();
    expect(document.querySelector('img[src="/cct.png"]')).toBeNull();
  });

  it("publishes a folder index for the trailing-slash routes Amplify 404s", () => {
    for (const route of ["/ContactUs/", "/CompanyServices/", "/Products/", "/ExecutiveLeadership/"]) {
      const folder = route.replace(/^\/|\/$/g, "");
      expect(spaFallbackRoutes).toContain(folder);
    }
  });
});
