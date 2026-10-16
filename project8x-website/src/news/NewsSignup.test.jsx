import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App.jsx";
import NewsSignup from "./NewsSignup.jsx";
import { buildSignupPayload, isSignupEmail, newsSignupEndpoint } from "./signupConfig.js";

afterEach(() => {
  cleanup();
});

describe("news signup endpoint", () => {
  it("stays empty unless the value is an https URL or local http", () => {
    expect(newsSignupEndpoint()).toBe("");
    expect(newsSignupEndpoint("")).toBe("");
    expect(newsSignupEndpoint("   ")).toBe("");
    expect(newsSignupEndpoint("not a url")).toBe("");
    expect(newsSignupEndpoint("http://example.com/signup")).toBe("");
    expect(newsSignupEndpoint("javascript:alert(1)")).toBe("");
    expect(newsSignupEndpoint("https://user:secret@example.com/signup")).toBe("");
    expect(newsSignupEndpoint("https://example.com/signup")).toBe("https://example.com/signup");
    expect(newsSignupEndpoint("http://localhost:4000/signup")).toBe("http://localhost:4000/signup");
    expect(newsSignupEndpoint("http://127.0.0.1:4000/signup")).toBe("http://127.0.0.1:4000/signup");
  });

  it("accepts a plain email and builds the JSON body", () => {
    expect(isSignupEmail("  reader@project8x.com  ")).toBe(true);
    expect(isSignupEmail("")).toBe(false);
    expect(isSignupEmail("reader")).toBe(false);
    expect(isSignupEmail("reader@localhost")).toBe(false);
    expect(buildSignupPayload("  reader@project8x.com ")).toEqual({
      email: "reader@project8x.com",
      source: "project8x.com/news",
    });
  });
});

describe("News signup form", () => {
  it("stays disabled and does not report success when no endpoint is configured", async () => {
    const fetchImpl = vi.fn();
    render(<NewsSignup endpoint="" fetchImpl={fetchImpl} />);

    const email = screen.getByLabelText("Email");
    const button = screen.getByRole("button", { name: "Coming soon" });
    expect(email).toBeDisabled();
    expect(button).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("Signup is coming soon.");
    expect(screen.getByText(/won’t sell or share it/i)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByText(/we received that address/i)).not.toBeInTheDocument();

    await userEvent.click(button);
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent("Signup is coming soon.");
  });

  it("shows the same disabled block on /news with the default env", () => {
    window.history.pushState({}, "", "/news");
    render(<App />);
    const region = screen.getByRole("region", { name: "Get AI governance updates" });
    expect(within(region).getByLabelText("Email")).toBeDisabled();
    expect(within(region).getByRole("button", { name: "Coming soon" })).toBeDisabled();
    expect(within(region).getByRole("status")).toHaveTextContent("Signup is coming soon.");
    expect(
      screen.getByRole("heading", { level: 1, name: "Industry notes for contact-center operators." })
    ).toBeInTheDocument();
  });

  it("rejects an invalid email without calling the endpoint", async () => {
    const fetchImpl = vi.fn();
    render(<NewsSignup endpoint="https://example.com/signup" fetchImpl={fetchImpl} />);
    const email = screen.getByLabelText("Email");
    expect(email).toBeEnabled();
    await userEvent.type(email, "not-an-email");
    await userEvent.click(screen.getByRole("button", { name: "Get updates" }));

    expect(fetchImpl).not.toHaveBeenCalled();
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Enter an email address like name@company.com.");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByText(/we received that address/i)).not.toBeInTheDocument();
  });

  it("POSTs the email and shows success", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 202 });
    render(<NewsSignup endpoint="https://example.com/signup" fetchImpl={fetchImpl} />);
    await userEvent.type(screen.getByLabelText("Email"), "  reader@project8x.com");
    await userEvent.click(screen.getByRole("button", { name: "Get updates" }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Thanks. We received that address for AI governance updates."
      )
    );
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://example.com/signup");
    expect(init.method).toBe("POST");
    expect(init.headers["Content-Type"]).toBe("application/json");
    expect(JSON.parse(init.body)).toEqual({
      email: "reader@project8x.com",
      source: "project8x.com/news",
    });
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows an error when the endpoint fails or the network throws", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockRejectedValueOnce(new Error("offline"));
    render(<NewsSignup endpoint="https://example.com/signup" fetchImpl={fetchImpl} />);
    const email = screen.getByLabelText("Email");

    await userEvent.type(email, "reader@project8x.com");
    await userEvent.click(screen.getByRole("button", { name: "Get updates" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "We couldn't save that email. Please try again."
    );
    expect(email).toHaveValue("reader@project8x.com");
    expect(screen.queryByText(/we received that address/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Get updates" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "We couldn't save that email. Please try again."
    );
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("drops a filled honeypot without a success message", async () => {
    const fetchImpl = vi.fn();
    render(<NewsSignup endpoint="https://example.com/signup" fetchImpl={fetchImpl} />);
    await userEvent.type(screen.getByLabelText("Email"), "reader@project8x.com");
    await userEvent.type(screen.getByLabelText(/leave this field empty/i), "spam");
    await userEvent.click(screen.getByRole("button", { name: "Get updates" }));
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(screen.queryByText(/we received that address/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
