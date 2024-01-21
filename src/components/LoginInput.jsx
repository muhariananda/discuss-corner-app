import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  const handleLogin = () => login({ email, password });

  return (
    <>
      <div className="mb-2">
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <button
        type="button"
        aria-label="Login"
        onClick={handleLogin}
        className="bg-blue-600 text-white p-2 rounded-md w-full mb-4"
      >
        Masuk
      </button>
    </>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
