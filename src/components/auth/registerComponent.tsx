import Head from "next/head";
import InputWithLabel from "../inputs/inputWithLabel";
import RememberMe from "../inputs/rememberMe";
import ButtonAuth from "../buttons/buttonAuth";
import AuthHref from "../buttons/authHref";
import AuthHeader from "../headers/authHeader";
import AuthCard from "../cards/authCard";

const registerComponent = () => {
  return (
    <>
      <Head>
        <title>Registro</title>
      </Head>
      <main className="flex justify-center items-center p-24 min-h-screen bg-blackprimary">
        <AuthCard>
          <AuthHeader text="Registro" />
          <form>
            <InputWithLabel
              label="Usuario"
              name="usuario"
              type="text"
              onChange={() => {}}
            />
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
            <div className="flex gap-2 justify-start items-center">
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms" className="font-light text-sm">
                Acepto los{" "}
                <a href="#" className="underline text-bluebutton font-bold">
                  Términos y condiciones
                </a>
              </label>
            </div>
            <ButtonAuth text="Siguiente" type="button" onClick={() => {}} />
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
