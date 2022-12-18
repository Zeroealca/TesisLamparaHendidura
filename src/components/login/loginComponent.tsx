import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import logo from "../../public/logo.png";

const loginComponent = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className="flex justify-center items-center p-24 min-h-screen bg-blackprimary">
        <div className="flex flex-col gap-5 px-12 py-8 rounded-[20px] max-w-[446px] w-full bg-blacksecondary">
          <div className="flex flex-col items-center gap-9 text-center">
            <Image src={logo} alt="logo" />
            <h2 className="uppercase font-semibold text-2xl">Iniciar Sesión</h2>
          </div>
          <form>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-light text-md">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-lg bg-grayprimary text-black focus:outline-none focus:ring-4 focus:border-bluebutton focus:bg-slate-200"
              />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <label htmlFor="password" className="font-light text-md">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 rounded-lg bg-grayprimary text-black focus:outline-none focus:ring-4 focus:border-bluebutton focus:bg-slate-200"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember" className="font-light text-sm">
                  Recuérdame
                </label>
              </div>
              <a href="" className="font-light text-sm underline">
                Olvidé mi contraseña
              </a>
            </div>
            <div className="flex justify-center mt-10 mb-3">
              <button
                type="submit"
                className="rounded-md p-2 bg-bluebutton uppercase text-white hover:bg-blue-700 max-w-[200px] w-full font-bold"
              >
                Ingresar
              </button>
            </div>
            <div>
              <p className="text-center text-sm font-light mt-4">
                ¿No tienes una cuenta?{" "}
                <a href="" className="font-bold text-bluebutton">
                  Regístrate
                </a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default loginComponent;
