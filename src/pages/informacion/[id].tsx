import { useRouter } from "next/router";
import Sintomas from "../../public/sintomas.jpg";
import Diagnostico from "../../public/diagnostico.jpg";
import Tratamiento from "../../public/tratamiento.jpg";

import { useGetInformation } from "../../services/information/custom-hooks";
import InformationSelected from "src/components/information/informationSelected";
import ButtonAuth from "src/components/buttons/buttonAuth";
import SimulatorButton from "src/components/simulator/simulatorButton";

const about = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data } = useGetInformation(id);

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="w-full h-full lg:w-3/5 lg:h-4/5 bg-blacksecondary md:rounded-xl flex flex-col items-center">
        <section className="w-full lg:-mt-20 flex flex-col items-center">
          {data?.image ? (
            <img
              className="w-full h-full object-cover max-w-[24rem] max-h-[24rem]"
              src={data?.image}
            />
          ) : null}
          <span className="font-bold text-4xl w-full py-5 text-center">
            {data?.Enfermedad}
          </span>
        </section>
        <section className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 row-span-2 gap-8 my-4 px-10">
          {data?.Tratamiento?.length ? (
            <InformationSelected
              name="Tratamientos"
              img={Tratamiento}
              data={data.Tratamiento}
            />
          ) : null}
          {data?.Síntoma?.length ? (
            <InformationSelected
              name="Sintomas"
              img={Sintomas}
              data={data.Síntoma}
            />
          ) : null}
          {data?.Diagnostico?.length ? (
            <InformationSelected
              name="Diagnosticos"
              img={Diagnostico}
              data={data.Diagnostico}
            />
          ) : null}
          {data?.Sintomas_tempranos?.length ? (
            <InformationSelected
              name="Sintomas tempranos"
              img={Sintomas}
              data={data.Sintomas_tempranos}
            />
          ) : null}
          {data?.Sintomas_avanzados?.length ? (
            <InformationSelected
              name="Sintomas avanzados"
              img={Sintomas}
              data={data.Sintomas_avanzados}
            />
          ) : null}
        </section>
        <section className="flex justify-between gap-10 w-10/12 mb-10">
          <SimulatorButton name="Regresar" onClick={() => router.back} />
          <SimulatorButton
            name="Ir al simulador"
            onClick={() => router.push("/simulador")}
          />
        </section>
      </div>
    </main>
  );
};
export default about;
