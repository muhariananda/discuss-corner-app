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
    <div className="bg-slate-100 rounded-md p-4 mb-3 hover:bg-gray-200">
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
  /** The id of the thread */
  id: PropTypes.string.isRequired,
  /** The title of the thread */
  title: PropTypes.string.isRequired,
  /** The category of the thread */
  category: PropTypes.string.isRequired,
  /** The date when the thread was created */
  createdAt: PropTypes.string.isRequired,
  /** Total thread comments */
  totalComments: PropTypes.number.isRequired,
  /** List of users who have selected upvote */
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** List of users who have selected downvote */
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** The name of the user who created the thread */
  name: PropTypes.string.isRequired,
  /** The avatar of the user who created the thread */
  avatar: PropTypes.string.isRequired,
  /** The current user's userId */
  userId: PropTypes.string,
  /** Action when user is clikcked up vote button */
  upVote: PropTypes.func.isRequired,
  /** Action when user is clikcked down vote button */
  downVote: PropTypes.func.isRequired,
};

export default ThreadItem;
