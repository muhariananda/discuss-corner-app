import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegistartionInput({ register }) {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  const handleRegister = () => {
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nama"
          value={name}
          onChange={handleNameChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <button
        type="button"
        aria-label="daftar"
        className="bg-blue-600 text-white p-2 rounded-md w-full mb-4"
        onClick={handleRegister}
      >
        Daftar
      </button>
    </div>
  );
}

RegistartionInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegistartionInput;
