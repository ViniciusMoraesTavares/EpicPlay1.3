import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return <Element {...rest} />;
};

export default PrivateRoute;
