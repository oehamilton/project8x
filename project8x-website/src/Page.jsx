import { useEffect } from "react";

export default function Page({ title, children, width = "default" }) {
  useEffect(() => {
    document.title = title
      ? `${title} | Project8X`
      : "Project8X | Contact-center architecture & delivery";
  }, [title]);

  const className =
    width === "narrow" ? "sd-page sd-page-narrow" : width === "wide" ? "sd-page sd-page-wide" : "sd-page";
  return <article className={className}>{children}</article>;
}
