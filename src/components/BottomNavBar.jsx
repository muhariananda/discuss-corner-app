import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiHome, BiTrophy, BiUser } from 'react-icons/bi';
import RoutePath from '../utils/routePath';

function BottomNavbar() {
  const authUser = useSelector((state) => state.authUser);

  const navigationItems = [
    {
      id: 1,
      label: 'Home',
      path: RoutePath.HOME,
      icon: <BiHome />,
    },
    {
      id: 2,
      label: 'Leaderboards',
      path: RoutePath.LEADERBOARDS,
      icon: <BiTrophy />,
    },
    {
      id: 3,
      label: 'User',
      path: authUser ? RoutePath.USER : RoutePath.LOGIN,
      icon: <BiUser />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-50 text-gray-700 p-4 border-t-2">
      <ul className="flex justify-around">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <Link to={item.path} className="flex flex-col items-center text-xl hover:text-blue-600">
              {item.icon}
              <span className="text-xs hover:font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNavbar;
