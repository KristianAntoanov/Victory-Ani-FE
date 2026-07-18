import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { ROUTES } from '@/constants';

function titleForPath(pathname: string): string {
  if (pathname === ROUTES.admin.dashboard) return 'Dashboard';
  if (pathname === ROUTES.admin.newsCreate) return 'Add Journal Article';
  if (pathname === ROUTES.admin.projectsCreate) return 'Add Project';
  if (pathname.startsWith(ROUTES.admin.projects) && pathname.endsWith('/edit')) return 'Edit Project';
  if (pathname.endsWith('/edit')) return 'Edit Journal Article';
  if (pathname.startsWith(ROUTES.admin.projects)) return 'Project Management';
  if (pathname.startsWith(ROUTES.admin.news)) return 'Journal Management';
  return 'Admin';
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="admin-shell">
      <div
        className={`admin-drawer-overlay${sidebarOpen ? ' is-open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        role="presentation"
      />
      <AdminSidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <AdminHeader title={titleForPath(pathname)} onBurger={() => setSidebarOpen(true)} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
