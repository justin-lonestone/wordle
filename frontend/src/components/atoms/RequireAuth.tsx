import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from './AuthProvider';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  console.log(auth);

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
