import React from "react";

interface ButtonAuthProps {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick: () => void;
}

const ButtonAuth = (props: ButtonAuthProps) => {
  const { text, type, onClick } = props;

  return (
    <div className="flex justify-center mt-10 mb-3">
      <button
        type={type}
        onClick={onClick}
        className="rounded-md p-2 bg-bluebutton uppercase text-white hover:bg-blue-700 max-w-[200px] w-full font-bold"
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonAuth;
