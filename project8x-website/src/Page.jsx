import { useDocumentMeta } from "./seo.js";

export default function Page({ title, description, children, width = "default" }) {
  useDocumentMeta(title, description);

  const className =
    width === "narrow" ? "sd-page sd-page-narrow" : width === "wide" ? "sd-page sd-page-wide" : "sd-page";
  return <article className={className}>{children}</article>;
}
