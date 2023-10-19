import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import Page from '../app/page';
import { WithChildren } from '@/types/UI';

vi.mock('@clerk/nextjs', () => {
  // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
  const mockedFunctions = {
    auth: () => new Promise((resolve) => resolve({ userId: 'user_1234' })),
    ClerkProvider: ({ children }: WithChildren) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_1234',
        fullName: 'John Doe',
      },
    }),
  };

  return mockedFunctions;
});

test(`Home`, async () => {
  render(await Page());
  expect(
    screen.getByText(
      'An AI-powered app for tracking your mood. Interested in learning more?',
    ),
  ).toBeInTheDocument();
});
