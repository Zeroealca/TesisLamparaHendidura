import { LOGIN } from "./login";
import { SIGNUP } from "./signup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export interface returnLogin {
  message: string;
  data: {
    name: string;
    email: string;
  };
}

export const useServiceLogin = () => {
  const router = useRouter();
  const handlerLogin = async (props: {
    email: string;
    password: string;
    RememberMe: boolean;
  }) => {
    const res = await LOGIN(props);
    if (res && !res.ok) {
      toast.error("Error al iniciar sesión");
    } else if (res && res.ok) {
      router.push("/");
    }
  };

  return {
    handlerLogin,
  };
};

export const useServiceRegister = () => {
  const router = useRouter();
  const handlerRegister = async (props: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await SIGNUP(props);
    const data = await res.json();

    if (res.status !== 200) {
      toast.error(`${data.errors[0].msg}`);
    } else {
      toast.success(`${data.message}`);
      router.push("/iniciar-sesion");
    }
  };

  return {
    handlerRegister,
  };
};
