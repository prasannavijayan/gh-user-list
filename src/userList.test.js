import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './api/User';
import UserList from './UserList';

describe('UserList component', () => {
  it('should render loading skeletons when loading is true', () => {
    render(
      <UserProvider>
        <Router>
          <UserList />
        </Router>
      </UserProvider>
    );

    expect(screen.getAllByTestId('skeleton-loading')).toHaveLength(10);
  });

  it('should render users list when loading is false', async () => {
    render(
      <UserProvider>
        <Router>
          <UserList />
        </Router>
      </UserProvider>
    );

    await waitFor(() => expect(screen.queryAllByTestId('skeleton-loading')).toHaveLength(0));
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
  });

  it('should handle search functionality', async () => {
    render(
      <UserProvider>
        <Router>
          <UserList />
        </Router>
      </UserProvider>
    );

    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'test' } });

    await waitFor(() => expect(screen.getByText('No users found')).toBeInTheDocument());
  });

  it('should handle pagination', async () => {
    render(
      <UserProvider>
        <Router>
          <UserList />
        </Router>
      </UserProvider>
    );

    fireEvent.click(screen.getByLabelText('Next page'));

    await waitFor(() => expect(screen.getByText('2')).toBeInTheDocument());
  });
});
