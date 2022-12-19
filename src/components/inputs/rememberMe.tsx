import React from "react";

interface RememberMeProps {
  rememberMe: boolean;
  setRememberMe: (rememberMe: boolean) => void;
}

const RememberMe = (props: RememberMeProps) => {
  const { rememberMe, setRememberMe } = props;

  return (
    <div className="flex gap-2 items-center ">
      <input type="checkbox" name="remember" id="remember" className="switch" />
      <label htmlFor="remember" className="font-light text-sm">
        Recuérdame
      </label>
    </div>
  );
};

export default RememberMe;
