import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardsList({ leaderboards }) {
  return (
    <div>
      {leaderboards.map((leaderboard, index) => (
        <LeaderboardItem
          key={leaderboard.user.id}
          rank={index + 1}
          user={leaderboard.user}
          score={leaderboard.score}
        />
      ))}
    </div>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      score: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default LeaderboardsList;
