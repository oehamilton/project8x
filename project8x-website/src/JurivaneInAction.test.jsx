import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App.jsx";

function renderAt(path) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

const ALT = [
  "Jurivane Command View dashboard showing the chain of command for SI agents, a queue of decisions waiting on a human, a backbone map, and the audit record",
  "Jurivane SI Event Backbone showing one shared, ordered event stream, where each event came from, and where it went",
  "Jurivane operator console showing tenants, credentials, and the approval gate set up step by step, with pause and revoke controls",
  "Jurivane approval queue showing pending commands held for a human, where approve releases one command and deny releases none",
];

const CAPTIONS = [
  "Command View. Every agent action lands on the record, and decisions wait for a human.",
  "SI Event Backbone. One shared, ordered event stream, built to show where every event came from and where it went.",
  "Operator console. Tenants, credentials, and the approval gate are set up step by step, with pause and revoke one click away.",
  "Approval queue. Approve releases one command. Deny releases none.",
];

describe("Jurivane see it in action", () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
    document.body.classList.remove("sd-scroll-lock");
    document.getElementById("root")?.removeAttribute("inert");
  });

  it("renders four lazy-loaded images with alt text and the demo-data note", () => {
    renderAt("/jurivane");
    const section = screen.getByRole("region", { name: "See it in action" });
    const hero = document.querySelector("header.sd-page-head");
    const capabilities = screen.getByRole("heading", { level: 2, name: "Current capabilities" });
    expect(hero.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(section.compareDocumentPosition(capabilities) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(
      within(section).getByRole("heading", { level: 3, name: "Under the hood: human-in-the-loop controls" })
    ).toBeInTheDocument();

    const images = [...section.querySelectorAll("img")];
    expect(images).toHaveLength(4);
    images.forEach((img, index) => {
      expect(img.getAttribute("alt")).toBe(ALT[index]);
      expect(img.alt.length).toBeGreaterThan(0);
      expect(img).toHaveAttribute("loading", "lazy");
      expect(img).toHaveAttribute("decoding", "async");
      expect(Number(img.getAttribute("width"))).toBeGreaterThan(0);
      expect(Number(img.getAttribute("height"))).toBeGreaterThan(0);
      expect(img.closest("button")).toHaveAttribute("type", "button");
    });
    expect(within(section).getAllByRole("button")).toHaveLength(4);
    CAPTIONS.forEach((caption) => {
      expect(within(section).getByText(caption)).toBeVisible();
    });
    expect(within(section).getByText("Concept build with fictional demo data.")).toBeVisible();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the lightbox on click and closes it on Escape", async () => {
    renderAt("/jurivane");
    const section = screen.getByRole("region", { name: "See it in action" });
    const opener = within(section).getAllByRole("button")[0];

    await userEvent.click(opener);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveTextContent(CAPTIONS[0]);
    const full = dialog.querySelector("img");
    expect(full).toHaveAttribute("src", "/images/jurivane/jurivane-command-view.webp");
    expect(full).toHaveAttribute("alt", ALT[0]);
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(opener).toHaveFocus();
  });

  it("opens from Enter and Space, and closes from the close button and the backdrop", async () => {
    renderAt("/jurivane");
    const section = screen.getByRole("region", { name: "See it in action" });
    const [command, backbone] = within(section).getAllByRole("button");

    command.focus();
    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("dialog")).toHaveTextContent(CAPTIONS[0]);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(command).toHaveFocus();

    backbone.focus();
    await userEvent.keyboard(" ");
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent(CAPTIONS[1]);
    await userEvent.click(document.querySelector(".sd-lightbox-backdrop"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(backbone).toHaveFocus();
  });
});
