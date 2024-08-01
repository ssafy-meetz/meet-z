import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../page/login/LoginPage';
import SignupPage from '../page/signup/SignupPage';
import YetMeetingPage from '../page/meeting/page/YetMeetingPage';
import EndMeetingPage from '../page/meeting/page/EndMeetingPage';
import MeetingLayout from '../page/meeting/MeetingLayout';
import DetailPage from '../page/meeting/page/DetailPage';
import MonitorPage from '../page/meeting/page/MonitorPage';
import CreatePage from '../page/meeting/page/CreatePage';
import ModifyPage from '../page/meeting/page/ModifyPage';
import SessionPage from '../page/session/SessionPage';
import SettingPage from '../page/setting/page/SettingPage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/setting' element={<SettingPage />} />
        <Route path='/meeting' element={<MeetingLayout />}>
          {/* 미팅 미완료 */}
          <Route path='yet' element={<YetMeetingPage />} />
          <Route path='create' element={<CreatePage />} />
          <Route path='modify/:id' element={<ModifyPage />} />
          <Route path='detail/:id' element={<DetailPage />} />

          {/* 미팅 완료 */}
          <Route path='end' element={<EndMeetingPage />} />
          <Route path='monitor/:id' element={<MonitorPage />} />
        </Route>
        <Route path='/session' element={<SessionPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
