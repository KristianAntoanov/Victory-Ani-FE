import {
  Atom,
  GraduationCap,
  Leaf,
  Users,
  Landmark,
  PenLine,
  Handshake,
  Search,
  Rocket,
  Lightbulb,
  Target,
  Compass,
  Globe,
  Coins,
  Check,
  CircleCheck,
  FileSearch,
  Binoculars,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  atom: Atom,
  'graduation-cap': GraduationCap,
  leaf: Leaf,
  users: Users,
  landmark: Landmark,
  'pen-line': PenLine,
  handshake: Handshake,
  search: Search,
  rocket: Rocket,
  lightbulb: Lightbulb,
  target: Target,
  compass: Compass,
  globe: Globe,
  coins: Coins,
  check: Check,
  'circle-check': CircleCheck,
  'file-search': FileSearch,
  binoculars: Binoculars,
};

interface IconProps {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function Icon({ name, size = 24, strokeWidth = 1.6, className }: IconProps) {
  const Component = ICON_MAP[name] ?? Target;
  return <Component size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}
