import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import BottomNavBar from './components/BottomNavBar';
import Topbar from './components/Topbar';
import HomePage from './pages/HomePage';
import RoutePath from './utils/routePath';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import ThreadDetailsPage from './pages/ThreadDetailsPage';
import AddThreadPage from './pages/AddThreadPage';
import LeaderboardsPage from './pages/LeaderboarsPage';

function App() {
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <div>
      <Topbar />
      <main>
        <Routes>
          <Route path={RoutePath.HOME} element={<HomePage />} />
          <Route path={RoutePath.LOGIN} element={<LoginPage />} />
          <Route path={RoutePath.REGISTER} element={<RegistrationPage />} />
          <Route path={RoutePath.USER} element={<UserPage />} />
          <Route path={RoutePath.ADD_THREAD} element={<AddThreadPage />} />
          <Route path={RoutePath.THREAD_DETAILS} element={<ThreadDetailsPage />} />
          <Route path={RoutePath.LEADERBOARDS} element={<LeaderboardsPage />} />
        </Routes>
      </main>
      <BottomNavBar />
    </div>
  );
}

export default App;
