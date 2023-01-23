import { LOGIN } from "./login";
import { SIGNUP } from "./signup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { setCookie } from "@/node/utils/cookies";
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
    const data = (await res.json()) as returnLogin;

    if (res.status !== 200) {
      toast.error(`${data.message}`);
    } else {
      const { RememberMe } = props;

      if (RememberMe) {
        setCookie("sessionSlimpLamp", data.data);
      } else {
        setCookie(
          "sessionSlimpLamp",
          data.data,
          new Date(Date.now() + 3600000)
        );
      }
      toast.success(`${data.message}`);
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
      console.log(data)
      toast.error(`${data.errors[0].msg}`);
    } else {
      toast.success(`${data.message}`);
      setCookie("signupSlimpLamp", true);
      router.push("/iniciar-sesion");
    }
  };

  return {
    handlerRegister,
  };
};
