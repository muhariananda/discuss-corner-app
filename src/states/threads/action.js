/* eslint-disable no-underscore-dangle */
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    try {
      const thread = api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function _isUserUpVoteThread({ authUser, threads, threadId }) {
  return threads.some(
    (thread) => thread.id === threadId && thread.upVotesBy.includes(authUser.id),
  );
}

function _isUserDownVoteThread({ authUser, threads, threadId }) {
  return threads.some(
    (thread) => thread.id === threadId && thread.downVotesBy.includes(authUser.id),
  );
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    const hasUpVoted = _isUserUpVoteThread({ ...getState(), threadId });

    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      if (!hasUpVoted) {
        await api.upVoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    const hasDownVoted = _isUserDownVoteThread({ ...getState(), threadId });

    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      if (!hasDownVoted) {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
};
