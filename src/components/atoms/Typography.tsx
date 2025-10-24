import React from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'p' | 'label';
  children: React.ReactNode;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = React.memo(
  ({ variant = 'p', children, className = '' }) => {
    const Component = variant as keyof JSX.IntrinsicElements;

    return <Component className={className}>{children}</Component>;
  }
);
