import { Link } from "react-router-dom";
import Page from "./Page.jsx";

const CONTACT = "sales@project8x.com";

function Privacy() {
  return (
    <Page
      title="Privacy notice"
      description="How the Project8X website handles information you send through the contact form: what we collect, how we use it, who processes it, and how to reach us."
      width="narrow"
    >
      <header>
        <p className="sd-kicker">Privacy</p>
        <h1 className="sd-h1">Website privacy notice</h1>
        <hr className="sd-rule" />
        <p className="sd-lede">Effective October 2026.</p>
      </header>

      <div className="sd-prose">
        <section aria-labelledby="privacy-scope">
          <h2 id="privacy-scope">Scope</h2>
          <p>
            This notice covers the Project8X website (project8x.com). Our SMS
            products have their own{" "}
            <a className="sd-text-link" href="/Privacy Policy SMS.pdf">
              SMS privacy policy (PDF)
            </a>{" "}
            and{" "}
            <a className="sd-text-link" href="/Terms and Conditions SMS.pdf">
              SMS terms (PDF)
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="privacy-collect">
          <h2 id="privacy-collect">What we collect</h2>
          <p>
            When you use the{" "}
            <Link className="sd-text-link" to="/ContactUs">
              contact form
            </Link>
            , we collect what you enter: your name, work email, company, the
            platform you select, and your message. If you email us directly, we
            receive your email address and whatever you include in the message.
          </p>
          <p>
            Like most websites, our hosting provider automatically processes
            basic technical data, such as your IP address and browser type, to
            deliver pages and keep the site secure. We do not use advertising
            cookies or third-party analytics on this site.
          </p>
        </section>

        <section aria-labelledby="privacy-use">
          <h2 id="privacy-use">How we use it</h2>
          <p>
            We use contact information only to respond to your inquiry and to
            continue the conversation you started. We do not add you to a
            marketing list without asking.
          </p>
        </section>

        <section aria-labelledby="privacy-share">
          <h2 id="privacy-share">Sharing</h2>
          <p>
            We do not sell or rent your personal information. We share it only
            with service providers that help us run the site and reply to you:
          </p>
          <ul>
            <li>
              Amazon Web Services (AWS Amplify), which hosts this website.
            </li>
            <li>
              A third-party form processor, when one is enabled, which receives
              contact-form submissions and forwards them to our inbox.
            </li>
            <li>Our email provider, which delivers and stores our messages.</li>
            <li>
              Google Fonts, which serves the typeface this site uses and
              receives your IP address when your browser loads it.
            </li>
          </ul>
          <p>
            We may also disclose information when the law requires it.
          </p>
        </section>

        <section aria-labelledby="privacy-retention">
          <h2 id="privacy-retention">Retention</h2>
          <p>
            We keep inquiry messages for as long as needed to respond and to
            maintain normal business records, then delete them.
          </p>
        </section>

        <section aria-labelledby="privacy-choices">
          <h2 id="privacy-choices">Your choices</h2>
          <p>
            You can ask us what information we hold about you, or ask us to
            correct or delete it, by emailing{" "}
            <a className="sd-text-link" href={`mailto:${CONTACT}`}>
              {CONTACT}
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="privacy-changes">
          <h2 id="privacy-changes">Changes and contact</h2>
          <p>
            If we change this notice, we will update the effective date above.
            Questions about privacy go to{" "}
            <a className="sd-text-link" href={`mailto:${CONTACT}`}>
              {CONTACT}
            </a>
            .
          </p>
        </section>
      </div>
    </Page>
  );
}

export default Privacy;
