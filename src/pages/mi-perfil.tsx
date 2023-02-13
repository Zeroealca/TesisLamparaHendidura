import { useState, useEffect, useContext } from "react";
import InputWithLabel from "../components/inputs/inputWithLabel";
import UserContext from "../context/context";
import Icon from "../components/icons";
import Images from "../components/icons/images";
import PersonCard from "../components/icons/personCard";

interface OptionsProfileProps {
  options: string;
  icon?: JSX.Element;
}
const OptionsProfile = ({ options, icon }: OptionsProfileProps) => {
  return (
    <li className="flex items-center gap-8 p-3 rounded-xl cursor-pointer hover:bg-gray-500 font-semibold text-lg">
      <Icon
        width={20}
        height={20}
        fill="currentColor"
        viewBox="16 16"
        children={icon}
      />
      {options}
    </li>
  );
};
const MiPerfil = () => {
  const { user } = useContext(UserContext);

  const { id, ...other } = user;

  const [images, setImages] = useState<any>([]);
  const [tabs, setTabs] = useState(1);

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

  const getImage = async () => {
    await fetch(process.env.API_URL + `img/user/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setImages(data.data));
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
    if (state.password === "" && state.confirmPassword === "") {
      const { password, confirmPassword, ...rest } = state;
    }
  };

  return (
    <>
      <main className="px-8 min-h-screen h-full flex items-start gap-28 pt-32">
        <section className="w-96 h-full">
          <ul className="flex flex-col gap-10">
            <OptionsProfile options="Mis datos" icon={<PersonCard />} />
            <OptionsProfile options="Mis imágenes" icon={<Images />} />
          </ul>
        </section>
        <div className="flex flex-col items-start justify-center gap-1 w-full">
          <form onSubmit={handleSubmit} className="w-full px-10 mx-auto">
            <h1 className="text-xl font-bold text-left">Mis datos</h1>
            <div className="flex flex-col lg:flex-row gap-3 w-full">
              <InputWithLabel
                label="Nombre"
                name="name"
                type="text"
                onChange={(e) => handleChange(e)}
                value={state.name || ""}
                className="flex flex-col lg:w-1/2"
              />
              <InputWithLabel
                label="Correo electrónico"
                name="email"
                type="text"
                onChange={(e) => handleChange(e)}
                value={state.email || ""}
                className="flex flex-col lg:w-1/2"
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-3 w-full">
              <InputWithLabel
                label="Nueva contraseña"
                name="password"
                type="password"
                onChange={(e) => handleChange(e)}
                value={state.password}
                className="flex flex-col lg:w-1/2"
                isPassword
              />
              <InputWithLabel
                label="Repetir contraseña"
                name="confirmPassword"
                type="password"
                onChange={(e) => handleChange(e)}
                value={state.confirmPassword}
                className="flex flex-col lg:w-1/2"
                isPassword
              />
            </div>
            <button
              type="submit"
              disabled={!isChange}
              className={`${
                !isChange ? "opacity-50" : "hover:bg-blue-700"
              } rounded-md p-2 bg-bluebutton uppercase text-white max-w-[200px] w-full font-bold`}
            >
              Guardar
            </button>
          </form>
          {/* <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl font-bold text-left">Mis imágenes</h1>
            <div className="flex flex-wrap gap-3">
              {images &&
                images.map((image: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center gap-1"
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <button className="bg-red-500 rounded-md p-2 text-white font-bold">
                      Eliminar
                    </button>
                  </div>
                ))}
            </div>
          </div> */}
        </div>
      </main>
    </>
  );
};

export default MiPerfil;
