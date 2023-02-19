import React from "react";

interface SimulatorCardProps {
  children: React.ReactNode;
}

const SimulatorCard = (props: SimulatorCardProps) => {
  const { children } = props;
  return (
    <div className="flex flex-col gap-5 px-12 py-5 rounded-[20px] max-w-6xl w-full bg-blacksecondary">
      {children}
    </div>
  );
};

export default SimulatorCard;
