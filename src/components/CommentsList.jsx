import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentsList({
  comments, userId, upVote, downVote,
}) {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          owner={comment.owner}
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
          userId={userId}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </div>
  );
}

CommentsList.defaultProps = {
  userId: null,
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      upVotesBy: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ).isRequired,
      downVotesBy: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
    }).isRequired,
  ).isRequired,
  userId: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default CommentsList;
