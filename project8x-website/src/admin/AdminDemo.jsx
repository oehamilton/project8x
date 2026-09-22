import { useEffect, useLayoutEffect, useState } from 'react';
import Page from '../Page.jsx';
import { getAdminConfig } from './config.js';
import {
  normalizePassphrase,
  readAdminSession,
  verifyPassphrase,
  writeAdminSession,
} from './gate.js';
import { DEFAULT_OFFLINE_MESSAGE, loadDemoState } from './status.js';

const PUBLIC_LINK_NOTE =
  'No public demo link is published. Open demo appears only when a later status includes an https URL.';

function StatusDetails({ status }) {
  if (!status?.updatedAt && !status?.ttlEndsAt) return null;
  return (
    <div className="sd-note">
      {status.updatedAt && <p>Updated {status.updatedAt}</p>}
      {status.ttlEndsAt && <p>Window ends {status.ttlEndsAt}</p>}
    </div>
  );
}

function useAdminNoIndex() {
  useLayoutEffect(() => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'robots');
    meta.setAttribute('content', 'noindex, nofollow');
    meta.setAttribute('data-admin-gate', 'true');
    document.head.appendChild(meta);
    const previousTitle = document.title;
    document.title = 'Admin · Project8X';
    return () => {
      meta.remove();
      document.title = previousTitle;
    };
  }, []);
}

function AdminDemo() {
  useAdminNoIndex();
  const [unlocked, setUnlocked] = useState(() => readAdminSession());
  const [passphrase, setPassphrase] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(() => readAdminSession());

  useEffect(() => {
    if (!unlocked) return undefined;
    let cancelled = false;
    setLoading(true);
    const { statusUrl } = getAdminConfig();
    loadDemoState(statusUrl).then((result) => {
      if (!cancelled) {
        setStatus(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [unlocked]);

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    if (!normalizePassphrase(passphrase)) {
      setError('Enter the passphrase.');
      return;
    }
    setSubmitting(true);
    try {
      const result = await verifyPassphrase(passphrase, getAdminConfig().passwordHash);
      if (!result.ok) {
        setError(
          result.reason === 'unconfigured'
            ? 'Admin access is not configured for this build.'
            : 'Access denied.'
        );
        return;
      }
      writeAdminSession(true);
      setPassphrase('');
      setLoading(true);
      setUnlocked(true);
    } catch {
      setError('Could not verify the passphrase in this browser.');
    } finally {
      setSubmitting(false);
    }
  }

  function signOut() {
    writeAdminSession(false);
    setUnlocked(false);
    setStatus(null);
    setLoading(false);
    setError('');
    setPassphrase('');
  }

  const phase = !unlocked ? 'gate' : loading ? 'loading' : status?.state || 'offline';

  return (
    <div data-testid="admin-demo" data-state={phase}>
      <Page title="Admin" width="narrow">
        <p className="sd-kicker">AgentForge</p>
        <h1 className="sd-h1">Demo access</h1>
        <hr className="sd-rule" />

        {phase === 'gate' && (
          <form onSubmit={onSubmit}>
            <p className="sd-lede">Enter the passphrase to continue.</p>
            <label htmlFor="admin-passphrase" className="sd-kicker">
              Passphrase
            </label>
            <input
              id="admin-passphrase"
              name="p8x-admin-passphrase"
              type="password"
              autoComplete="new-password"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              value={passphrase}
              onChange={(event) => setPassphrase(event.target.value)}
              disabled={submitting}
              className="sd-admin-input"
            />
            {error && (
              <p role="alert" className="sd-note">
                {error}
              </p>
            )}
            <div className="sd-actions">
              <button type="submit" disabled={submitting} className="sd-btn sd-btn-primary">
                {submitting ? 'Checking…' : 'Continue'}
              </button>
            </div>
          </form>
        )}

        {phase === 'loading' && <p className="sd-lede">Checking demo status…</p>}

        {phase === 'live' && status && (
          <div className="sd-platform">
            <p className="sd-kicker">Public demo</p>
            <h2>Demo link published</h2>
            <div className="sd-prose">
              <p>{status.message || 'Demo is available.'}</p>
            </div>
            <StatusDetails status={status} />
            <div className="sd-actions">
              <a
                href={status.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="open-demo"
                className="sd-btn sd-btn-primary"
              >
                Open demo
              </a>
            </div>
          </div>
        )}

        {phase === 'internal' && (
          <div className="sd-platform" data-testid="demo-internal">
            <p className="sd-kicker">Live — internal only</p>
            <h2>No public demo link</h2>
            <div className="sd-prose">
              <p data-testid="demo-message">
                {status?.message || 'The demo is up on the internal network. There is no public URL.'}
              </p>
            </div>
            <p className="sd-note">{PUBLIC_LINK_NOTE}</p>
            <StatusDetails status={status} />
          </div>
        )}

        {phase === 'offline' && (
          <div className="sd-platform" data-testid="demo-offline">
            <p className="sd-kicker">Offline</p>
            <h2>Demo is offline</h2>
            <div className="sd-prose">
              <p data-testid="demo-message">{status?.message || DEFAULT_OFFLINE_MESSAGE}</p>
            </div>
            <p className="sd-note">{PUBLIC_LINK_NOTE}</p>
            <StatusDetails status={status} />
          </div>
        )}

        {unlocked && phase !== 'loading' && (
          <div className="sd-actions">
            <button type="button" onClick={signOut} className="sd-btn sd-btn-secondary">
              Sign out
            </button>
          </div>
        )}
      </Page>
    </div>
  );
}

export default AdminDemo;
