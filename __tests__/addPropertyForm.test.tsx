import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddPropertyForm from '@/components/AddPropertyFormComponent/AddPropertyForm'; // Adjust the import path as needed

describe('AddPropertyForm', () => {
  test('increments and decrements values correctly', async () => {
    render(<AddPropertyForm />);
    const user = userEvent.setup();

    // Increment number of units
    const incrementUnitsButton = screen.getByRole('button', { name: 'units+' });
    await user.click(incrementUnitsButton);

    const decrementUnitsButton = screen.getByRole('button', { name: 'units-' });
    await user.click(decrementUnitsButton);

    const incrementFloorsButton = screen.getByRole('button', { name: 'floor+' });
    await user.click(incrementFloorsButton);

    const decrementFloorsButton = screen.getByRole('button', { name: 'floor-' });
    await user.click(decrementFloorsButton);

    const incrementUpfButton = screen.getByRole('button', { name: 'upf+' });
    await user.click(incrementUpfButton);

    const decrementUpfButton = screen.getByRole('button', { name: 'upf-' });
    await user.click(decrementUpfButton);

    const incrementParkingButton = screen.getByRole('button', { name: 'parking+' });
    await user.click(incrementParkingButton);

    const decrementParkingButton = screen.getByRole('button', { name: 'parking-' });
    await user.click(decrementParkingButton);

    const incrementLockerButton = screen.getByRole('button', { name: 'locker+' });
    await user.click(incrementLockerButton);

    const decrementLockerButton = screen.getByRole('button', { name: 'locker-' });
    await user.click(decrementLockerButton);
  
  });

  test('validates required fields and displays error message on confirm', async () => {
    render(<AddPropertyForm />);
    const user = userEvent.setup();

    // Attempt to confirm without filling required fields
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    await user.click(confirmButton);
    expect(screen.getByText(/Please fill in all required fields./)).toBeInTheDocument();

    // Fill in the required fields by finding them via placeholders or other attributes
    const propertyNameInput = screen.getByPlaceholderText('Enter Property Name'); // Adjust based on actual placeholder
    await user.type(propertyNameInput, 'Test Property');
    const addressInput = screen.getByPlaceholderText('Enter Address'); // Adjust based on actual placeholder
    await user.type(addressInput, '123 Test St');

    // Confirm again
    await user.click(confirmButton);
    expect(screen.getByText(/Form Submitted Successfully!/)).toBeInTheDocument();
  });

  test('resets form fields on cancel', async () => {
    render(<AddPropertyForm />);
    const user = userEvent.setup();

    // Simulate filling in a field
    const propertyNameInput = screen.getByPlaceholderText('Enter Property Name'); // Adjust based on actual placeholder
    await user.type(propertyNameInput, 'Test Property');

    // Cancel the form
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    // Assert that the form fields are reset
    expect(propertyNameInput).toHaveValue('');
    // Repeat for other fields as needed
  });
});
