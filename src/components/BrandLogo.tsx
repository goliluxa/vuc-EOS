import React from 'react';
import { Link } from 'react-router-dom';
import vucEmblem from '../assets/images/vuc-emblem.png';

interface BrandLogoProps {
  asLink?: boolean;
  to?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  asLink = true,
  to = '/',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: { img: 'w-8 h-8', red: 'text-[9px]', main: 'text-xs' },
    md: { img: 'w-10 h-10 sm:w-11 sm:h-11', red: 'text-[10px] sm:text-[11px]', main: 'text-xs sm:text-sm' },
    lg: { img: 'w-12 h-12 sm:w-14 sm:h-14', red: 'text-xs', main: 'text-sm sm:text-base' },
  }[size];

  const content = (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      <img
        src={vucEmblem}
        alt="Эмблема Военного учебного центра ЧувГУ"
        className={`${sizeClasses.img} object-contain shrink-0 drop-shadow-xs transition-transform duration-200 group-hover:scale-105`}
        loading="eager"
        width={44}
        height={44}
      />
      <div className="flex flex-col min-w-0 justify-center">
        <span
          className={`${sizeClasses.red} uppercase font-bold text-military-red tracking-wider leading-tight`}
        >
          ВОЕННЫЙ УЧЕБНЫЙ ЦЕНТР
        </span>
        <span
          className={`${sizeClasses.main} font-bold text-content-primary leading-tight`}
        >
          ЧГУ им. И. Н. Ульянова
        </span>
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link
        to={to}
        className="group inline-flex items-center focus-visible:rounded-md focus-visible:outline-none"
        aria-label="На главную страницу ИОС ВУЦ"
      >
        {content}
      </Link>
    );
  }

  return content;
};
