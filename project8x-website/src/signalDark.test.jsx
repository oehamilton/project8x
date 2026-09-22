import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

function renderAt(path) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

describe("Signal Dark information architecture", () => {
  it("puts delivery CTAs and three capabilities on the home page", () => {
    renderAt("/");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: /enterprise contact centers, delivered/i })
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^options$/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /talk to an architect/i })).toHaveAttribute(
      "href",
      "/ContactUs"
    );
    const agentForgeLinks = screen.getAllByRole("link", { name: /see agentforge/i });
    expect(agentForgeLinks[0]).toHaveAttribute("href", "/agentforge");
    expect(agentForgeLinks).toHaveLength(2);
    expect(screen.getAllByRole("article").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /advise, then deliver/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /genesys, avaya, cisco/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /the agent experience/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /our service offerings/i })).not.toBeInTheDocument();
  });

  it("keeps existing routes and opens the new destinations", async () => {
    renderAt("/");

    await userEvent.click(screen.getAllByRole("link", { name: /see agentforge/i })[0]);
    expect(
      screen.getByRole("heading", { name: /the agent desktop, treated as delivery/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/working draft/i)).toBeInTheDocument();
  });

  it("does not invent case-study metrics on Work", () => {
    renderAt("/work");
    expect(screen.getByRole("heading", { name: /organizations already on the record/i })).toBeInTheDocument();
    expect(screen.getByText(/does not publish written case studies/i)).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
});
