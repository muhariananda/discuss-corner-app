import React from 'react';
import PropTypes from 'prop-types';
import {
  BiUpvote, BiSolidUpvote, BiDownvote, BiSolidDownvote,
} from 'react-icons/bi';
import { checkUserHasLogged } from '../utils';

function ThreadDetailsActions({
  userId,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
}) {
  const totalUpVotes = upVotesBy.length;
  const totalDownVotes = downVotesBy.length;

  const hasUserUpVoted = upVotesBy.includes(userId);
  const hasUserDownVoted = downVotesBy.includes(userId);

  const handleUpvote = () => {
    checkUserHasLogged(userId);
    if (hasUserDownVoted) downVote();

    upVote();
  };

  const handleDownVote = () => {
    checkUserHasLogged(userId);
    if (hasUserUpVoted) upVote();

    downVote();
  };

  const iconUpVote = hasUserUpVoted ? <BiSolidUpvote /> : <BiUpvote />;
  const iconDownVote = hasUserDownVoted ? <BiSolidDownvote /> : <BiDownvote />;
  const getVoteIconColor = (hasVoted) => (hasVoted ? 'text-blue-600' : 'text-blue-950');

  const actions = [
    {
      id: 1,
      total: totalUpVotes,
      icon: iconUpVote,
      iconColor: getVoteIconColor(hasUserUpVoted),
      onClick: handleUpvote,
    },
    {
      id: 2,
      total: totalDownVotes,
      icon: iconDownVote,
      iconColor: getVoteIconColor(hasUserDownVoted),
      onClick: handleDownVote,
    },
  ];

  return (
    <div className="flex">
      {
        actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={action.onClick}
            className={`
              flex items-center rounded-md border 
              text-blue-950 border-gray-300 px-4 py-2 mr-2
              hover:bg-gray-300 focus:outline-none
        `}
          >
            <span className={`mr-2 ${action.iconColor}`}>{action.icon}</span>
            {action.total}
          </button>
        ))
      }
    </div>
  );
}

ThreadDetailsActions.defaultProps = {
  userId: null,
};

ThreadDetailsActions.propTypes = {
  userId: PropTypes.string,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadDetailsActions;
