import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import Layout from './Layout';
import PrivateLayout from './PrivateLayout';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<PrivateLayout />} path="/">
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
