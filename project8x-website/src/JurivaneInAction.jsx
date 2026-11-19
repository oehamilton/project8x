import { useState } from "react";
import Lightbox from "./Lightbox.jsx";

const shots = [
  {
    id: "command-view",
    group: "hero",
    src: "/images/jurivane/jurivane-command-view.webp",
    width: 1600,
    height: 880,
    alt: "Jurivane Command View dashboard showing the chain of command for SI agents, a queue of decisions waiting on a human, a backbone map, and the audit record",
    caption: "Command View. Every agent action lands on the record, and decisions wait for a human.",
  },
  {
    id: "backbone",
    group: "hero",
    src: "/images/jurivane/jurivane-backbone.webp",
    width: 1600,
    height: 889,
    alt: "Jurivane SI Event Backbone showing one shared, ordered event stream, where each event came from, and where it went",
    caption:
      "SI Event Backbone. One shared, ordered event stream, built to show where every event came from and where it went.",
  },
  {
    id: "operator-console",
    group: "controls",
    portrait: true,
    src: "/images/jurivane/jurivane-operator-console.webp",
    width: 1200,
    height: 1516,
    alt: "Jurivane operator console showing tenants, credentials, and the approval gate set up step by step, with pause and revoke controls",
    caption:
      "Operator console. Tenants, credentials, and the approval gate are set up step by step, with pause and revoke one click away.",
  },
  {
    id: "approvals-queue",
    group: "controls",
    src: "/images/jurivane/jurivane-approvals-queue.webp",
    width: 1200,
    height: 678,
    alt: "Jurivane approval queue showing pending commands held for a human, where approve releases one command and deny releases none",
    caption: "Approval queue. Approve releases one command. Deny releases none.",
  },
];

function Shot({ shot, onOpen }) {
  return (
    <figure className={shot.portrait ? "sd-shot sd-shot-portrait" : "sd-shot"}>
      <button type="button" className="sd-shot-open" aria-haspopup="dialog" onClick={() => onOpen(shot)}>
        <span className="sd-shot-media">
          <img
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            loading="lazy"
            decoding="async"
          />
        </span>
        <span className="sd-sr">Open larger view</span>
      </button>
      <figcaption>{shot.caption}</figcaption>
    </figure>
  );
}

export default function JurivaneInAction() {
  const [active, setActive] = useState(null);
  const hero = shots.filter((shot) => shot.group === "hero");
  const controls = shots.filter((shot) => shot.group === "controls");

  return (
    <section className="sd-in-action" id="see-it-in-action" aria-labelledby="see-it-in-action-heading">
      <h2 id="see-it-in-action-heading" className="sd-h2">
        See it in action
      </h2>
      <div className="sd-shot-grid sd-shot-grid-hero">
        {hero.map((shot) => (
          <Shot key={shot.id} shot={shot} onOpen={setActive} />
        ))}
      </div>
      <h3 className="sd-subhead" id="see-it-hood-heading">
        Under the hood: human-in-the-loop controls
      </h3>
      <div className="sd-shot-grid sd-shot-grid-compact">
        {controls.map((shot) => (
          <Shot key={shot.id} shot={shot} onOpen={setActive} />
        ))}
      </div>
      <p className="sd-note">Concept build with fictional demo data.</p>
      <Lightbox image={active} onClose={() => setActive(null)} />
    </section>
  );
}
