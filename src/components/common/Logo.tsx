interface LogoProps {
  variant?: 'default' | 'sm';
  title?: string;
}

export default function Logo({ variant = 'default', title = 'V&A Projects' }: LogoProps) {
  return (
    <span className={`logo${variant === 'sm' ? ' logo--sm' : ''}`}>
      <img src="/assets/logo-original.png" alt={title} />
    </span>
  );
}
