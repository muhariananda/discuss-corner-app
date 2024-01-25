import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncPopulateThreadDetailsAndComments, asyncPopulateUsersAndThreads } from './action';
import { clearThreadDetailsActionCreator, receiveThreadDetailsActionCreator } from '../threadDetails/action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveCommentsActionCreator } from '../comments/action';
import api from '../../utils/api';

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  const fakeUsersResponse = [
    {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ];

  const fakeThreadsResponse = [
    {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  ];

  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching successful', async () => {
    // arrange

    /**
        stub implementation
    */
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    /**
        mock dispatch
    */
    const dispatch = vi.fn();

    // act
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange

    /**
      Stub implementation
    */
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);

    /**
      mock dispatch
    */
    const dispatch = vi.fn();

    /**
      mock alert
    */
    window.alert = vi.fn();

    // act
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncPopulateThreadDetailsAndComments thunk', () => {
  const fakeThreadDetailsResponse = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    owner: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };

  const fakeComments = fakeThreadDetailsResponse.comments;

  beforeEach(() => {
    api._getThreadDetails = api.getThreadDetails;
  });

  afterEach(() => {
    api.getThreadDetails = api._getThreadDetails;
  });

  it('should dispatch action correctly when data fetching successful', async () => {
    // arrange

    /**
      stub implementation
    */
    api.getThreadDetails = () => Promise.resolve(fakeThreadDetailsResponse);

    /**
    mock dispatch
   */
    const dispatch = vi.fn();

    // act
    await asyncPopulateThreadDetailsAndComments('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailsActionCreator());
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailsActionCreator(fakeThreadDetailsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(receiveCommentsActionCreator(fakeComments));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange

    /**
      stub implementation
    */
    api.getThreadDetails = () => Promise.reject(fakeErrorResponse);

    /**
      mock dispatch
    */
    const dispatch = vi.fn();

    /**
      mock alert
    */
    window.alert = vi.fn();

    // act
    await asyncPopulateThreadDetailsAndComments('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailsActionCreator());
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
