import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BiLogOut } from 'react-icons/bi';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import RoutePath from '../utils/routePath';

function UserPage() {
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    dispatch(asyncUnsetAuthUser());
    navigate(RoutePath.HOME);
  };

  return (
    <div className="h-screen p-3 flex flex-col items-center">
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <img
          src={authUser.avatar}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-4 text-center">
        <p className="mb-2 text-blue-950 text-xl font-semibold">{authUser.name}</p>
        <p className="text-gray-600 text-sm">{authUser.email}</p>
        <p className="text-gray-500 text-xs">{authUser.id}</p>
      </div>

      <button
        type="button"
        aria-label="keluar"
        className="flex items-center justify-center w-full bg-red-500 text-white p-2 rounded-md mt-4"
        onClick={onLogoutHandler}
      >
        <BiLogOut className="mr-2" />
        Keluar
      </button>
    </div>
  );
}

export default UserPage;
