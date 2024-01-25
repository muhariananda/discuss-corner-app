import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';
import RoutePath from '../utils/routePath';
import UserFormLink from '../components/UserFormLink';

function LoginPage() {
  const authUser = useSelector((state) => state.authUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) navigate(RoutePath.HOME);
  }, [authUser, navigate]);

  const onLoginHandler = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 w-full h-full">
        <h2 className="text-2xl font-semibold mb-4 text-blue-950">Login</h2>

        <LoginInput login={onLoginHandler} />
        <UserFormLink type="login" />
      </div>
    </div>
  );
}

export default LoginPage;
