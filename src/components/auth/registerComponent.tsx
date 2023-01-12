import { useState } from "react";
import Head from "next/head";
import InputWithLabel from "../inputs/inputWithLabel";
import ButtonAuth from "../buttons/buttonAuth";
import AuthHref from "../buttons/authHref";
import AuthHeader from "../headers/authHeader";
import AuthCard from "../cards/authCard";
import { useServiceRegister } from "../../services/auth/custom-hook";

const registerComponent = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    terms: true,
  });

  const isComplete =
    !state.email || !state.password || !state.name || !state.terms;

  const { handlerRegister } = useServiceRegister();

  return (
    <>
      <Head>
        <title>Registro</title>
      </Head>
      <main className="flex justify-center items-center p-24 min-h-screen bg-blackprimary">
        <AuthCard>
          <AuthHeader text="Registro" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlerRegister(state);
            }}
          >
            <InputWithLabel
              label="Nombre"
              name="name"
              type="text"
              value={state.name}
              required
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
            <InputWithLabel
              label="Correo electrónico"
              name="email"
              type="email"
              value={state.email}
              required
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
            <InputWithLabel
              label="Contraseña"
              name="password"
              type="password"
              isPassword
              value={state.password}
              required
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
            <div className="flex gap-2 justify-start items-center">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={state.terms}
                onChange={(e) =>
                  setState({ ...state, terms: e.target.checked })
                }
              />
              <label htmlFor="terms" className="font-light text-sm">
                Acepto los{" "}
                <a href="#" className="underline text-bluebutton font-bold">
                  Términos y condiciones
                </a>
              </label>
            </div>
            <ButtonAuth
              text="Siguiente"
              type="submit"
              className={isComplete ? "opacity-50" : "hover:bg-blue-700"}
              disabled={isComplete}
            />
            <AuthHref
              text="¿Ya estás registrado?"
              textAnchor="Iniciar sesión"
              href="/iniciar-sesion"
            />
          </form>
        </AuthCard>
      </main>
    </>
  );
};

export default registerComponent;
