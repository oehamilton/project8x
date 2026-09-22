import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';

function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('AgentForge admin entry', () => {
  it('does not link to admin from the marketing home', () => {
    renderAt('/');
    expect(screen.queryByRole('link', { name: 'Admin' })).not.toBeInTheDocument();
    const header = screen.getByRole('navigation', { name: 'Primary' });
    expect(header.textContent).not.toMatch(/admin/i);
  });

  it('links Admin to the passphrase gate from AgentForge only', async () => {
    renderAt('/AgentForge');
    const adminLinks = screen.getAllByRole('link', { name: 'Admin' });
    expect(adminLinks).toHaveLength(1);
    expect(adminLinks[0]).toHaveAttribute('href', '/admin');
    expect(screen.getByRole('navigation', { name: 'Footer' }).textContent).not.toMatch(/admin/i);

    await userEvent.click(adminLinks[0]);
    expect(await screen.findByLabelText('Passphrase')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /agentforge demo/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /contact-center systems that hold under real load/i })
    ).not.toBeInTheDocument();
  });
});
