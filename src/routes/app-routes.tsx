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
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/news" element={<NewsPage />} />
      <Route path="" element={<AdminPage />} />
      <Route path="/comunicados" element={<ComunicationPage />} />
    </Routes>
  );
}
