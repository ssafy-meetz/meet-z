import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../view/login/Login';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
