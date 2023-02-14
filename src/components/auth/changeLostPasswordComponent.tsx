import { useState, useEffect } from "react";
import Head from "next/head";
import InputWithLabel from "../inputs/inputWithLabel";
import ButtonAuth from "../buttons/buttonAuth";
import AuthHeader from "../headers/authHeader";
import AuthCard from "../cards/authCard";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const recoveryComponent = () => {
  const router = useRouter();
  const { token, email } = router.query as {
    token: string;
    email: string;
  };

  const [state, setState] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);

  const handlerRecovery = () => {
    if (state.password !== state.passwordConfirm) return;
    setLoading(true);
    fetch(process.env.API_URL + `user/recovery-password/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: state.password, token }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data?.message?.name === "TokenExpiredError") {
          toast.error("El token ha expirado. Vuelve a solicitar el cambio");
        }

        if (data?.message?.name === "JsonWebTokenError") {
          toast.error("El token es inválido");
        }

        toast.success(data?.message);
        router.push("/iniciar-sesion");
      });
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Cambiar contraseña</title>
      </Head>
      <main className="flex justify-center items-center p-24 min-h-screen">
        <AuthCard>
          <AuthHeader text="Cambiar contraseña" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlerRecovery();
            }}
          >
            <InputWithLabel
              label="Contraseña"
              name="password"
              type="password"
              required
              isPassword
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
            <InputWithLabel
              label="Confirmar contraseña"
              name="passwordConfirm"
              type="password"
              isPassword
              required
              value={state.passwordConfirm}
              onChange={(e) =>
                setState({ ...state, passwordConfirm: e.target.value })
              }
            />
            <div className="flex items-center align-middle justify-center gap-10 -mt-7">
              <ButtonAuth
                text={loading ? "Cargando..." : "cambiar"}
                type="submit"
                disabled={
                  !state.password ||
                  !state.passwordConfirm ||
                  state.password !== state.passwordConfirm ||
                  loading
                }
                className={
                  !state.password ||
                  !state.passwordConfirm ||
                  state.password !== state.passwordConfirm ||
                  loading
                    ? "opacity-50"
                    : "hover:bg-blue-700"
                }
              />
            </div>
          </form>
        </AuthCard>
      </main>
    </>
  );
};

export default recoveryComponent;
