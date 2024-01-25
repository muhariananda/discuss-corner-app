import React from 'react';
import {
  afterEach, expect, describe, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

/**
  skenario testing

    - LoginInput component
      - should handle email typing correctly
      - should handle password typing correctly
      - should call login function when login button is clicked
*/

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // act
    await userEvent.type(emailInput, 'user@mail.com');

    // assert
    expect(emailInput.value).toBe('user@mail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // act
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput.value).toBe('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);

    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'test@mail.com');

    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');

    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // act
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'test@mail.com',
      password: 'passwordtest',
    });
  });
});
