import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { clearThreadDetailsActionCreator, receiveThreadDetailsActionCreator } from '../threadDetails/action';
import { receiveCommentsActionCreator } from '../comments/action';
import api from '../../utils/api';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const [threads, users] = await Promise.all([
        api.getAllThreads(),
        api.getAllUsers(),
      ]);

      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
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
