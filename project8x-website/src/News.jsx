import { Link } from "react-router-dom";
import Page from "./Page.jsx";
import SignalFigure from "./SignalFigure.jsx";
import {
  archiveStories,
  currentStories,
  formatStoryDate,
  slotLabel,
} from "./news/newsContent.js";

function StorySource({ story }) {
  const external = /^https?:\/\//i.test(story.sourceUrl);
  return (
    <a
      className="sd-text-link"
      href={story.sourceUrl}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      Source
      <span className="sd-sr">: {story.headline}</span>
    </a>
  );
}

function StoryBody({ story }) {
  return (
    <>
      <p className="sd-kicker">{slotLabel(story.slot)}</p>
      <h3>{story.headline}</h3>
      <p className="sd-meta">
        <time dateTime={story.date}>{formatStoryDate(story.date)}</time>
      </p>
      <p>{story.take}</p>
      <StorySource story={story} />
    </>
  );
}

function News() {
  const current = currentStories();
  const archived = archiveStories();

  return (
    <Page title="News">
      <header className="sd-page-head">
        <div>
          <p className="sd-draft" role="note">
            [Placeholder] Marketing copy — these briefs are stand-ins, not published reporting.
          </p>
          <p className="sd-kicker">News</p>
          <h1 className="sd-h1 sd-h1-wide">
            Notes on the platforms — and the rules around them.
          </h1>
          <hr className="sd-rule" />
          <p className="sd-lede">
            [Placeholder] Six current briefs, one slot each: Avaya, Cisco, Genesys, Amazon Connect and Verint, AI in the contact center, and government or regulation. When a sourced story is strong enough to keep, it replaces that slot and the prior brief moves to the archive. If nothing new is credible, the current card stays.
          </p>
          <div className="sd-actions">
            <Link to="/ContactUs" className="sd-btn sd-btn-primary">
              Talk to an architect
            </Link>
            <Link to="/platforms" className="sd-btn sd-btn-secondary">
              See platforms
            </Link>
          </div>
        </div>
        <SignalFigure variant="topology" />
      </header>

      <section className="sd-section" aria-labelledby="news-current-heading">
        <h2 id="news-current-heading">Current stories</h2>
        <div className="sd-news-grid">
          {current.map((story) => (
            <article className="sd-news-card" key={`${story.slot}-${story.date}`}>
              <StoryBody story={story} />
            </article>
          ))}
        </div>
      </section>

      <section className="sd-section" aria-labelledby="news-archive-heading">
        <h2 id="news-archive-heading">Archive</h2>
        <p className="sd-lede">
          [Placeholder] Superseded briefs. A slot moves here only after a newer story takes its place.
        </p>
        {archived.length === 0 ? (
          <p className="sd-note">No archived briefs yet.</p>
        ) : (
          <ul className="sd-news-archive">
            {archived.map((story) => (
              <li key={`${story.slot}-${story.date}-${story.headline}`}>
                <article>
                  <StoryBody story={story} />
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Page>
  );
}

export default News;
