import { useRouter } from "next/router";
import Image from "next/image";
import Sintomas from "../../public/sintomas.jpg";
import Diagnostico from "../../public/diagnostico.jpg";
import Tratamiento from "../../public/tratamiento.jpg";

import { useGetInformation } from "../../services/information/custom-hooks";

const about = () => {
  const router = useRouter();
  const id = router.query.id as string;
  /* const newdata = data_information.find((item) => item.id === id); */

  const { data } = useGetInformation(id);

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="w-3/5 h-4/5 bg-blacksecondary rounded-xl flex flex-col items-center">
        <section className="-mt-20 flex flex-col items-center">
          {data?.image ? (
            <img
              className="w-full h-full object-cover max-w-[24rem] max-h-[24rem]"
              src={data?.image}
            />
          ) : null}
          <span className="font-bold text-4xl w-full py-5">
            {data?.Enfermedad}
          </span>
        </section>
        <section className="w-full overflow-auto grid grid-cols-3 gap-8 px-10">
          {data?.Tratamiento?.length ? (
            <div className="h-full w-full flex flex-col justify-center group">
              <div className="h-44 w-full relative rounded-xl flex flex-col items-center justify-center cursor-pointer">
                <Image
                  src={Tratamiento}
                  alt={"404"}
                  className="absolute w-full h-full object-cover blur-sm"
                />
                <span className="z-10 text-black/75 text-4xl font-bold text-center">
                  Tratamientos
                </span>
              </div>
              <div className="w-full mt-10 h-48 overflow-auto bg-blacktertiary rounded-lg py-3 hidden group-hover:block">
                {data.Tratamiento.map((item, index) => {
                  return (
                    <div className="mb-2 px-8 text-grayprimary overflow-auto">
                      <span className="text-xl font-bold capitalize">
                        {index + 1}. {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          {data?.Síntoma?.length ? (
            <div className="h-full w-full flex flex-col justify-center group">
              <div className="h-44 w-full relative rounded-xl flex flex-col items-center justify-center cursor-pointer">
                <Image
                  src={Sintomas}
                  alt={"404"}
                  className="absolute w-full h-full object-cover blur-sm"
                />
                <span className="z-10 text-black/75 text-4xl font-bold text-center">
                  Síntomas
                </span>
              </div>
              <div className="w-full mt-10 h-48 overflow-auto bg-blacktertiary rounded-lg py-3 hidden group-hover:block">
                {data.Síntoma.map((item, index) => {
                  return (
                    <div className="mb-2 px-8 text-grayprimary overflow-auto">
                      <span className="text-xl font-bold capitalize">
                        {index + 1}. {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          {data?.Diagnostico?.length ? (
            <div className="h-full w-full flex flex-col justify-center group">
              <div className="h-44 w-full relative rounded-xl flex flex-col items-center justify-center cursor-pointer">
                <Image
                  src={Diagnostico}
                  alt={"404"}
                  className="absolute w-full h-full object-cover blur-sm"
                />
                <span className="z-10 text-black/75 text-4xl font-bold text-center">
                  Diagnosticos
                </span>
              </div>
              <div className="w-full mt-10 h-48 overflow-auto bg-blacktertiary rounded-lg py-3 hidden group-hover:block">
                {data.Diagnostico.map((item, index) => {
                  return (
                    <div className="mb-2 px-8 text-grayprimary overflow-auto">
                      <span className="text-xl font-bold capitalize">
                        {index + 1}. {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          {data?.Sintomas_tempranos?.length ? (
            <div className="h-full w-full flex flex-col justify-center group">
              <div className="h-44 w-full relative rounded-xl flex flex-col items-center justify-center cursor-pointer">
                <Image
                  src={Tratamiento}
                  alt={"404"}
                  className="absolute w-full h-full object-cover blur-sm"
                />
                <span className="z-10 text-black/75 text-4xl font-bold text-center">
                  Sintomas tempranos
                </span>
              </div>
              <div className="w-full mt-10 h-48 overflow-auto bg-blacktertiary rounded-lg py-3 hidden group-hover:block">
                {data.Sintomas_tempranos.map((item, index) => {
                  return (
                    <div className="mb-2 px-8 text-grayprimary overflow-auto">
                      <span className="text-xl font-bold capitalize">
                        {index + 1}. {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          {data?.Sintomas_avanzados?.length ? (
            <div className="h-full w-full flex flex-col justify-center group">
              <div className="h-44 w-full relative rounded-xl flex flex-col items-center justify-center cursor-pointer">
                <Image
                  src={Tratamiento}
                  alt={"404"}
                  className="absolute w-full h-full object-cover blur-sm"
                />
                <span className="z-10 text-black/75 text-4xl font-bold text-center">
                  Sintomas avanzados
                </span>
              </div>
              <div className="w-full mt-10 h-48 overflow-auto bg-blacktertiary rounded-lg py-3 hidden group-hover:block">
                {data.Sintomas_avanzados.map((item, index) => {
                  return (
                    <div className="mb-2 px-8 text-grayprimary overflow-auto">
                      <span className="text-xl font-bold capitalize">
                        {index + 1}. {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* <div className="h-full bg-blacktertiary rounded-xl flex flex-col items-center justify-center">
            <Image
              src={Diagnostico}
              alt={"404"}
              className="w-full h-full object-cover blur-sm"
            />
          </div>
          <div className="h-full bg-blacktertiary rounded-xl flex flex-col items-center justify-center">
            <Image
              src={Tratamiento}
              alt={"404"}
              className="w-full h-full object-cover blur-sm"
            />
            <div className="absolute flex flex-col">
              <span className="font-bold text-2xl">Tratamiento</span>
            </div>
          </div>
          <div className="h-full bg-blacktertiary rounded-xl flex flex-col items-center justify-center">
            <Image
              src={Tratamiento}
              alt={"404"}
              className="w-full h-full object-cover blur-sm"
            />
          </div> */}
        </section>
      </div>
    </main>
  );
};
export default about;
