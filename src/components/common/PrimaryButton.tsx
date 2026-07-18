import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;
  to?: string;
  href?: string;
  withArrow?: boolean;
  icon?: LucideIcon;
  testId?: string;
}

type PrimaryButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

function Inner({
  children,
  withArrow,
  icon: CustomIcon,
}: {
  children: ReactNode;
  withArrow?: boolean;
  icon?: LucideIcon;
}) {
  return (
    <>
      <span>{children}</span>
      {CustomIcon ? <CustomIcon size={18} aria-hidden="true" /> : null}
      {withArrow && !CustomIcon ? <ArrowRight size={18} aria-hidden="true" /> : null}
    </>
  );
}

export default function PrimaryButton({
  children,
  to,
  href,
  withArrow = true,
  icon,
  testId,
  className: customClassName,
  ...rest
}: PrimaryButtonProps) {
  const className = `btn btn--primary ${customClassName ?? ''}`.trim();
  if (to) {
    return (
      <Link to={to} className={className} data-testid={testId}>
        <Inner withArrow={withArrow} icon={icon}>
          {children}
        </Inner>
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={className} data-testid={testId}>
        <Inner withArrow={withArrow} icon={icon}>
          {children}
        </Inner>
      </a>
    );
  }
  return (
    <button className={className} data-testid={testId} {...rest}>
      <Inner withArrow={withArrow} icon={icon}>
        {children}
      </Inner>
    </button>
  );
}
