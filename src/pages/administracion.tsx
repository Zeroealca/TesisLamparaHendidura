import { useContext } from "react";
import UserContext from "../context/context";

const Administracion = () => {
  const { user } = useContext(UserContext);
  if (user.rol !== "ADMIN")
    return <h1>No tienes permisos para acceder a esta página</h1>;

  return <h1>Administracion</h1>;
};

export default Administracion;
