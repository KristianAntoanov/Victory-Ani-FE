import Icon from './Icon';

interface ProgrammeBadgeProps {
  label: string;
  icon?: string;
  solid?: boolean;
}

export default function ProgrammeBadge({ label, icon, solid }: ProgrammeBadgeProps) {
  return (
    <span className={`programme-badge${solid ? ' programme-badge--solid' : ''}`}>
      {icon ? <Icon name={icon} size={14} /> : null}
      {label}
    </span>
  );
}
