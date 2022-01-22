import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  AdminPage,
  AdminApplicationEditPage,
  AdminApplicationListPage,
  ApplicationStatusPage,
  ApplicationSuccessPage,
  CheckApplicationPage,
  CreateApplicationPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/basvuru-olustur" />} />
        <Route path="/basvuru-olustur" element={<CreateApplicationPage />} />
        <Route path="/basvuru-basarili" element={<ApplicationSuccessPage />} />
        <Route path="/basvuru-sorgula" element={<CheckApplicationPage />} />
        <Route path="/basvuru/:basvuruNo" element={<ApplicationStatusPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/admin/basvuru-listesi"
          element={<AdminApplicationListPage />}
        />

        <Route
          path="/admin/basvuru/:basvuruNo"
          element={<AdminApplicationEditPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
