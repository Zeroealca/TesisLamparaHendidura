import Icon from "../icons";

interface SimulatorButtonProps {
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
}
const SimulatorButton = ({ name, onClick, icon }: SimulatorButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-5 py-2 px-10 bg-blacktertiary rounded-lg hover:bg-blacktertiary/60 cursor-pointer"
    >
      <Icon
        children={icon}
        fill="#212121"
        viewBox="16 16"
        height={35}
        width={35}
      />
      <span className="font-bold text-lg">{name}</span>
    </button>
  );
};
export default SimulatorButton;
