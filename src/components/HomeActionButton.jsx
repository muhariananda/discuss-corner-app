import React from 'react';
import { BiPencil } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import RoutePath from '../utils/routePath';

function HomeActionButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="add thread"
      className="fixed bottom-20 right-4 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 focus:outline-none"
      onClick={() => navigate(RoutePath.ADD_THREAD)}
    >
      <BiPencil size={24} />
    </button>
  );
}

export default HomeActionButton;
