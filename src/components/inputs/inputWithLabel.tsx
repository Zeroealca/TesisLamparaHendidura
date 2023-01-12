import React, { useState } from "react";
import Icon, { EyeOpen, EyeClose } from "../icons";

interface InputWithLabelProps {
  label: string;
  name: string;
  type: string;
  isPassword?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string | number | readonly string[] | undefined;
}
const InputWithLabel = (props: InputWithLabelProps) => {
  const { label, name, type, onChange, isPassword, required, value } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 my-2">
      <label htmlFor={name} className="font-light text-md">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          onChange={onChange}
          required={required}
          value={value}
          className="w-full px-4 py-2 rounded-lg bg-grayprimary text-black focus:outline-none focus:ring-4 focus:border-bluebutton focus:bg-slate-200"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className={`absolute ${showPassword ? "top-2.5" : "top-2"} right-2`}
          >
            <Icon fill="#212121" viewBox="24 24" height={25} width={25}>
              {showPassword ? <EyeClose /> : <EyeOpen />}
            </Icon>
          </button>
        )}
      </div>
    </div>
  );
};

export default InputWithLabel;
