import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ rank, user, score }) {
  const { avatar, name } = user;
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <div className="flex items-center">
        <span className="mr-8 pl-4 font-medium">{rank}</span>
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-4">
          <p className="text-blue-950 text-lg font-medium">{name}</p>
        </div>
      </div>
      <p className="text-gray-500 text-lg font-medium">{score}</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  rank: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
