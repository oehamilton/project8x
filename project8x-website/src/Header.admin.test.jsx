import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from './Header.jsx';

describe('public navigation', () => {
  it('does not link to /admin', () => {
    render(
      <MemoryRouter>
        <Header toggleSidebar={() => {}} isSidebarOpen />
      </MemoryRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute('href') || '').not.toMatch(/\/admin/i);
    }
    expect(screen.queryByRole('link', { name: /admin/i })).not.toBeInTheDocument();
  });
});
