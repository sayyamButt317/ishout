import { Button } from '@/components/ui/button';

import React from 'react';

interface CustomButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  asChild?: boolean;
}

const CustomButton = ({
  onClick,
  disabled,
  children,
  className,
  style,
  asChild = false,
}: CustomButtonProps) => {
  return (
    <Button
      asChild={asChild}
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={`
        italic text-white text-sm font-sm flex-nonetext-white flex items-center justify-center gap-2 rounded-md px-6 h-9 cursor-pointer transition-all duration-75 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
        ${className}
      `}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
