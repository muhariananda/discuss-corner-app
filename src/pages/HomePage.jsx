import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import HomeActionButton from '../components/HomeActionButton';
import ThreadsList from '../components/ThreadsList';

function HomePage() {
  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  if (threads.length === 0 || users.length === 0) {
    return null;
  }

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  return (
    <div className="h-screen py-2 px-4">
      <ThreadsList threads={threadList} />
      {authUser && <HomeActionButton />}
    </div>
  );
}

export default HomePage;
