import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function LoggedRoute() {
  const { loggedIn } = useSelector((state) => state.admin);

  if (loggedIn) {
    return <Navigate to="/admin/basvuru-listesi" />;
  }
  return <Outlet />;
}

export default LoggedRoute;
