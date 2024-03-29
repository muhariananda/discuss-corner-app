import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { postedAt } from '../utils/index';
import CommentActions from './CommentActions';

function CommentItem({
  id,
  userId,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
}) {
  const { name, avatar } = owner;

  return (
    <div className="flex items-start py-4 rounded hover:bg-slate-100">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full mr-3"
      />

      <div className="flex flex-col">
        <div className="flex items-center mb-1">
          <p className="text-blue-950 text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-400 ml-2">{postedAt(createdAt)}</p>
        </div>

        <p className="text-sm text-gray-500">{parse(content)}</p>

        <div>
          <CommentActions
            id={id}
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            userId={userId}
            upVote={upVote}
            downVote={downVote}
          />
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default CommentItem;
