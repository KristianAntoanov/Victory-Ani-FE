import type { ReactNode } from 'react';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  withDash?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  withDash = true,
}: SectionTitleProps) {
  return (
    <div className={`section-title${align === 'center' ? ' section-title--center' : ''}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {withDash ? <span className="dash" /> : null}
      {description ? <p>{description}</p> : null}
    </div>
  );
}
