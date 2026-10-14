import React from 'react';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <BrandLogo />
      </div>
    </header>
  );
};
