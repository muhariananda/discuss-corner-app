import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAILS: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAILS: 'CLEAR_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAILS: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAILS: 'DOWN_VOTE_THREAD_DETAIL',
};

function receiveThreadDetailsActionCreator(thread) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAILS,
    payload: { thread },
  };
}

function clearThreadDetailsActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAILS,
  };
}

function upVoteThreadDetailsActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAILS,
    payload: { userId },
  };
}

function downVoteThreadDetailsActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAILS,
    payload: { userId },
  };
}

function asyncUpVoteThreadDetails() {
  return async (dispatch, getState) => {
    const { authUser, threadDetails } = getState();
    dispatch(upVoteThreadDetailsActionCreator(authUser.id));

    const isUpVote = threadDetails.upVotesBy.includes(authUser.id);

    try {
      if (!isUpVote) {
        await api.upVoteThread(threadDetails.id);
      } else {
        await api.neutralizeThreadVote(threadDetails.id);
      }
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadDetailsActionCreator(authUser.id));
    }
  };
}

function asyncDownVoteThreadDetails() {
  return async (dispatch, getState) => {
    const { authUser, threadDetails } = getState();
    dispatch(downVoteThreadDetailsActionCreator(authUser.id));

    const isDownVote = threadDetails.downVotesBy.includes(authUser.id);

    try {
      if (!isDownVote) {
        await api.downVoteThread(threadDetails.id);
      } else {
        await api.neutralizeThreadVote(threadDetails.id);
      }
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadDetailsActionCreator(authUser.id));
    }
  };
}

export {
  ActionType,
  receiveThreadDetailsActionCreator,
  clearThreadDetailsActionCreator,
  upVoteThreadDetailsActionCreator,
  downVoteThreadDetailsActionCreator,
  asyncUpVoteThreadDetails,
  asyncDownVoteThreadDetails,
};
