import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Technique } from "src/services/technique/custom-hooks";
const Tecnica = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Technique>();
  const getTechniqueInformation = async () => {
    const res = await fetch(process.env.API_URL + `technique/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    data?.data ? setData(data.data[0]) : router.push("/404");
  };

  useEffect(() => {
    id && getTechniqueInformation();
  }, [id]);

  return (
    <div className="h-screen w-10/12 2xl:w-1/2 mx-auto pt-20">
      <h1 className="text-center text-4xl font-bold mb-10">{data?.name}</h1>
      <div className="flex flex-col md:flex-row lg:text-start items-center text-center gap-10 mb-10">
        <section className="w-full h-50 mx-auto">
          <img
            className="w-full h-full rounded-lg object-contain"
            src={data?.imageNormal}
            alt={data?.name}
          />
        </section>
        <section>
          <h1 className="text-2xl font-bold">Descripción</h1>
          <p className="text-lg">{data?.description}</p>
        </section>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-start text-center mb-8">
        <div className="flex justify-between w-full lg:w-1/2">
          <section className="flex flex-col gap-5 w-1/3">
            <h1 className="text-2xl font-bold">Ángulo de iluminación</h1>
            <p className="text-lg">{data?.lightingAngle}</p>
          </section>
          <section className="flex flex-col gap-5 w-1/3">
            <h1 className="text-2xl font-bold">Magnificación</h1>
            <p className="text-lg">{data?.magnification}</p>
          </section>
        </div>
        <section className="w-full flex flex-col gap-5 lg:w-1/3">
          <h1 className="text-2xl font-bold">Observación</h1>
          {data?.assess &&
            Object.keys(JSON.parse(data?.assess)).map((key, index) => (
              <div key={index}>
                {key === "options" && (
                  <p className="text-lg">
                    {JSON.parse(data?.assess)[key].map((option: any) => (
                      <span>{option.name}</span>
                    ))}
                  </p>
                )}
                {key === "text" && (
                  <p className="text-lg text-justify">
                    {JSON.parse(data?.assess)[key]}
                  </p>
                )}
              </div>
            ))}
        </section>
      </div>
      <div className="w-full lg:w-1/2 h-52 mx-auto mb-10">
        <p className="text-center text-lg font-bold">
          Imagen de referencia Técnica
        </p>
        <img
          className="w-full h-full rounded-lg"
          src={data?.imageTechnique}
          alt={data?.name}
        />
      </div>
    </div>
  );
};

export default Tecnica;
