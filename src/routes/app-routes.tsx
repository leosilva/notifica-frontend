import { Route, Routes } from 'react-router';
import { NewsPage } from '../pages/news-page';
import { AdminPage } from '../pages/admin-page';
import { StudentPage } from '../pages/student-page';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/news" element={<NewsPage />} />
      <Route path="" element={<StudentPage />} />
    </Routes>
  );
}
