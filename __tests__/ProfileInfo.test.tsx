import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { UserBio } from '@/components/ProfilePageComponents/ProfileInfo';

describe('UserBio Component', () => {
    const user = userEvent.setup();
  
    test('enters edit mode when edit button is clicked', async () => {
      render(<UserBio />);
      await user.click(screen.getByLabelText('Edit Bio'));
      // Wait for the textarea to appear
      const textarea = await screen.findByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
  
    test('updates and submits bio', async () => {
      render(<UserBio />);
      await user.click(screen.getByLabelText('Edit Bio'));
      const textarea = await screen.findByRole('textbox');
      await user.type(textarea, 'This is a new bio');
      await user.click(screen.getByRole('button', { name: 'Submit' }));
      // Check that the new bio is displayed
      expect(screen.getByText('This is a new bio')).toBeInTheDocument();
    });
  
    test('re-enters edit mode and displays current bio for editing', async () => {
      render(<UserBio />);
      await user.click(screen.getByLabelText('Edit Bio'));
      const textarea = await screen.findByRole('textbox');
      await user.type(textarea, 'This is a new bio');
      await user.click(screen.getByRole('button', { name: 'Submit' }));
      // Re-enter edit mode
      await user.click(screen.getByLabelText('Edit Bio'));
      // Check that the textarea contains the current bio
      const updatedTextarea = await screen.findByRole('textbox');
      expect(updatedTextarea).toHaveValue('This is a new bio');
    });
  });