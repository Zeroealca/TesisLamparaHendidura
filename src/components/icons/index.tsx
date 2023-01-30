import React from "react";
import EyeClose from "./eyeClose";
import EyeOpen from "./eyeOpen";
import UserIcon from "./user";
import CaretDown from "./caretDown";

interface iconsProps {
  width: number;
  height: number;
  fill: string;
  children: React.ReactNode;
  viewBox: string;
  className?: string;
  [key: string]: any;
}

const icons = (props: iconsProps) => {
  const { children, viewBox, ...other } = props;
  return (
    <svg
      viewBox={`0 0 ${viewBox}`}
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      {children}
    </svg>
  );
};

export { icons as default, EyeClose, EyeOpen, UserIcon, CaretDown };
