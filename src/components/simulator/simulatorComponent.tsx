import React, { useRef, useState } from "react";
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

const simulatorComponent = () => {
  const { data } = useSession();
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
  return (
    <>
      <Head>
        <title>Simulador - Lámpara Hendidura</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center p-24">
        <SimulatorCard>
          <div className="flex justify-between">
            <SimulatorButton
              name="Volver"
              icon={<ReturnArrow />}
              onClick={() => router.push("/")}
            />
          </div>
          <div className="flex flex-col items-center justify-center lg:flex-row my-2 lg:gap-10 gap-5">
            <div className="flex-1 flex flex-col gap-5 items-center justify-center h-full">
              <section className="max-w-[450px] max-h-[450px] relative overflow-hidden h-full">
                <img
                  src={
                    image.imageUrl ? image.imageUrl : String(image_condition)
                  }
                  alt="logo"
                  className="w-full h-full rounded-md"
                  ref={imageRef}
                />
                <div
                  id="lane"
                  className="flex items-center justify-center text-black rounded-xl max-w-[450px] max-h-[450px] h-full w-full"
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
                    name=""
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
            <div className="flex justify-center ml-5 text-center my-11 rounded-2xl bg-blackprimary">
              <div className="m-12">
                <RangeComponent
                  lane={lane}
                  imageRef={imageRef}
                  state={state}
                  setState={setState}
                  type="orientation"
                  step={90}
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
