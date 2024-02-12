import React from 'react';
import Loading from './Loading';
import Logo from '../images/logo.png';

function Topbar() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex justify-center items-center p-4 bg-gray-50 text-gray-900 border-b-2 z-10">
        <div>
          <img src={Logo} alt="logo" className="h-8" />
        </div>
      </div>
      <div className="mt-16">
        <Loading />
      </div>
    </>
  );
}

export default Topbar;
