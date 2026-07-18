import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/components/common/ScrollToTop';
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { ROUTES } from '@/constants';

import Home from '@/pages/public/home/Home';
import About from '@/pages/public/about/About';
import Team from '@/pages/public/team/Team';
import Projects from '@/pages/public/projects/Projects';
import ProjectDetails from '@/pages/public/project-details/ProjectDetails';
import News from '@/pages/public/news/News';
import NewsDetails from '@/pages/public/news-details/NewsDetails';
import Services from '@/pages/public/services/Services';
import Programmes from '@/pages/public/programmes/Programmes';
import Contact from '@/pages/public/contact/Contact';
import PrivacyPolicy from '@/pages/public/legal/PrivacyPolicy';
import TermsConditions from '@/pages/public/legal/TermsConditions';
import NotFound from '@/pages/public/not-found/NotFound';

import AdminLogin from '@/pages/admin/admin-login/AdminLogin';
import AdminDashboard from '@/pages/admin/admin-dashboard/AdminDashboard';
import AdminNews from '@/pages/admin/admin-news/AdminNews';
import AdminProjects from '@/pages/admin/admin-projects/AdminProjects';
import NewsCreate from '@/pages/admin/news-create/NewsCreate';
import NewsEdit from '@/pages/admin/news-edit/NewsEdit';
import ProjectCreate from '@/pages/admin/project-create/ProjectCreate';
import ProjectEdit from '@/pages/admin/project-edit/ProjectEdit';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.team} element={<Team />} />
          <Route path={ROUTES.projects} element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path={ROUTES.news} element={<News />} />
          <Route path="/news/:slug" element={<NewsDetails />} />
          <Route path={ROUTES.services} element={<Services />} />
          <Route path={ROUTES.programmes} element={<Programmes />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path={ROUTES.privacyPolicy} element={<PrivacyPolicy />} />
          <Route path={ROUTES.termsConditions} element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin login (no admin chrome) */}
        <Route path={ROUTES.admin.login} element={<AdminLogin />} />

        {/* Protected admin area */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.admin.dashboard} element={<AdminDashboard />} />
          <Route path={ROUTES.admin.news} element={<AdminNews />} />
          <Route path={ROUTES.admin.newsCreate} element={<NewsCreate />} />
          <Route path="/admin/news/:id/edit" element={<NewsEdit />} />
          <Route path={ROUTES.admin.projects} element={<AdminProjects />} />
          <Route path={ROUTES.admin.projectsCreate} element={<ProjectCreate />} />
          <Route path="/admin/projects/:id/edit" element={<ProjectEdit />} />
        </Route>
      </Routes>
    </>
  );
}
