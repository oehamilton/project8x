import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App.jsx';

const redirectsPath = resolve(dirname(fileURLToPath(import.meta.url)), '../public/_redirects');

function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

function redirectRules(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split(/\s+/));
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

  it('sends /admin and /admin/* home', () => {
    for (const path of ['/admin', '/admin/', '/admin/status', '/admin/status/live']) {
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

  it('redirects retired admin URLs to home before the SPA rewrite', () => {
    const text = readFileSync(redirectsPath, 'utf8');
    expect(text).not.toMatch(/admin\.html\s+200/);
    const rules = redirectRules(text);
    const splatAt = rules.findIndex(([source]) => source === '/*');
    expect(splatAt).toBeGreaterThan(0);

    for (const source of ['/admin.html', '/admin', '/admin/', '/admin/*']) {
      const index = rules.findIndex(([from]) => from === source);
      expect(index, source).toBeGreaterThanOrEqual(0);
      expect(index, source).toBeLessThan(splatAt);
      const [, target, status] = rules[index];
      expect(target, source).toBe('/');
      expect(status, source).toBe('301');
    }
  });
});
