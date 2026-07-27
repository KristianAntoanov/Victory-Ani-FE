import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Newspaper, LogOut, ExternalLink, FolderKanban } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants';

interface AdminSidebarProps {
  open: boolean;
  onNavigate: () => void;
}

export default function AdminSidebar({ open, onNavigate }: AdminSidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.admin.login, { replace: true });
  };

  return (
    <aside className={`admin-sidebar${open ? ' is-open' : ''}`} data-testid="admin-sidebar">
      <div className="admin-sidebar__logo">
        <span style={{ border: '2px solid #fff', borderRadius: 4, padding: '2px 6px', fontSize: '1rem' }}>
          V&amp;A
        </span>
        <span>Admin</span>
      </div>

      <nav className="admin-nav" aria-label="Admin">
        <NavLink
          to={ROUTES.admin.dashboard}
          end
          onClick={onNavigate}
          className={({ isActive }) => (isActive ? 'is-active' : '')}
          data-testid="admin-nav-dashboard"
        >
          <LayoutDashboard size={18} aria-hidden="true" /> Dashboard
        </NavLink>
        <NavLink
          to={ROUTES.admin.news}
          onClick={onNavigate}
          className={({ isActive }) => (isActive ? 'is-active' : '')}
          data-testid="admin-nav-news"
        >
          <Newspaper size={18} aria-hidden="true" /> Journal Management
        </NavLink>
        <NavLink
          to={ROUTES.admin.projects}
          onClick={onNavigate}
          className={({ isActive }) => (isActive ? 'is-active' : '')}
          data-testid="admin-nav-projects"
        >
          <FolderKanban size={18} aria-hidden="true" /> Project Management
        </NavLink>
        <NavLink to={ROUTES.home} onClick={onNavigate} className="">
          <ExternalLink size={18} aria-hidden="true" /> View Site
        </NavLink>
      </nav>

      <button type="button" className="admin-logout" onClick={handleLogout} data-testid="admin-logout">
        <LogOut size={18} aria-hidden="true" /> Logout
      </button>
    </aside>
  );
}
