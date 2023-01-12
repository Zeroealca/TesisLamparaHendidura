import React from "react";

interface ButtonAuthProps {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
  disabled?: boolean;
}

const ButtonAuth = (props: ButtonAuthProps) => {
  const { text, type, disabled, className } = props;

  return (
    <div className="flex justify-center mt-10 mb-3">
      <button
        type={type}
        className={`rounded-md p-2 bg-bluebutton uppercase text-white max-w-[200px] w-full font-bold ${className}`}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonAuth;
