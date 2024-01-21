import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCretor(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: { leaderboards },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCretor(leaderboards));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCretor,
  asyncReceiveLeaderboards,
};
