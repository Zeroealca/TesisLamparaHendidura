import Head from "next/head";
import MenuCards from "src/components/cards/menu/menuCards";
import Info from "src/public/assets/cards/information.png";
import Hendidura from "src/public/assets/cards/hendidura.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>Simulador - Lámpara Hendidura</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen flex items-center justify-center lg:gap-10 gap-24 lg:flex-row flex-col lg:my-0 my-20 px-10">
        <MenuCards
          title="Información"
          description="Aquí podrás encontrar información acerca de las enfermedades que puede sufrir el ojo humano"
          image={Info}
          to="/informacion"
        />
        <MenuCards
          title="Simulador"
          description="Aquí podrás simular la enfermedad de la lámpara de hendidura"
          image={Hendidura}
          to="/simulador"
        />
      </main>
    </>
  );
}
