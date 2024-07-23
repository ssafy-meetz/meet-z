import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../view/login/LoginPage';
import SignupPage from '../view/signup/SignupPage';
import EndMeetingPage from '../meeting/EndMeetingPage';
import YetMeetingPage from '../meeting/YetMeetingPage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/endmeet' element={<EndMeetingPage />} />
        <Route path='/yetmeet' element={<YetMeetingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
