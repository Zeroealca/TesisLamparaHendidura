import Router from "next/router";

export default function FourOhFour() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl">404 | Página no encontrada</h1>
      <div
        onClick={() => Router.back()}
        className="text-blue-400 cursor-pointer"
      >
        Volver atrás
      </div>
    </div>
  );
}

FourOhFour.getLayout = function PageLayout(page: React.ReactNode) {
  return <>{page}</>;
};
