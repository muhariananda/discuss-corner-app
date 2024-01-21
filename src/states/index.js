import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import threadDetailsReducer from './threadDetails/reducer';
import commentsReducer from './comments/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import categoriesReducer from './categories/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetails: threadDetailsReducer,
    comments: commentsReducer,
    leaderboards: leaderboardsReducer,
    categories: categoriesReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
