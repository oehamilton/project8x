import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { adminRedirects, amplifyConsoleRedirects } from '../amplifyConsoleRedirects.js';
import { spaFallbackRoutes } from '../spaFallback.js';
import App from './App.jsx';

const websiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

afterEach(() => {
  cleanup();
});

describe('retired admin area', () => {
  it('does not link to admin from the marketing home or Jurivane', () => {
    for (const path of ['/', '/jurivane']) {
      cleanup();
      renderAt(path);
      expect(screen.queryByRole('link', { name: 'Admin' })).not.toBeInTheDocument();
      expect(document.querySelector('a[href="/admin"]')).toBeNull();
      expect(screen.getByRole('navigation', { name: 'Primary' }).textContent).not.toMatch(/admin/i);
      expect(screen.getByRole('navigation', { name: 'Footer' }).textContent).not.toMatch(/admin/i);
    }
  });

  it('sends /admin, /admin.html, and /admin/* home', () => {
    for (const path of ['/admin', '/admin/', '/admin.html', '/admin/status', '/admin/status/live']) {
      cleanup();
      renderAt(path);
      expect(window.location.pathname, path).toBe('/');
      expect(
        screen.getByRole('heading', { name: /contact-center systems that hold under real load/i })
      ).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /demo access/i })).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Passphrase')).not.toBeInTheDocument();
    }
  });

  it('does not ship a Netlify _redirects file or an admin.html document', () => {
    expect(existsSync(resolve(websiteRoot, 'public/_redirects'))).toBe(false);
    expect(existsSync(resolve(websiteRoot, 'public/admin.html'))).toBe(false);
    expect(existsSync(resolve(websiteRoot, 'admin.html'))).toBe(false);
  });

  it('publishes admin/index.html so Amplify’s trailing-slash lookup does not 404', () => {
    expect(spaFallbackRoutes).toContain('admin');
  });

  it('lists Amplify console 301s for retired admin URLs ahead of the SPA rewrite', () => {
    const catchAllAt = amplifyConsoleRedirects.findIndex((rule) => rule.status === '200');
    expect(catchAllAt).toBe(amplifyConsoleRedirects.length - 1);
    expect(amplifyConsoleRedirects[catchAllAt].target).toBe('/index.html');

    for (const source of ['/admin.html', '/admin', '/admin/', '/admin/<*>']) {
      const index = amplifyConsoleRedirects.findIndex((rule) => rule.source === source);
      expect(index, source).toBeGreaterThanOrEqual(0);
      expect(index, source).toBeLessThan(catchAllAt);
      expect(amplifyConsoleRedirects[index].target, source).toBe('/');
      expect(amplifyConsoleRedirects[index].status, source).toBe('301');
    }

    expect(adminRedirects.map((rule) => rule.source)).toEqual([
      '/admin.html',
      '/admin',
      '/admin/',
      '/admin/<*>',
    ]);
  });
});
