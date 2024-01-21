import { ActionType } from './action';

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_COMMENTS: {
      return action.payload.comments;
    }

    case ActionType.ADD_COMMENT: {
      return [action.payload.comment, ...comments];
    }

    case ActionType.UP_VOTE_COMMENT: {
      const { commentId, userId } = action.payload;
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(commentId)
              ? comment.upVotesBy.filter((id) => id !== commentId)
              : comment.upVotesBy.concat(userId),
          };
        }
        return comment;
      });
    }

    case ActionType.DOWN_VOTE_COMMENT: {
      const { commentId, userId } = action.payload;
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(userId)
              ? comment.downVotesBy.filter((id) => id !== userId)
              : comment.downVotesBy.concat(userId),
          };
        }
        return comment;
      });
    }

    default: {
      return comments;
    }
  }
}

export default commentsReducer;
