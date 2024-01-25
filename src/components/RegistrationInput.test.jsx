import React from 'react';
import {
  afterEach, expect, describe, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationInput from './RegistrationInput';

/**
    - RegistrationInput component
        - should handle name typing correctly
        - should handle email typing correctly
        - should handle password typing correctly
        - should call login function when login button is clicked
*/

describe('RegistrationInput Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegistrationInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Nama');

    // act
    await userEvent.type(nameInput, 'nametest');

    // assert
    expect(nameInput.value).toBe('nametest');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegistrationInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // act
    await userEvent.type(emailInput, 'test@mail.com');

    // assert
    expect(emailInput.value).toBe('test@mail.com');
  });

  it('should handle password typing correctly', async () => {
    render(<RegistrationInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // act
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput.value).toBe('passwordtest');
  });

  it('should call register function when register button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<RegistrationInput register={mockRegister} />);

    const nameInput = await screen.getByPlaceholderText('Nama');
    await userEvent.type(nameInput, 'nametest');

    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'test@mail.com');

    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');

    const registerButton = await screen.getByRole('button', { name: 'Daftar' });

    // act
    await userEvent.click(registerButton);

    // assert
    expect(mockRegister).toBeCalledWith({
      name: 'nametest',
      email: 'test@mail.com',
      password: 'passwordtest',
    });
  });
});
