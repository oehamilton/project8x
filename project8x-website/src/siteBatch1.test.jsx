import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App.jsx";
import ContactUs from "./ContactUs.jsx";
import ContactForm, { buildMailto } from "./contact/ContactForm.jsx";
import { oldNameMentions } from "./testUtils/productName.js";

function renderAt(path) {
  window.history.pushState({}, "", path);
  return render(<App />);
}

async function fillForm({ honeypot } = {}) {
  await userEvent.type(screen.getByLabelText(/^name/i), "Dana Ruiz");
  await userEvent.type(screen.getByLabelText(/work email/i), "dana@example.com");
  await userEvent.type(screen.getByLabelText(/^company/i), "Acme Health");
  await userEvent.selectOptions(screen.getByLabelText(/^platform/i), "Amazon Connect");
  await userEvent.type(screen.getByLabelText(/challenge/i), "Cutover in March & IVR rework");
  if (honeypot) {
    await userEvent.type(screen.getByLabelText(/leave this field empty/i), "spam");
  }
}

const submit = () =>
  userEvent.click(screen.getByRole("button", { name: /request a platform assessment/i }));

const ROUTES = [
  "/",
  "/ContactUs",
  "/jurivane",
  "/news",
  "/privacy",
  "/CompanyServices",
  "/platforms",
  "/platform-migrations",
  "/Products",
  "/work",
  "/about",
  "/service/contact-center-technology-consulting",
  "/service/website-development-services",
];

afterEach(() => {
  cleanup();
});

describe("Contact form", () => {
  it("opens a prefilled mailto to sales@ when no endpoint is configured", async () => {
    const openMailto = vi.fn();
    const fetchImpl = vi.fn();
    render(<ContactForm endpoint="" openMailto={openMailto} fetchImpl={fetchImpl} />);
    await fillForm();
    await submit();

    expect(fetchImpl).not.toHaveBeenCalled();
    expect(openMailto).toHaveBeenCalledTimes(1);
    const url = openMailto.mock.calls[0][0];
    expect(url.startsWith("mailto:sales@project8x.com?")).toBe(true);
    expect(url).not.toContain("+");
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("subject")).toBe("Platform assessment request — Acme Health");
    expect(params.get("body")).toContain("Work email: dana@example.com");
    expect(params.get("body")).toContain("Platform: Amazon Connect");
    expect(params.get("body")).toContain("Cutover in March & IVR rework");
    expect(screen.getByRole("status")).toHaveTextContent(/your email app should open/i);
  });

  it("POSTs JSON to the configured endpoint and shows success", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    const openMailto = vi.fn();
    render(
      <ContactForm
        endpoint="https://formspree.io/f/test123"
        accessKey=""
        fetchImpl={fetchImpl}
        openMailto={openMailto}
      />
    );
    await fillForm();
    await submit();

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/your message is in/i));
    expect(openMailto).not.toHaveBeenCalled();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://formspree.io/f/test123");
    expect(init.method).toBe("POST");
    expect(init.headers["Content-Type"]).toBe("application/json");
    expect(init.headers.Accept).toBe("application/json");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      name: "Dana Ruiz",
      email: "dana@example.com",
      company: "Acme Health",
      platform: "Amazon Connect",
      message: "Cutover in March & IVR rework",
    });
    expect(body).not.toHaveProperty("website");
    expect(body).not.toHaveProperty("access_key");
  });

  it("includes access_key when set and shows an error state when the endpoint fails", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    render(<ContactForm endpoint="https://api.web3forms.com/submit" accessKey="k-123" fetchImpl={fetchImpl} />);
    await fillForm();
    await submit();

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/was not sent/i);
    expect(within(alert).getByRole("link", { name: "sales@project8x.com" })).toHaveAttribute(
      "href",
      "mailto:sales@project8x.com"
    );
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body).access_key).toBe("k-123");
  });

  it("silently drops submissions that fill the honeypot", async () => {
    const fetchImpl = vi.fn();
    const openMailto = vi.fn();
    render(<ContactForm endpoint="https://formspree.io/f/x" fetchImpl={fetchImpl} openMailto={openMailto} />);
    await fillForm({ honeypot: true });
    await submit();
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(openMailto).not.toHaveBeenCalled();
  });

  it("does not submit when required fields are empty", async () => {
    const openMailto = vi.fn();
    render(<ContactForm endpoint="" openMailto={openMailto} />);
    await submit();
    expect(openMailto).not.toHaveBeenCalled();
  });

  it("builds a mailto without a company", () => {
    const url = buildMailto({ name: "Lee", email: "l@x.io", company: "", platform: "", message: "Hi" });
    expect(new URLSearchParams(url.split("?")[1]).get("subject")).toBe("Platform assessment request — Lee");
  });
});

