import React from "react";

interface RememberMeProps {
  rememberMe: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RememberMe = (props: RememberMeProps) => {
  const { rememberMe, onChange } = props;

  return (
    <div className="flex gap-2 items-center ">
      <input
        type="checkbox"
        name="remember"
        id="remember"
        checked={rememberMe}
        className="switch"
        onChange={onChange}
      />
      <label htmlFor="remember" className="font-light text-sm">
        Recuérdame
      </label>
    </div>
  );
};

export default RememberMe;
