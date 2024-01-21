/* eslint-disable no-underscore-dangle */
import api from '../../utils/api';

const ActionType = {
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
};

function receiveCommentsActionCreator(comments) {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    payload: { comments },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncAddCommment({ threadId, content }) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

function _isUserUpVoteComment({ authUser, comments, commentId }) {
  return comments.includes(
    (comment) => comment.id === commentId && comment.upVotesBy.includes(authUser.id),
  );
}

function _isUserDownVoteComment({ authUser, comments, commentId }) {
  return comments.includes(
    (comment) => comment.id === commentId && comment.downVotesBy.includes(authUser.id),
  );
}

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));

    const isUpVote = _isUserUpVoteComment({ ...getState(), commentId });

    try {
      if (!isUpVote) {
        await api.upVoteComment({ threadId, commentId });
      } else {
        await api.neutralizeCommentVote({ threadId, commentId });
      }
    } catch (error) {
      alert(error.message);
      dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));

    const isDownVote = _isUserDownVoteComment({ ...getState(), commentId });

    try {
      if (!isDownVote) {
        await api.downVoteComment({ threadId, commentId });
      } else {
        await api.neutralizeCommentVote({ threadId, commentId });
      }
    } catch (error) {
      alert(error.message);
      dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveCommentsActionCreator,
  addCommentActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  asyncAddCommment,
  asyncUpVoteComment,
  asyncDownVoteComment,
};
