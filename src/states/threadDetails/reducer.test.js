import { describe, it, expect } from 'vitest';
import threadDetailsReducer from './reducer';

/**
  threadDetailsReducer function
    - should return initial state when given by unknown action
    - should return thread when given by RECEIVE_THREAD_DETAILS action
    - should return null when given by CLEAR_THREAD_DETAILS action
    - should return the thread with up votes by user when give by UP_VOTE_THREAD_DETAILS action
    - should return the thread with down votes by user when give by DOWN_VOTE_THREAD_DETAILS action
*/

describe('threadDetailsReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // act
    const nextState = threadDetailsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return thread when given by RECEIVE_THREAD_DETAILS action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'RECEIVE_THREAD_DETAILS',
      payload: {
        thread: {
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
        },
      },
    };

    // act
    const nextState = threadDetailsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.thread);
  });

  it('should return null when given by CLEAR_THREAD_DETAILS action', () => {
    // arrange
    const initialState = {
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

    const action = { type: 'CLEAR_THREAD_DETAILS' };

    // act
    const nextState = threadDetailsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return the thread with up votes by user when give by UP_VOTE_THREAD_DETAILS action', () => {
    // arrange
    const initialState = {
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

    const action = {
      type: 'UP_VOTE_THREAD_DETAILS',
      payload: { userId: 'user-1' },
    };

    // act: up vote thread
    const nextState = threadDetailsReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
    });

    // act: neutralize thread vote
    const nextState2 = threadDetailsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the thread with down votes by user when give by DOWN_VOTE_THREAD_DETAILS action', () => {
    // arrange
    const initialState = {
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

    const action = {
      type: 'DOWN_VOTE_THREAD_DETAILS',
      payload: { userId: 'user-1' },
    };

    // act: up vote thread
    const nextState = threadDetailsReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload.userId],
    });

    // act: neutralize thread vote
    const nextState2 = threadDetailsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});
