import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoggedRoute from './components/LoggedRoute';
import PrivateRoute from './components/PrivateRoute';
import db from './firebase';
import {
  AdminPage,
  AdminApplicationEditPage,
  AdminApplicationListPage,
  ApplicationStatusPage,
  ApplicationSuccessPage,
  CheckApplicationPage,
  CreateApplicationPage,
} from './pages';
import { setLoggedIn } from './redux/adminSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const checkAdmin = async () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) {
      dispatch(setLoggedIn(false));
    } else {
      const querySnapshot = await getDocs(collection(db, 'admin'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.username === username && data.password === password) {
          dispatch(setLoggedIn(true));
        }
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/basvuru-olustur" />} />
        <Route path="/basvuru-olustur" element={<CreateApplicationPage />} />
        <Route path="/basvuru-basarili" element={<ApplicationSuccessPage />} />
        <Route path="/basvuru-sorgula" element={<CheckApplicationPage />} />
        <Route path="/basvuru/:basvuruNo" element={<ApplicationStatusPage />} />

        <Route element={<LoggedRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            path="/admin/basvuru-listesi"
            element={<AdminApplicationListPage />}
          />
          <Route
            path="/admin/basvuru/:basvuruNo"
            element={<AdminApplicationEditPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
