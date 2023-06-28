import { useState } from "react";
import Head from "next/head";
import InputWithLabel from "../inputs/inputWithLabel";
import RememberMe from "../inputs/rememberMe";
import ButtonAuth from "../buttons/buttonAuth";
import AuthHref from "../buttons/authHref";
import AuthHeader from "../headers/authHeader";
import AuthCard from "../cards/authCard";
import { useServiceLogin } from "../../services/auth/custom-hook";

const loginComponent = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    RememberMe: true,
  });

  const { handlerLogin } = useServiceLogin();

  return (
    <>
      <Head>
        <title>Iniciar sesión</title>
      </Head>
      <main className="flex justify-center items-center p-24 min-h-screen">
        <AuthCard>
          <AuthHeader text="Iniciar sesión" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlerLogin(state);
            }}
          >
            <InputWithLabel
              label="Correo electrónico"
              name="email"
              type="email"
              required
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
            <InputWithLabel
              label="Contraseña"
              name="password"
              type="password"
              isPassword
              required
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
            <div className="flex justify-end items-center">
              <a
                href="recuperar-contrasena"
                className="font-light text-sm underline text-white"
              >
                Olvidé mi contraseña
              </a>
            </div>
            <ButtonAuth
              text="Ingresar"
              type="submit"
              disabled={!state.email || !state.password}
              className={
                !state.email || !state.password
                  ? "opacity-50"
                  : "hover:bg-blue-700"
              }
            />
            <AuthHref
              text="¿Aún no estás registrado?"
              textAnchor="Regístrate"
              href="/registro"
            />
          </form>
        </AuthCard>
      </main>
    </>
  );
};

export default loginComponent;
