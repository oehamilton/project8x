import { useState } from "react";
import { Link } from "react-router-dom";
import Page from "./Page.jsx";
import SignalFigure from "./SignalFigure.jsx";
import {
  archiveStories,
  currentStories,
  formatStoryDate,
} from "./news/newsContent.js";
import {
  archivedBriefingStories,
  briefingStories,
  conceptTargetId,
  governanceBriefing,
} from "./news/briefings.js";
import NewsSignup from "./news/NewsSignup.jsx";

function StorySource({ story }) {
  const external = /^https?:\/\//i.test(story.sourceUrl);
  return (
    <a
      className="sd-text-link"
      href={story.sourceUrl}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {story.sourceName}
      <span className="sd-sr">: {story.headline}</span>
    </a>
  );
}

function StoryBody({ story }) {
  return (
    <>
      <p className="sd-kicker">{story.slotLabel}</p>
      <h3>{story.headline}</h3>
      <p className="sd-meta">
        <time dateTime={story.date}>{formatStoryDate(story.date)}</time>
      </p>
      <p>{story.take}</p>
      {story.whyItMatters ? (
        <p>
          <strong>Why it matters for agent operations:</strong> {story.whyItMatters}
        </p>
      ) : null}
      <StorySource story={story} />
    </>
  );
}

function GlanceStory({ story }) {
  const [open, setOpen] = useState(false);
  const detailsId = `${story.id}-details`;

  function toggle() {
    setOpen((value) => !value);
  }

  function onKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    // preventDefault keeps the browser from also clicking the button, which would toggle twice.
    event.preventDefault();
    toggle();
  }

  return (
    <article className="sd-news-card" id={story.id}>
      <div className="sd-news-tags">
        <p className="sd-kicker">{story.category}</p>
        {story.categorySecondary ? (
          <p className="sd-kicker sd-kicker-secondary">{story.categorySecondary}</p>
        ) : null}
      </div>
      <h3>{story.headline}</h3>
      <p className="sd-meta">
        <time dateTime={story.date}>{formatStoryDate(story.date)}</time>
      </p>
      <p>{story.summary}</p>
      <button
        type="button"
        className="sd-news-details-toggle"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        {open ? "Hide details" : "Details"}
      </button>
      <div className="sd-news-details" id={detailsId} hidden={!open}>
        <p>{story.take}</p>
        {story.whyItMatters ? (
          <p>
            <strong>Why it matters for agent operations:</strong> {story.whyItMatters}
          </p>
        ) : null}
        <StorySource story={story} />
      </div>
    </article>
  );
}

function ConceptList({ concepts, stories }) {
  if (!concepts?.length) return null;
  return (
    <ul className="sd-concept-list" aria-label="Agent operations concepts">
      {concepts.map((concept) => {
        const targetId = conceptTargetId(stories, concept.tag);
        const body = (
          <>
            <span className="sd-concept-tag">{concept.tag}</span>
            <span className="sd-concept-text">{concept.text}</span>
          </>
        );
        return (
          <li key={concept.tag}>
            {targetId ? (
              <a className="sd-concept" href={`#${targetId}`}>
                {body}
              </a>
            ) : (
              <div className="sd-concept">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function News() {
  const current = currentStories();
  const archived = archiveStories();
  const briefing = governanceBriefing;
  const briefingItems = briefingStories(briefing);
  const pastGovernance = archivedBriefingStories(briefing);

  return (
    <Page title="News" description="Industry notes for contact-center operators: platform changes from Genesys, Avaya, Cisco, and Amazon Connect, AI in CX, regulation, and agent governance.">
      <header className="sd-page-head">
        <div>
          <p className="sd-kicker">News</p>
          <h1 className="sd-h1 sd-h1-wide">
            Industry notes for contact-center operators.
          </h1>
          <hr className="sd-rule" />
          <p className="sd-lede">
            We track the platforms Project8X delivers on — and the AI and regulatory shifts that change how those estates run. One current story per beat when the source is solid; if a beat is quiet, we leave the prior piece up. No filler.
          </p>
          <div className="sd-actions">
            <Link to="/ContactUs" className="sd-btn sd-btn-primary">
              Talk to an architect
            </Link>
            <Link to="/platforms" className="sd-btn sd-btn-secondary">
              See platforms
            </Link>
            <a href="#updates" className="sd-btn sd-btn-secondary">
              Subscribe
            </a>
          </div>
        </div>
        <SignalFigure variant="topology" />
      </header>

      {briefingItems.length > 0 ? (
        <section className="sd-section" aria-labelledby="news-briefing-heading">
          <p className="sd-kicker">{briefing.kicker}</p>
          <h2 id="news-briefing-heading">{briefing.heading}</h2>
          <p className="sd-lede">{briefing.intro}</p>
          <ConceptList concepts={briefing.concepts} stories={briefingItems} />
          <div className="sd-news-grid">
            {briefingItems.map((story) =>
              story.summary ? (
                <GlanceStory key={story.id} story={story} />
              ) : (
                <article className="sd-news-card" key={story.id}>
                  <StoryBody story={story} />
                </article>
              )
            )}
          </div>
        </section>
      ) : null}

      <section className="sd-section" aria-labelledby="news-current-heading">
        <h2 id="news-current-heading">Current stories</h2>
        <div className="sd-news-grid">
          {current.map((story) => (
            <article className="sd-news-card" key={story.id}>
              <StoryBody story={story} />
            </article>
          ))}
        </div>
      </section>

      <NewsSignup />

      <section className="sd-section" aria-labelledby="news-archive-heading">
        <h2 id="news-archive-heading">Archive</h2>
        {archived.length === 0 ? (
          <p className="sd-note">No archived notes yet.</p>
        ) : (
          <ul className="sd-news-archive">
            {archived.map((story) => (
              <li key={story.id}>
                <article>
                  <StoryBody story={story} />
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      {pastGovernance.length > 0 ? (
        <section className="sd-section" aria-labelledby="news-governance-archive-heading">
          <h2 id="news-governance-archive-heading">Archive of past governance stories</h2>
          <div className="sd-news-grid">
            {pastGovernance.map((story) => (
              <article className="sd-news-card" key={story.id}>
                <StoryBody story={story} />
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </Page>
  );
}

export default News;
