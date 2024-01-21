import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ThreadActions from './ThreadActions';
import { postedAt } from '../utils/index';

function ThreadItem({
  id,
  title,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  name,
  avatar,
  userId,
  upVote,
  downVote,
}) {
  const formattedDate = postedAt(createdAt);

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
          <p className="text-xs text-gray-500 font-light">{formattedDate}</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-blue-600 font-medium mb-1">{`#${category}`}</p>
        <p className="text-lg text-blue-950 font-semibold hover:text-blue-900">
          <Link to={`/threads/${id}`}>{title}</Link>
        </p>
      </div>

      <ThreadActions
        id={id}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        totalComments={totalComments}
        userId={userId}
        upVote={upVote}
        downVote={downVote}
      />
    </div>
  );
}

ThreadItem.defaultProps = {
  userId: null,
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  userId: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadItem;
