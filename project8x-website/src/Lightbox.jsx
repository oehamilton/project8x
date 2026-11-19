import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

function focusableIn(container) {
  if (!container) return [];
  return [...container.querySelectorAll(FOCUSABLE)].filter((element) => {
    if (element.hasAttribute("disabled")) return false;
    if (element.getAttribute("aria-hidden") === "true") return false;
    return true;
  });
}

export default function Lightbox({ image, onClose }) {
  const captionId = useId();
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!image) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const root = document.getElementById("root");
    document.body.style.overflow = "hidden";
    document.body.classList.add("sd-scroll-lock");
    root?.setAttribute("inert", "");
    closeRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = focusableIn(dialogRef.current);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("sd-scroll-lock");
      root?.removeAttribute("inert");
      if (previouslyFocused instanceof HTMLElement && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [image]);

  if (!image) return null;

  return createPortal(
    <div className="sd-lightbox-backdrop" onClick={onClose}>
      <div
        className="sd-lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={captionId}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sd-lightbox-toolbar">
          <button type="button" className="sd-btn sd-btn-secondary" ref={closeRef} onClick={onClose}>
            Close
          </button>
        </div>
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} decoding="async" />
        <p id={captionId} className="sd-lightbox-caption">
          {image.caption}
        </p>
      </div>
    </div>,
    document.body
  );
}
