import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardsList from '../components/LeaderboardsList';

function LeaderboardsPage() {
  const leaderboards = useSelector((state) => state.leaderboards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (!leaderboards) {
    return null;
  }

  return (
    <div className="h-full px-8 pt-4 pb-20">
      <h1 className="mt-2 mb-4 text-xl text-blue-950 font-semibold">
        Klasemen Pengguna Aktif
      </h1>
      <LeaderboardsList leaderboards={leaderboards} />
    </div>
  );
}

export default LeaderboardsPage;
