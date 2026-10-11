import { useEffect } from "react";

export const SITE_URL = "https://www.project8x.com";
export const SITE_NAME = "Project8X";
export const DEFAULT_TITLE = "Project8X | Contact-center architecture & delivery";
export const DEFAULT_DESCRIPTION =
  "Enterprise contact-center consulting — Genesys · Avaya · Cisco · Amazon Connect · Verint — plus AgentForge for multi-agent systems.";

export function pageTitle(title) {
  return title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
}

export function truncateDescription(text, max = 155) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

function setMetaDescription(content) {
  let tag = document.head.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/** Sets <title> and <meta name="description"> for the current route. */
export function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = pageTitle(title);
    setMetaDescription(description || DEFAULT_DESCRIPTION);
  }, [title, description]);
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Project8X, Inc.",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/Project8Xwt_tr.png`,
  email: "sales@project8x.com",
  areaServed: "US",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "sales@project8x.com",
    areaServed: "US",
  },
};
