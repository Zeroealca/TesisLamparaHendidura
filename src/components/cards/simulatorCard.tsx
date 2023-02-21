import React from "react";

interface SimulatorCardProps {
  children: React.ReactNode;
}

const SimulatorCard = (props: SimulatorCardProps) => {
  const { children } = props;
  return (
    <div className="flex flex-col gap-5 md:px-12 py-5 md:rounded-[20px] w-full max-w-none  md:max-w-6xl bg-blacksecondary">
      {children}
    </div>
  );
};

export default SimulatorCard;
