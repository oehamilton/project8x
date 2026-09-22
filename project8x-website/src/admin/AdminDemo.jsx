import { useEffect, useLayoutEffect, useState } from 'react';
import { getAdminConfig } from './config.js';
import {
  normalizePassphrase,
  readAdminSession,
  verifyPassphrase,
  writeAdminSession,
} from './gate.js';
import { DEFAULT_OFFLINE_MESSAGE, loadDemoState } from './status.js';

function StatusDetails({ status }) {
  if (!status?.updatedAt && !status?.ttlEndsAt) return null;
  return (
    <div className="mt-3 text-sm text-gray-400">
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
    <div className="bg-transparent p-6 text-gray-200" data-testid="admin-demo" data-state={phase}>
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-100 drop-shadow-lg">AgentForge demo</h1>

        {phase === 'gate' && (
          <form onSubmit={onSubmit} className="mt-6">
            <p className="text-gray-300 drop-shadow-md mb-4">Enter the passphrase to continue.</p>
            <label htmlFor="admin-passphrase" className="block text-sm text-gray-300 mb-2">
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
              className="w-full bg-gray-900/80 border border-gray-600 rounded-lg px-3 py-2 text-white"
            />
            {error && (
              <p role="alert" className="text-red-300 mt-3">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {submitting ? 'Checking…' : 'Continue'}
            </button>
          </form>
        )}

        {phase === 'loading' && (
          <p className="text-gray-300 drop-shadow-md mt-6">Checking demo status…</p>
        )}

        {phase === 'live' && status && (
          <div className="mt-6">
            <p className="text-gray-200 drop-shadow-md mb-4">
              {status.message || 'Demo is available.'}
            </p>
            <StatusDetails status={status} />
            <a
              href={status.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="open-demo"
              className="inline-flex items-center mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
            >
              Open demo
            </a>
          </div>
        )}

        {phase === 'internal' && (
          <div className="mt-6" data-testid="demo-internal">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-300 mb-2">
              Live — internal only
            </p>
            <p className="text-gray-200 drop-shadow-md" data-testid="demo-message">
              {status?.message || 'Demo is live on the internal network. No public link yet.'}
            </p>
            <StatusDetails status={status} />
          </div>
        )}

        {phase === 'offline' && (
          <div className="mt-6" data-testid="demo-offline">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">Offline</p>
            <p className="text-gray-200 drop-shadow-md" data-testid="demo-message">
              {status?.message || DEFAULT_OFFLINE_MESSAGE}
            </p>
            <StatusDetails status={status} />
          </div>
        )}

        {unlocked && phase !== 'loading' && (
          <button
            type="button"
            onClick={signOut}
            className="mt-8 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Sign out
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminDemo;
