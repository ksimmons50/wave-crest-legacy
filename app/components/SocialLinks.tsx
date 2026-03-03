import React from 'react';
import SocialIcon, { SocialPlatform } from './icons/SocialIcons';
import { PROFESSIONAL_SOCIAL_LINKS } from '../../professionalConstants';

const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  x: 'X (Twitter)',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
};

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export default function SocialLinks({
  className = 'flex space-x-4',
  iconClassName = 'w-6 h-6',
}: SocialLinksProps) {
  const activeLinks = (Object.entries(PROFESSIONAL_SOCIAL_LINKS) as [SocialPlatform, string][])
    .filter(([, url]) => url && url.trim() !== '');

  if (activeLinks.length === 0) return null;

  return (
    <div className={className}>
      {activeLinks.map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={PLATFORM_LABELS[platform]}
          className="hover:opacity-75 transition-opacity"
        >
          <SocialIcon platform={platform} className={iconClassName} />
        </a>
      ))}
    </div>
  );
}
