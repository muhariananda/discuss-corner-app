import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncUpVoteThread, asyncDownVoteThread } from '../states/threads/action';
import HomeActionButton from '../components/HomeActionButton';
import ThreadsList from '../components/ThreadsList';
import CategoriesList from '../components/CategoriesList';

function HomePage() {
  const users = useSelector((state) => state.users);
  const threads = useSelector((state) => state.threads);
  const authUser = useSelector((state) => state.authUser);

  const [categoryParams, setCategoryParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(() => categoryParams.get('category') || '');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onSelectCategoryHandler = (newCategory) => {
    if (newCategory === selectedCategory) {
      setSelectedCategory('');
      setCategoryParams({ category: '' });
    } else {
      setSelectedCategory(newCategory);
      setCategoryParams({ category: newCategory });
    }
  };

  const onUpVoteThreadHandler = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const onDownVoteThreadHandler = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  if (threads.length === 0 || users.length === 0) {
    return null;
  }

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    userId: authUser?.id || null,
  }));

  const filteredThreadList = threadList.filter(
    (thread) => thread.category && thread.category.includes(selectedCategory),
  );

  const categories = Array.from(new Set(threads.map((thread) => thread.category)));

  const isThreadsEmpty = filteredThreadList === 0;

  return (
    <div className="h-full pt-2 pb-16 px-4">

      <div className="p-4 mb-2 bg-gray-50 rounded">

        <h1 className="py-2 text-lg text-blue-950 font-semibold">Kategori Populer</h1>

        <CategoriesList
          categories={categories}
          selectedCategory={selectedCategory}
          selectCategory={onSelectCategoryHandler}
        />
      </div>

      {!isThreadsEmpty ? (
        <ThreadsList
          threads={filteredThreadList}
          upVote={onUpVoteThreadHandler}
          downVote={onDownVoteThreadHandler}
        />
      ) : (
        <p>Tidak ada diskusi</p>
      )}
      {authUser && <HomeActionButton />}
    </div>
  );
}

export default HomePage;
