import React from 'react';
import { Route, Routes } from 'react-router';
import RequireAuth from '../atoms/RequireAuth';
import Home from './Home';
import Login from './Login';

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
