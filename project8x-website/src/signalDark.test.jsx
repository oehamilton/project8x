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
      screen.getByRole("heading", { name: /platforms that fit how you actually run/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /programs that ship/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /agentforge — coordinate the agents/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/trusted in production/i)).toBeInTheDocument();
    expect(screen.queryByText(/comms/i)).not.toBeInTheDocument();
  });

  it("opens AgentForge from the secondary CTA", async () => {
    renderAt("/");
    await userEvent.click(screen.getByRole("link", { name: /see agentforge/i }));
    expect(
      screen.getByRole("heading", { name: /agentforge — coordinate the agents/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/event-driven backbone/i)).toBeInTheDocument();
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
