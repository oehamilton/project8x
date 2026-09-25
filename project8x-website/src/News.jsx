import { Link } from "react-router-dom";
import Page from "./Page.jsx";
import SignalFigure from "./SignalFigure.jsx";
import {
  archiveStories,
  currentStories,
  formatStoryDate,
} from "./news/newsContent.js";

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
          </div>
        </div>
        <SignalFigure variant="topology" />
      </header>

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
    </Page>
  );
}

export default News;
