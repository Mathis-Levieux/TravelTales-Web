import React from 'react';

interface RoundIconProps {
  className?: string;
  icon: React.ReactNode;
}

export default function RoundIcon({ className, icon }: RoundIconProps) {
  return (
    <div className={`h-10 w-10 flex items-center justify-center bg-white rounded-full ${className}`}>
      {icon}
    </div>
  );
}