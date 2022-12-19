import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";

interface AuthHeaderProps {
  text: string;
}

const AuthHeader = (props: AuthHeaderProps) => {
  const { text } = props;
  return (
    <div className="flex flex-col items-center gap-9 text-center">
      <Image src={logo} alt="logo" />
      <h2 className="uppercase font-semibold text-2xl">{text}</h2>
    </div>
  );
};

export default AuthHeader;
