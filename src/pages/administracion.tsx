import { useContext } from "react";
import UserContext from "../context/context";
import { useRouter } from "next/router";

const Administracion = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (user.rol !== "ADMIN") return router.back();

  return <h1>Administracion</h1>;
};

export default Administracion;
