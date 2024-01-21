import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action';
import { asyncSetAuthUser } from '../states/authUser/action';
import RegistartionInput from '../components/RegistrationInput';
import UserFormLink from '../components/UserFormLink';
import RoutePath from '../utils/routePath';

function RegistrationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    await dispatch(asyncRegisterUser({ name, email, password }));
    dispatch(asyncSetAuthUser({ email, password }));
    navigate(RoutePath.HOME);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 h-full w-full">
        <h2 className="text-2xl font-semibold mb-4">Daftar</h2>

        <RegistartionInput register={onRegister} />
        <UserFormLink type="register" />
      </div>
    </div>
  );
}

export default RegistrationPage;
