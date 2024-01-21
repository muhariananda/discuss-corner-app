import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import postedAt from '../utils';

function ThreadItem({
  avatar, name, date, category, title, id,
}) {
  return (
    <div className="bg-gray-50 rounded-md p-4 mb-3 hover:bg-gray-200">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-3">
          <p className="text-sm text-blue-950 font-medium">{name}</p>
          <p className="text-xs text-gray-500 font-light">{postedAt(date)}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-blue-600 font-medium mb-1">
          {`#${category}`}
        </p>

        <p className="text-lg text-blue-950 font-semibold hover:text-blue-900">
          <Link to={`/threads/${id}`}>{title}</Link>
        </p>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ThreadItem;
