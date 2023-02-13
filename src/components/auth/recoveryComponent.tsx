import { useState } from "react";
import Head from "next/head";
import InputWithLabel from "../inputs/inputWithLabel";
import ButtonAuth from "../buttons/buttonAuth";
import AuthHeader from "../headers/authHeader";
import AuthCard from "../cards/authCard";

const recoveryComponent = () => {
  const [state, setState] = useState({
    email: "",
  });

  const handlerRecovery = (email: string) => {
    fetch(process.env.API_URL + `user/recovery-password/${email}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <Head>
        <title>Recuperar contraseña</title>
      </Head>
      <main className="flex justify-center items-center p-24 min-h-screen">
        <AuthCard>
          <AuthHeader text="Recuperar contraseña" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlerRecovery(state.email);
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
            <div className="flex items-center align-middle justify-center gap-10 -mt-7">
              <a
                type="button"
                href="/iniciar-sesion"
                className="bg-gray-200 mt-10 mb-3 hover:bg-gray-300 text-gray-800 font-bold p-2 rounded inline-flex items-center"
              >
                CANCELAR
              </a>
              <ButtonAuth
                text="Enviar"
                type="submit"
                disabled={!state.email}
                className={!state.email ? "opacity-50" : "hover:bg-blue-700"}
              />
            </div>
          </form>
        </AuthCard>
      </main>
    </>
  );
};

export default recoveryComponent;
