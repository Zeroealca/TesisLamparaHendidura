import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard = (props: AuthCardProps) => {
  const { children } = props;
  return (
    <div className="flex flex-col gap-5 px-12 py-8 rounded-[20px] max-w-[446px] w-full bg-blacksecondary">
      {children}
    </div>
  );
};

export default AuthCard;
