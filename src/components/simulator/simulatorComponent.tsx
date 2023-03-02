import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import eye from "../../public/eye.jpg";
import SimulatorCard from "../cards/simulatorCard";
import RangeComponent from "../range/rangeComponent";
import Icon from "../icons";
import ReturnArrow from "../icons/returnArrow";
import Upload from "../icons/upload";
import Save from "../icons/save";
import SimulatorButton from "./simulatorButton";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useGetAllTechnique } from "src/services/technique/custom-hooks";

const simulatorComponent = () => {
  const { data } = useSession();
  const { techniques } = useGetAllTechnique();
  // techniques?.map((tech) => console.log(tech.name, JSON.parse(tech.assess)));
  const router = useRouter();
  const lane = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { id_image, url, details } = router.query as {
    id_image?: string;
    url: string;
    details?: string;
  };
  const [show, setShow] = useState(!!details);
  const [idImage, setIdImage] = useState(id_image);
  const [description, setDescription] = useState<string>(
    details ? String(details) : ""
  );
  const [technique, setTechnique] = useState<object[]>();
  const [state, setState] = useState({
    orientation: 0,
    width: 1,
    movement: 50,
    intensity: 25,
    zoom: 1,
    color: "#FFFFFF",
  });
  const [image, setImage] = useState<{ imageUrl: string; imageFile?: File }>({
    imageUrl: "",
    imageFile: undefined,
  });
  const image_condition = url ? url : eye.src;

  const uploadImage = () => {
    const fd = new FormData();
    fd.append("file", image.imageFile as File);
    fd.append("user", String(data?.user?.id));
    idImage && fd.append("id_image", idImage);
    show && fd.append("details", description);
    const res = fetch(process.env.API_URL + "img", {
      method: "POST",
      body: fd,
    });
    toast.promise(res, {
      pending: "Subiendo imagen",
      success: {
        render: () => {
          return (
            <div>
              <span className="block">La imagen se subió de forma exitosa</span>
              <a
                href="/mi-perfil?tab=2"
                className="block text-center underline font-semibold"
                onClick={() => {
                  toast.dismiss();
                }}
              >
                Ver Galería
              </a>
            </div>
          );
        },
      },
      error: "Error al subir la imagen",
    });
  };
  useEffect(() => {
    setTechnique([]);
    techniques.filter((tech) => {
      const { orientation, intensity } = JSON.parse(tech.assess);
      const degrees = [0, 30, 45, 60, 70, 75, 90];
      if (orientation[0] === 1 && !degrees.includes(state.orientation))
        return (
          intensity === state.intensity &&
          setTechnique([{ id: tech.id_technique, name: tech.name }])
        );
      if (orientation.length !== 1) {
        const orientationFilter = orientation.filter(
          (o: number) => o === state.orientation
        );
        return (
          orientationFilter.length !== 0 &&
          intensity === state.intensity &&
          setTechnique((prev) =>
            prev
              ? [...prev, { id: tech.id_technique, name: tech.name }]
              : [{ id: tech.id_technique, name: tech.name }]
          )
        );
      }
      return (
        orientation[0] === state.orientation &&
        intensity === state.intensity &&
        setTechnique([{ id: tech.id_technique, name: tech.name }])
      );
    });
  }, [state.orientation, state.intensity]);
  console.log({
    technique,
  });
  return (
    <>
      <Head>
        <title>Simulador - Lámpara Hendidura</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center md:p-24">
        <SimulatorCard>
          <div className="flex justify-between mx-2 md:mx-0">
            <SimulatorButton
              name="Volver"
              icon={<ReturnArrow />}
              onClick={() => router.push("/")}
            />
          </div>
          <div className="flex flex-col items-center justify-center xl:flex-row my-2 lg:gap-10 gap-5">
            <div className="flex-1 flex flex-col gap-5 items-center justify-center h-full">
              {!!technique?.length && (
                <>
                  <span className="text-2xl font-semibold">
                    {Array.isArray(technique) ? "Técnicas" : "Técnica"}:
                  </span>{" "}
                  <div className="flex gap-2 text-xl font-semibold">
                    {technique?.map((tech, index) => (
                      <div key={index}>
                        <span
                          onClick={() => console.log(tech.id)}
                          className="underline decoration-cyan-500 cursor-pointer"
                        >
                          {tech.name}
                        </span>{" "}
                        {index !== technique.length - 1 && " o "}
                      </div>
                    ))}
                  </div>
                </>
              )}
              <section className="max-h-[300px] max-w-[300px] md:max-w-[450px] md:max-h-[450px] relative overflow-hidden h-full">
                <img
                  src={
                    image.imageUrl ? image.imageUrl : String(image_condition)
                  }
                  alt="logo"
                  className="w-full h-full rounded-md object-cover relative"
                  ref={imageRef}
                />
                <div
                  id="lane"
                  className="flex items-center justify-center text-black rounded-xl max-h-[300px] max-w-[300px] md:max-w-[450px] md:max-h-[450px] h-full w-full"
                  ref={lane}
                />
              </section>
              <section className="flex flex-col items-center">
                <label className="cursor-pointer mb-3" htmlFor="upload-image">
                  <input
                    type="file"
                    accept="image/*"
                    id="upload-image"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImage({
                          imageUrl: URL.createObjectURL(e.target.files[0]),
                          imageFile: e.target.files[0] as File,
                        });
                        setIdImage(undefined);
                        setDescription("");
                      }
                    }}
                    className="hidden"
                  />
                  <Icon
                    children={<Upload />}
                    fill="#FFFFFF"
                    viewBox="16 16"
                    height={35}
                    width={35}
                  />
                </label>
              </section>
              <section
                className={`
                w-full flex flex-col items-center gap-3 ${
                  id_image || image.imageFile ? "block" : "hidden"
                } transition-all delay-150
              `}
              >
                <div>
                  <SimulatorButton
                    name={idImage ? "Actualizar" : "Subir"}
                    icon={<Save />}
                    onClick={uploadImage}
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <label className="text-sm" htmlFor="save-image">
                    Agregar Observación
                  </label>
                  <input
                    type="checkbox"
                    defaultChecked={show}
                    id="save-image"
                    onChange={() => setShow(!show)}
                  />
                </div>
                {show && (
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full max-h-24 rounded-md p-2"
                  />
                )}
              </section>
            </div>
            <div className="flex justify-center mx-2 md:ml-5 text-center my-11 rounded-2xl bg-blackprimary">
              <div className="m-12">
                <RangeComponent
                  lane={lane}
                  imageRef={imageRef}
                  state={state}
                  setState={setState}
                  type="orientation"
                  step={5}
                  max={180}
                  text="ORIENTACIÓN DE LA HENDIDURA"
                  value={state.orientation}
                />
                <RangeComponent
                  lane={lane}
                  imageRef={imageRef}
                  state={state}
                  setState={setState}
                  type="width"
                  text="ANCHURA"
                  value={state.width}
                  min={1}
                />
                <RangeComponent
                  lane={lane}
                  imageRef={imageRef}
                  state={state}
                  setState={setState}
                  type="movement"
                  text="MOVIMIENTO"
                  value={state.movement}
                  disabled={state.width === 100}
                />
                <RangeComponent
                  lane={lane}
                  imageRef={imageRef}
                  state={state}
                  setState={setState}
                  type="intensity"
                  step={25}
                  text="INTENSIDAD DE LA LUZ"
                  value={state.intensity}
                />
                <RangeComponent
                  lane={lane}
                  imageRef={imageRef}
                  state={state}
                  setState={setState}
                  type="zoom"
                  step={0.01}
                  max={5}
                  min={1}
                  text="Zoom"
                  value={state.zoom}
                />
                <div className="flex flex-col items-center">
                  <label htmlFor="color" className="text-white">
                    COLOR
                  </label>
                  <input
                    className="w-1/2 h-10 rounded-md "
                    type="color"
                    id="color"
                    name="color"
                    value={state.color}
                    onChange={(e) => {
                      setState({ ...state, color: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </SimulatorCard>
      </main>
    </>
  );
};

export default simulatorComponent;
