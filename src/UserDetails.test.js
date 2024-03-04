import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './api/User';
import UserDetails from './UserDetails';

describe('UserDetails component', () => {
  it('should render loading skeleton when loading is true', () => {
    render(
      <Router>
        <UserProvider>
          <UserDetails />
        </UserProvider>
      </Router>
    );

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('should render user details when loading is false and user is found', async () => {
    const user = {
      login: 'testuser',
      name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg',
      location: 'Test City',
      company: 'Test Company',
      email: 'test@example.com',
      followers: 10,
      following: 5,
      public_repos: 20,
      public_gists: 15,
      bio: 'Test bio',
      twitter_username: 'testuser',
      blog: 'https://example.com',
      created_at: '2022-01-01T00:00:00Z',
      updated_at: '2022-01-02T00:00:00Z',
    };

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(user),
      })
    );

    render(
      <Router>
        <UserProvider>
          <UserDetails />
        </UserProvider>
      </Router>
    );

    await waitFor(() => expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument());
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Test City')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Followers: 10')).toBeInTheDocument();
    expect(screen.getByText('Following: 5')).toBeInTheDocument();
    expect(screen.getByText('Public Repositories: 20')).toBeInTheDocument();
    expect(screen.getByText('Public Gists: 15')).toBeInTheDocument();
    expect(screen.getByText('Test bio')).toBeInTheDocument();
    expect(screen.getByText('Twitter: testuser')).toBeInTheDocument();
    expect(screen.getByText('Website: https://example.com')).toBeInTheDocument();
    expect(screen.getByText('Created at: 1/1/2022')).toBeInTheDocument();
    expect(screen.getByText('Last updated: 1/2/2022')).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it('should render "User not found" when loading is false and user is not found', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.reject(),
      })
    );

    render(
      <Router>
        <UserProvider>
          <UserDetails />
        </UserProvider>
      </Router>
    );

    await waitFor(() => expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument());
    expect(screen.getByText('User not found')).toBeInTheDocument();

    global.fetch.mockRestore();
  });
});
