'use client';

import React, { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
  prefetch?: boolean;
  style?: React.CSSProperties;
}

export default function LinkButton({
  href,
  children,
  className = '',
  onClick,
  target,
  rel,
  prefetch,
  style,
}: LinkButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  // Reset loading state when pathname changes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  // Check if it's an external link
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Don't show loading for external links or if default is prevented
    if (isExternal || e.defaultPrevented) {
      return;
    }

    // Don't show loading if opening in new tab
    if (target === '_blank' || e.metaKey || e.ctrlKey) {
      return;
    }

    // Don't show loading if we're already on this page
    if (pathname === href) {
      return;
    }

    // Set loading state
    setIsLoading(true);

    // Use startTransition for smoother navigation
    startTransition(() => {
      router.push(href);
    });
  };

  // For external links, use regular anchor tag
  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        target={target}
        rel={rel}
        style={style}
        data-non-editable="linkbutton"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${className} ${(isLoading || isPending) ? 'pointer-events-none cursor-wait select-none' : 'cursor-pointer'} relative transition-transform duration-150 ease-out`}
      onClick={handleClick}
      target={target}
      rel={rel}
      prefetch={prefetch}
      style={style}
      data-non-editable="linkbutton"
    >
      {children}
      {(isLoading || isPending) && (
        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-current origin-center animate-[underscorePulse_1s_ease-in-out_infinite]" />
      )}
    </Link>
  );
}

