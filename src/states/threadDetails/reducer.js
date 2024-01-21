import { ActionType } from './action';

function threadDetailsReducer(threadDetails = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAILS: {
      return action.payload.thread;
    }

    case ActionType.CLEAR_THREAD_DETAILS: {
      return null;
    }

    case ActionType.UP_VOTE_THREAD_DETAILS: {
      const { userId } = action.payload;
      return {
        ...threadDetails,
        upVotesBy: threadDetails.upVotesBy.includes(userId)
          ? threadDetails.upVotesBy.filter((id) => id !== userId)
          : threadDetails.upVotesBy.concat(userId),
      };
    }

    case ActionType.DOWN_VOTE_THREAD_DETAILS: {
      const { userId } = action.payload;
      return {
        ...threadDetails,
        downVotesBy: threadDetails.downVotesBy.includes(userId)
          ? threadDetails.downVotesBy.filter((id) => id !== userId)
          : threadDetails.downVotesBy.concat(userId),
      };
    }

    default: {
      return threadDetails;
    }
  }
}

export default threadDetailsReducer;
