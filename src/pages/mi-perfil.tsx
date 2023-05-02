import { useState, useEffect, useContext } from "react";
import InputWithLabel from "../components/inputs/inputWithLabel";
import UserContext from "../context/context";
import Icon from "../components/icons";
import Images from "../components/icons/images";
import PersonCard from "../components/icons/personCard";
import ProfileImage from "src/components/profile/profileImage";
import ReturnArrow from "src/components/icons/returnArrow";
import { useRouter } from "next/router";

interface OptionsProfileProps {
  options: string;
  icon?: JSX.Element;
  className?: string;
  isActive?: boolean;
  setTabs?: () => void;
}
interface Comments {
  id: number;
  comment: string;
  id_user: number;
  name: string;
  date: Date;
}
export interface Iimage {
  id_image: string;
  url: string;
  name: string;
  details?: string;
  state?: string;
  externalId: string;
  comments: Comments[];
}

const OptionsProfile = ({
  options,
  icon,
  isActive,
  className,
  setTabs,
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
        viewBox="16 16"
        children={icon}
      />
      <span className={`hidden md:block`}>{options}</span>
    </li>
  );
};
const MiPerfil = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const { id, ...other } = user;

  const [images, setImages] = useState<Iimage[]>([]);
  const params = Number(router.query.tab);
  const [tabs, setTabs] = useState<number>(1);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    setState({ ...state, ...other });
  }, [user]);

  useEffect(() => {
    params && setTabs(params);
  }, [params]);

  const getImage = async () => {
    if (user.rol === "ESTUDIANTE") {
      await fetch(process.env.API_URL + `img/user/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setImages(data.data));
    } else {
      await fetch(process.env.API_URL + "img/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setImages(data.data));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    user.id && getImage();
  }, [user]);

  useEffect(() => {
    if (user.email === state.email && user.name === state.name) {
      setIsChange(false);
    } else {
      setIsChange(true);
    }
  }, [state.email, state.name]);

  useEffect(() => {
    if (
      state.password !== "" &&
      state.confirmPassword !== "" &&
      state.password === state.confirmPassword
    ) {
      setIsChange(true);
    } else {
      setIsChange(false);
    }
  }, [state.password, state.confirmPassword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: {
      name?: string;
      email?: string;
      password?: string;
    } = {};
    if (state.password !== "" && state.confirmPassword !== "") {
      data.password = state.password;
    }
    if (state.name !== user.name) {
      data.name = state.name;
    }
    if (state.email !== user.email) {
      data.email = state.email;
    }
    Object.keys(data).length > 0 && updateUser(data);
  };

  const updateUser = async (data: {
    name?: string;
    email?: string;
    password?: string;
  }) => {
    fetch(process.env.API_URL + `user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setState({ email: "", name: "", password: "", confirmPassword: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <main className="px-8 min-h-screen h-full flex flex-col items-start gap-10 md:gap-28 pt-32 md:flex-row">
        <section className="w-full md:w-96">
          <ul className="flex justify-center md:flex-col gap-3 pl-0 md:pl-20 md:gap-8">
            <OptionsProfile
              options="Mis datos"
              icon={<PersonCard />}
              isActive={tabs === 1}
              setTabs={() => setTabs(1)}
            />
            <OptionsProfile
              options="Mis imágenes"
              icon={<Images />}
              isActive={tabs === 2}
              setTabs={() => setTabs(2)}
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
            className={`flex flex-col items-start gap-1 w-full py-16 px-10 rounded-xl bg-blacksecondary ${
              images?.length > 0 ? "" : "h-[50rem]"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className={`${tabs === 1 ? "block" : "hidden"} w-full mx-auto`}
            >
              <h1 className="text-xl font-bold text-left">Mis datos</h1>
              <div className="flex flex-col lg:flex-row gap-10 w-full">
                <InputWithLabel
                  label="Nombre"
                  name="name"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={state.name || ""}
                  className="lg:w-1/2"
                />
                <InputWithLabel
                  label="Correo electrónico"
                  name="email"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={state.email || ""}
                  className="lg:w-1/2"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-10 w-full">
                <InputWithLabel
                  label="Nueva contraseña"
                  name="password"
                  type="password"
                  onChange={(e) => handleChange(e)}
                  value={state.password}
                  className="lg:w-1/2"
                  isPassword
                />
                <InputWithLabel
                  label="Repetir contraseña"
                  name="confirmPassword"
                  type="password"
                  onChange={(e) => handleChange(e)}
                  value={state.confirmPassword}
                  className="lg:w-1/2"
                  isPassword
                />
              </div>
              <div className="flex justify-center mt-20">
                <button
                  type="submit"
                  disabled={!isChange}
                  className={`${
                    !isChange ? "opacity-50" : "hover:bg-blue-700"
                  } rounded-md p-2 bg-bluebutton uppercase text-white max-w-[200px] w-full font-bold`}
                >
                  Actualizar datos
                </button>
              </div>
            </form>
            <div className={`${tabs === 2 ? "block" : "hidden"} w-full`}>
              <ProfileImage
                images={images}
                setImages={setImages}
                rol={user.rol}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MiPerfil;
