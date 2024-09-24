import React from 'react';
import { IconType } from 'react-icons';

interface RoundIconProps {
  className?: string;
  icon: React.ReactNode;
  title?: string;
}

export default function RoundIcon({ className, icon, title }: RoundIconProps) {
  return (
    <div className={`h-10 w-10 flex items-center justify-center bg-white rounded-full ${className}`} title={title}>
      {icon}
    </div>
  );
}