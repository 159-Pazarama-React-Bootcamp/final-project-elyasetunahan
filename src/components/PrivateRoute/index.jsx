import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const { loggedIn } = useSelector((state) => state.admin);

  if (!loggedIn) {
    return <Navigate to="/admin" />;
  }
  return <Outlet />;
}

export default PrivateRoute;
