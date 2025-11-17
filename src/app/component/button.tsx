import { Button } from "@/components/ui/button";

import React from "react";

interface CustomButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: React.ReactNode;
  style?: React.CSSProperties;
}

const CustomButton = ({
  onClick,
  disabled,
  children,
  className,
  style,
}: CustomButtonProps) => {
  return (
    <>
      <Button
        disabled={disabled}
        onClick={onClick}
        style={style}
        className={`italic text-sm  font-sm flex-none text-white justify-center flex gap-2 items-center rounded-md group relative overflow-hidden duration-75 z-20 px-6 h-9 transition-all cursor-pointer lg:pl-7 lg:pr-4 
        ${className}`}
      >
        {children}
      </Button>
    </>
  );
};

export default CustomButton;
