import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import RoutePath from '../utils/routePath';
import AddThreadInput from '../components/AddThreadInput';

function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAddThreadHandler = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate(RoutePath.HOME);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold ml-2 mb-4">Buat diskusi baru</h1>
      <AddThreadInput addThread={onAddThreadHandler} />
    </div>
  );
}

export default AddThreadPage;
