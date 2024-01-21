import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentsList({ comments }) {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          owner={comment.owner}
        />
      ))}
    </div>
  );
}

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
};

export default CommentsList;
