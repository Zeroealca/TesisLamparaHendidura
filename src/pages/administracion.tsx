import { useContext, useEffect, useState } from "react";
import UserContext from "../context/context";
import { useRouter } from "next/router";
import Icon from "../components/icons";
import EnrollIcon from "src/components/icons/enroll";
import ReturnArrow from "src/components/icons/returnArrow";
import CreateParallel from "src/components/admin/createParallel";

interface OptionsProfileProps {
  options: string;
  icon?: JSX.Element;
  className?: string;
  isActive?: boolean;
  setTabs?: () => void;
  viewBox?: string;
}
interface Parallel {
  id: string;
  name: string;
  docente: { id: number; name: string };
}
interface Teacher {
  id: string;
  name: string;
  email: string;
  rol: string;
}

const Administracion = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [tabs, setTabs] = useState<number>(1);
  const [parallels, setParallels] = useState<Parallel[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  if (user.rol !== "ADMIN") return router.back();

  const getParallels = async () => {
    await fetch(process.env.API_URL + `parallel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setParallels(data.data);
      });
  };

  const getUsers = async () => {
    await fetch(process.env.API_URL + `user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setTeachers(data.data3));
  };

  useEffect(() => {
    getParallels();
    getUsers();
  }, []);

  return (
    <>
      <main className="px-8 min-h-screen h-full flex flex-col items-start gap-10 md:gap-28 pt-32 md:flex-row">
        <section className="w-full md:w-96">
          <ul className="flex justify-center md:flex-col gap-3 pl-0 md:pl-20 md:gap-8">
            <OptionsProfile
              options="Paralelos"
              icon={<EnrollIcon />}
              isActive={tabs === 1}
              setTabs={() => setTabs(1)}
            />

            <OptionsProfile
              options="Regresar"
              icon={<ReturnArrow />}
              isActive={tabs === 3}
              setTabs={() => router.back()}
            />
          </ul>
        </section>
        <section className="w-full">
          <div
            className={`flex flex-col items-start gap-1 w-full py-16 px-10 rounded-xl bg-blacksecondary`}
          >
            <div className={`${tabs === 1 ? "block" : "hidden"} w-full`}>
              <CreateParallel
                parallels={parallels}
                getParallels={getParallels}
                teachers={teachers}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Administracion;

const OptionsProfile = ({
  options,
  icon,
  isActive,
  className,
  setTabs,
  viewBox = "16 16",
}: OptionsProfileProps) => {
  return (
    <li
      className={`flex items-center justify-evenly w-full gap-2 p-3 rounded-xl cursor-pointer hover:bg-gray-500 font-semibold text-lg md:justify-start md:gap-8 ${
        isActive ? "bg-gray-500" : ""
      } ${className}`}
      onClick={setTabs}
    >
      <Icon
        width={20}
        height={20}
        fill="currentColor"
        viewBox={viewBox}
        children={icon}
      />
      <span className={`hidden md:block`}>{options}</span>
    </li>
  );
};
