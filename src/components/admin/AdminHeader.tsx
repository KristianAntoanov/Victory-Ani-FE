import { Menu, UserCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AdminHeaderProps {
  title: string;
  onBurger: () => void;
}

export default function AdminHeader({ title, onBurger }: AdminHeaderProps) {
  const { session } = useAuth();
  return (
    <header className="admin-header" data-testid="admin-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          className="admin-burger"
          aria-label="Open admin menu"
          onClick={onBurger}
          data-testid="admin-burger"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
        <h1 className="admin-header__title">{title}</h1>
      </div>
      <div className="admin-header__user">
        <UserCircle2 size={22} aria-hidden="true" />
        <span>{session?.email}</span>
      </div>
    </header>
  );
}
