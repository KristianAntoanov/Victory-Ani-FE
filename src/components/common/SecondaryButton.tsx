import { Link } from 'react-router-dom';
import { type LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;
  to?: string;
  href?: string;
  icon?: LucideIcon;
  testId?: string;
}

type SecondaryButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

function Inner({ children, icon: CustomIcon }: { children: ReactNode; icon?: LucideIcon }) {
  return (
    <>
      <span>{children}</span>
      {CustomIcon ? <CustomIcon size={18} aria-hidden="true" /> : null}
    </>
  );
}

export default function SecondaryButton({
  children,
  to,
  href,
  icon,
  testId,
  className: customClassName,
  ...rest
}: SecondaryButtonProps) {
  const className = `btn btn--secondary ${customClassName ?? ''}`.trim();
  if (to) {
    return (
      <Link to={to} className={className} data-testid={testId}>
        <Inner icon={icon}>{children}</Inner>
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={className} data-testid={testId}>
        <Inner icon={icon}>{children}</Inner>
      </a>
    );
  }
  return (
    <button className={className} data-testid={testId} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
