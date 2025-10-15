import { Button } from "@/components/ui/button";

import React from "react";

interface CustomButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children:React.ReactNode;
  className?:React.ReactNode;
  

}

const CustomButton = ({
  onClick,
  disabled,
  children,
}: CustomButtonProps) => {
  return (
    <>
      <Button
        disabled={disabled}
        onClick={onClick}
        className="flex-none bg-gradient-to-r from-emerald-500 to-teal-500 hover:bg-[#80de38] text-white justify-center flex gap-2 items-center rounded-full font-medium text-base lg:text-xl group relative overflow-hidden duration-75 z-20 px-6 h-12 lg:h-14 transition-all cursor-pointer lg:pl-7 lg:pr-4"
      >
        {children}
      </Button>
    </>
  );
};

export default CustomButton;
