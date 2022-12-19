import Head from "next/head";
import InputWithLabel from "../inputs/inputWithLabel";
import RememberMe from "../inputs/rememberMe";
import ButtonAuth from "../buttons/buttonAuth";
import AuthHref from "../buttons/authHref";
import AuthHeader from "../headers/authHeader";
import AuthCard from "../cards/authCard";

const loginComponent = () => {
  return (
    <>
      <Head>
        <title>Iniciar sesión</title>
      </Head>
      <main className="flex justify-center items-center p-24 min-h-screen bg-blackprimary">
        <AuthCard>
          <AuthHeader text="Iniciar sesión" />
          <form>
            <InputWithLabel
              label="Correo electrónico"
              name="email"
              type="email"
              onChange={() => {}}
            />
            <InputWithLabel
              label="Contraseña"
              name="password"
              type="password"
              isPassword
              onChange={() => {}}
            />
            <div className="flex justify-between items-center">
              <RememberMe rememberMe={false} setRememberMe={() => {}} />
              <a href="" className="font-light text-sm underline">
                Olvidé mi contraseña
              </a>
            </div>
            <ButtonAuth text="Ingresar" type="button" onClick={() => {}} />
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
