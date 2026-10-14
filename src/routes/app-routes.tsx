import { Route, Routes } from 'react-router';
import {
  ListAnnouncementsPage,
  AnnouncementPage,
} from '@/modules/announcements/pages';
import { LoginPage } from '@/modules/login';
import { PostPage } from '@/modules/post/pages/post.page';
import { NewsPage } from '../pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<LoginPage />}></Route>
      <Route path="/news" element={<NewsPage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/comunicados" element={<ListAnnouncementsPage />} />
      <Route path="/comunicados/:identify" element={<AnnouncementPage />} />
    </Routes>
  );
}
