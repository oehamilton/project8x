import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminDemo from './AdminDemo.jsx';
import { ADMIN_SESSION_KEY, sha256Hex } from './gate.js';

vi.mock('./config.js', () => ({
  getAdminConfig: vi.fn(),
}));

import { getAdminConfig } from './config.js';

const liveDocument = {
  live: true,
  demo_url: 'https://example.com/ui/demo.html',
  ttl_ends_at: '2099-12-31T23:59:59.000Z',
  updated_at: '2026-09-22T15:00:00.000Z',
  message: 'Local fixture: demo is live.',
};

describe('AdminDemo', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.mocked(getAdminConfig).mockReset();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('sets a noindex robots meta tag', () => {
    getAdminConfig.mockReturnValue({ passwordHash: '', statusUrl: '' });
    const { unmount } = render(<AdminDemo />);
    const meta = document.head.querySelector('meta[data-admin-gate="true"]');
    expect(meta).toHaveAttribute('content', 'noindex, nofollow');
    unmount();
    expect(document.head.querySelector('meta[data-admin-gate="true"]')).toBeNull();
  });

  it('rejects a wrong passphrase', async () => {
    getAdminConfig.mockReturnValue({
      passwordHash: await sha256Hex('local-test-only'),
      statusUrl: '',
    });
    render(<AdminDemo />);
    fireEvent.change(screen.getByLabelText('Passphrase'), { target: { value: 'nope' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Access denied.');
    expect(screen.queryByTestId('open-demo')).not.toBeInTheDocument();
  });

  it('shows offline when the status URL is not configured', async () => {
    getAdminConfig.mockReturnValue({
      passwordHash: await sha256Hex('local-test-only'),
      statusUrl: '',
    });
    render(<AdminDemo />);
    fireEvent.change(screen.getByLabelText('Passphrase'), {
      target: { value: 'local-test-only' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(await screen.findByTestId('demo-message')).toHaveTextContent('Demo is offline.');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('links to the https demo when status is live', async () => {
    getAdminConfig.mockReturnValue({
      passwordHash: await sha256Hex('local-test-only'),
      statusUrl: '/fixtures/agentforge-status.live.json',
    });
    fetch.mockImplementation(async (url) => {
      if (String(url).includes('fixtures')) {
        return { ok: true, json: async () => liveDocument };
      }
      return { ok: true };
    });
    render(<AdminDemo />);
    fireEvent.change(screen.getByLabelText('Passphrase'), {
      target: { value: 'local-test-only' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    const link = await screen.findByTestId('open-demo');
    expect(link).toHaveAttribute('href', 'https://example.com/ui/demo.html');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(screen.getByText('Local fixture: demo is live.')).toBeInTheDocument();
  });

  it('signs out back to the gate', async () => {
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    getAdminConfig.mockReturnValue({ passwordHash: 'ab'.repeat(32), statusUrl: '' });
    render(<AdminDemo />);
    expect(await screen.findByTestId('demo-message')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(screen.getByLabelText('Passphrase')).toBeInTheDocument();
    expect(sessionStorage.getItem(ADMIN_SESSION_KEY)).toBeNull();
  });
});
