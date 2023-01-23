import Link from "next/link";
interface InformationMenuProps {
  id: number;
  name: string;
  // to: string;
}
const InformationMenu = ({ name, id }: InformationMenuProps) => {
  return (
    <Link
      href={`informacion/${id}`}
      className="w-full p-5 bg-blacktertiary hover:bg-blacksecondary rounded-xl flex items-center justify-center text-center"
    >
      <h1 className="text-white text-2xl font-bold uppercase">{name}</h1>
    </Link>
  );
};
export default InformationMenu;
