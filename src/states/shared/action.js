import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveCommentsActionCreator } from '../comments/action';
import { receiveUsersActionCreator } from '../users/action';
import { clearThreadDetailsActionCreator, receiveThreadDetailsActionCreator } from '../threadDetails/action';
import { receiveThreadsActionCreator } from '../threads/action';
import api from '../../utils/api';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const [users, threads] = await Promise.all([
        api.getAllUsers(),
        api.getAllThreads(),
      ]);

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncPopulateThreadDetailsAndComments(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailsActionCreator());
    dispatch(showLoading());

    try {
      const threadDetails = await api.getThreadDetails(threadId);
      const { comments } = threadDetails;

      dispatch(receiveThreadDetailsActionCreator(threadDetails));
      dispatch(receiveCommentsActionCreator(comments));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  asyncPopulateUsersAndThreads,
  asyncPopulateThreadDetailsAndComments,
};
