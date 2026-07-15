import { Route, Routes } from 'react-router';
import {
  NewsPage,
  StudentPage,
  AdminPage,
  ComunicationPage,
  LoginPage,
} from '../pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<LoginPage />}></Route>
      <Route path="/news" element={<NewsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/student" element={<StudentPage />} />
      <Route path="/admin/comunicados" element={<ComunicationPage />} />
    </Routes>
  );
}
