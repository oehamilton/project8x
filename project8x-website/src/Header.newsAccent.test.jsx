import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Header from "./Header.jsx";

describe("News tab accent", () => {
  it("keeps the News link's accessible name exactly 'News' and hides the decorative star", () => {
    render(
      <MemoryRouter initialEntries={["/news"]}>
        <Header />
      </MemoryRouter>
    );
    const primary = screen.getByRole("navigation", { name: "Primary" });
    const news = within(primary).getByRole("link", { name: "News" });
    expect(news).toHaveAttribute("href", "/news");
    expect(news).toHaveClass("is-active");
    expect(news.textContent).toBe("News");

    const star = news.querySelector("svg.sd-nav-accent-star");
    expect(star).not.toBeNull();
    expect(star).toHaveAttribute("aria-hidden", "true");
    expect(star).toHaveAttribute("focusable", "false");
    expect(star.querySelector("title")).toBeNull();
  });
});
