import { Linkedin } from 'lucide-react';
import type { TeamMember } from '@/types';

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className="card team-card" data-testid={`team-card-${member.id}`}>
      <a
        href={member.linkedin}
        target="_blank"
        rel="noreferrer"
        className="team-card__linkedin"
        aria-label={`${member.name} on LinkedIn`}
      >
        <Linkedin size={20} aria-hidden="true" />
      </a>
      <div className="team-card__photo">
        <img src={member.image} alt={member.imageAlt} loading="lazy" />
      </div>
      <h3 className="team-card__name">{member.name}</h3>
      <p className="team-card__role">{member.position}</p>
      <p className="team-card__desc">{member.description}</p>
    </article>
  );
}
