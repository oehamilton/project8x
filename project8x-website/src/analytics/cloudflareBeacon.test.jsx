import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { BrowserRouter, Link } from "react-router-dom";
import {
  CF_BEACON_SRC,
  beaconOptions,
  cleanBeaconToken,
  cloudflareBeaconToken,
  mountCloudflareBeacon,
} from "./cloudflareBeacon.js";

function freshDocument() {
  return document.implementation.createHTMLDocument("beacon");
}

describe("Cloudflare beacon gating", () => {
  it("reads an empty token when VITE_CF_BEACON_TOKEN is unset", () => {
    expect(cloudflareBeaconToken()).toBe("");
    expect(cloudflareBeaconToken({})).toBe("");
    expect(cloudflareBeaconToken({ VITE_CF_BEACON_TOKEN: "   " })).toBe("");
    expect(cleanBeaconToken("not a token")).toBe("");
    expect(cleanBeaconToken("<script>")).toBe("");
  });

  it("does not insert a script when the token is missing", () => {
    const doc = freshDocument();
    expect(mountCloudflareBeacon(doc, "")).toBeNull();
    expect(mountCloudflareBeacon(doc, undefined)).toBeNull();
    expect(mountCloudflareBeacon(doc, "short")).toBeNull();
    expect(doc.querySelector("script")).toBeNull();
    expect(doc.documentElement.innerHTML).not.toContain("cloudflareinsights");
  });

  it("inserts one module beacon with spa:true when a token is set", () => {
    const doc = freshDocument();
    const token = "a1b2c3d4e5f67890abcd";
    const script = mountCloudflareBeacon(doc, `  ${token}  `);
    expect(script).not.toBeNull();
    expect(script.type).toBe("module");
    expect(script.src).toBe(CF_BEACON_SRC);
    expect(script.parentElement).toBe(doc.body);
    expect(JSON.parse(script.getAttribute("data-cf-beacon"))).toEqual(beaconOptions(token));
    expect(beaconOptions(token).spa).toBe(true);

    const again = mountCloudflareBeacon(doc, token);
    expect(again).toBe(script);
    expect(doc.querySelectorAll("script[data-cf-beacon]")).toHaveLength(1);
  });
});

describe("BrowserRouter and the beacon History API hook", () => {
  afterEach(() => {
    cleanup();
  });

  it("sends link clicks through history.pushState after the router exists", async () => {
    window.history.pushState({}, "", "/");
    render(
      <BrowserRouter>
        <Link to="/news">Industry notes</Link>
      </BrowserRouter>
    );

    const calls = [];
    const original = window.history.pushState;
    window.history.pushState = function pushState(state, title, url) {
      calls.push(String(url));
      return original.call(this, state, title, url);
    };
    try {
      await userEvent.click(screen.getByRole("link", { name: "Industry notes" }));
      expect(calls.some((url) => url.includes("/news"))).toBe(true);
    } finally {
      window.history.pushState = original;
    }
  });
});
