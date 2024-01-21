import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RoutePath from '../utils/routePath';

function UserFormLink({ type }) {
  const isTypeLogin = type === 'login';

  const path = isTypeLogin ? RoutePath.REGISTER : RoutePath.LOGIN;
  const text = isTypeLogin ? 'Belum punya akun?' : 'Sudah punya akun?';
  const textButton = isTypeLogin ? 'Masuk di sini' : 'Daftar di sini';

  return (
    <p className="flex justify-center items-center text-sm text-gray-600 mb-4">
      {text}
      <Link to={path} className="text-blue-600 ml-2 hover:text-blue-700">{textButton}</Link>
    </p>
  );
}

UserFormLink.propTypes = {
  type: PropTypes.string.isRequired,
};

export default UserFormLink;