describe("Contact page", () => {
  const renderContact = (props) =>
    render(
      <MemoryRouter>
        <ContactUs {...props} />
      </MemoryRouter>
    );

  it("puts the form above the email directory and hides booking when unset", () => {
    renderContact({ booking: "" });
    const form = screen.getByRole("region", { name: "Request a platform assessment" });
    const directory = screen.getByRole("region", { name: "Prefer email?" });
    expect(form.compareDocumentPosition(directory) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(directory).getByRole("link", { name: "support@project8x.com" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /book an architect call/i })).not.toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/\(\d{3}\)|\d{3}[-.]\d{3}[-.]\d{4}/);
  });

  it("shows the booking button when VITE_BOOKING_URL is set", () => {
    renderContact({ booking: "https://cal.com/project8x/architect" });
    expect(screen.getByRole("link", { name: /book an architect call/i })).toHaveAttribute(
      "href",
      "https://cal.com/project8x/architect"
    );
  });

  it("is linked from the home hero as the primary CTA", () => {
    renderAt("/");
    expect(screen.getByRole("link", { name: "Start a conversation" })).toHaveAttribute("href", "/ContactUs");
  });
});

describe("Privacy notice", () => {
  it("renders at /privacy with the effective date and a working contact", () => {
    renderAt("/privacy");
    expect(screen.getByRole("heading", { level: 1, name: "Website privacy notice" })).toBeInTheDocument();
    expect(screen.getByText("Effective October 2026.")).toBeInTheDocument();
    expect(screen.getByText(/we do not sell or rent your personal information/i)).toBeInTheDocument();
    expect(screen.getByText(/cookieless script to count page views/i)).toBeInTheDocument();
    expect(screen.getByText(/you can unsubscribe at any time/i)).toBeInTheDocument();
    screen.getAllByRole("link", { name: "sales@project8x.com" }).forEach((link) =>
      expect(link).toHaveAttribute("href", "mailto:sales@project8x.com")
    );
    expect(document.body.textContent).not.toMatch(/legal advice|austin/i);
    expect(document.title).toBe("Privacy notice | Project8X");
  });
});

describe("SEO and accessibility", () => {
  it("gives every route a unique title and meta description", () => {
    const titles = new Set();
    const descriptions = new Set();
    for (const path of ROUTES) {
      cleanup();
      renderAt(path);
      const description = document.head.querySelector('meta[name="description"]')?.getAttribute("content");
      expect(document.title, path).toMatch(/Project8X/);
      expect(description, path).toBeTruthy();
      expect(description.length, path).toBeLessThanOrEqual(200);
      titles.add(document.title);
      descriptions.add(description);
    }
    expect(titles.size).toBe(ROUTES.length);
    expect(descriptions.size).toBe(ROUTES.length);
  });

  it("publishes Organization JSON-LD on the home page only", () => {
    renderAt("/");
    const script = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script.textContent);
    expect(data).toMatchObject({
      "@type": "Organization",
      name: "Project8X, Inc.",
      url: "https://www.project8x.com/",
      email: "sales@project8x.com",
      areaServed: "US",
    });
    expect(data.logo).toMatch(/^https:\/\/www\.project8x\.com\/.+\.png$/);
    expect(JSON.stringify(data)).not.toMatch(/address|telephone/i);
    cleanup();
    renderAt("/ContactUs");
    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it("gives images alt text, hides decorative ones, keeps heading order, and never shows the old product name", () => {
    for (const path of ROUTES) {
      cleanup();
      renderAt(path);
      document.querySelectorAll("img").forEach((img) => {
        expect(img.hasAttribute("alt"), `${path} ${img.src}`).toBe(true);
        if (img.getAttribute("alt") === "") {
          expect(img.getAttribute("aria-hidden"), `${path} ${img.src}`).toBe("true");
        }
      });
      const levels = [...document.querySelectorAll("main h1, main h2, main h3, main h4")].map((h) =>
        Number(h.tagName[1])
      );
      expect(levels.filter((level) => level === 1), path).toHaveLength(1);
      expect(levels[0], path).toBe(1);
      levels.forEach((level, index) => {
        if (index > 0) expect(level - levels[index - 1], `${path} heading ${index}`).toBeLessThanOrEqual(1);
      });
      expect(oldNameMentions(), path).toEqual([]);
    }
  });
});
