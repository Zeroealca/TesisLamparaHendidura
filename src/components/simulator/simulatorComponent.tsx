import React, { useRef, useState, useEffect, Fragment } from "react";
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
import { Iimage } from "src/pages/mi-perfil";
import { Tab } from "@headlessui/react";

interface Comments {
  id: number;
  comment: string;
  id_user: number;
  name: string;
  created_at: Date;
}

export interface state_ {
  orientation: number;
  width: number;
  movement: number;
  intensity: number;
  zoom: number;
  color: string;
}

const simulatorComponent = () => {
  const { data } = useSession();
  const { techniques } = useGetAllTechnique();
  const router = useRouter();
  const lane = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const {
    id_image,
    url,
    details,
    state: state_,
    comments,
  } = router.query as {
    id_image?: string;
    url: string;
    details?: string;
    state?: string;
    comments: string;
  };
  const [show, setShow] = useState(!!details);
  const [idImage, setIdImage] = useState(id_image);
  const [description, setDescription] = useState<string>(
    details ? String(details) : ""
  );
  const [comment, setComment] = useState<Comments[]>(
    comments ? JSON.parse(comments) : []
  );
  const [newComment, setNewComment] = useState<string>("");
  const [categories] = useState({
    Simulador: 1,
    Observaciones: 2,
  });
  const [technique, setTechnique] = useState<object[]>();
  const destructuringState: state_ = state_ ? JSON.parse(state_) : undefined;
  const [state, setState] = useState({
    orientation: destructuringState ? destructuringState.orientation : 0,
    width: destructuringState ? destructuringState.width : 1,
    movement: destructuringState ? destructuringState.movement : 50,
    intensity: destructuringState ? destructuringState.intensity : 25,
    zoom: destructuringState ? destructuringState.zoom : 1,
    color: destructuringState ? destructuringState.color : "#ffffff",
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
    state && fd.append("state", JSON.stringify(state));
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

  const uploadComment = () => {
    const res = fetch(process.env.API_URL + "comment", {
      method: "POST",
      body: JSON.stringify({
        id_image,
        comment: newComment,
        id_user: data?.user?.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.promise(res, {
      pending: "Subiendo comentario",
      success: "Comentario subido",
      error: "Error al subir el comentario",
    });
    setComment((prev: any) => {
      return prev
        ? [
            ...prev,
            {
              id: prev.length,
              comment: newComment,
              id_user: data?.user?.id,
              name: "Tú",
              created_at: new Date(),
            },
          ]
        : [
            {
              id: 0,
              comment: newComment,
              id_user: data?.user?.id,
              name: "Tú",
              created_at: new Date(),
            },
          ];
    });
    setNewComment("");
  };

  const redirectTecnica = async (id: number) => {
    window.open(`/tecnica?id=${id}`, "_blank");
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
  }, [state.orientation, state.intensity, techniques]);

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
                <div>
                  <span className="text-2xl font-semibold">
                    {Array.isArray(technique) ? "Técnicas" : "Técnica"}:
                  </span>{" "}
                  <div className="flex gap-2 text-xl font-semibold">
                    {technique?.map((tech: any, index) => (
                      <div key={index}>
                        <span
                          onClick={() => redirectTecnica(tech.id)}
                          className="underline decoration-cyan-500 cursor-pointer"
                        >
                          {tech.name}
                        </span>{" "}
                        {index !== technique.length - 1 && " o "}
                      </div>
                    ))}
                  </div>
                </div>
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
                <div className="cursor-pointer mb-3">
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
                </div>
              </section>
              <section
                className={`
                w-full flex flex-col items-center gap-3 ${
                  id_image || image.imageFile ? "block" : "hidden"
                } transition-all delay-150
              `}
              >
                <SimulatorButton
                  name={idImage ? "Actualizar" : "Subir"}
                  icon={<Save />}
                  onClick={uploadImage}
                />
                {/*  <div>
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
                )} */}
              </section>
            </div>
            <div className="flex justify-center mx-2 md:ml-5 text-center my-11 rounded-2xl bg-blackprimary w-[30rem] h-[45rem]">
              <div className=" w-full px-2 py-8 pb-12 sm:px-0">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {Object.keys(categories).map((category) => (
                      <Tab as={Fragment} key={category}>
                        {({ selected }) => (
                          <button
                            className={`w-full rounded-lg py-2.5 text-sm leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ${
                              selected
                                ? "bg-gray-100 shadow font-bold"
                                : "text-blue-100 hover:bg-white/[0.12] hover:text-white font-medium"
                            }`}
                          >
                            {category}
                          </button>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="h-full">
                    <Tab.Panel>
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
                    </Tab.Panel>
                    <Tab.Panel className="flex flex-col h-full">
                      <div className="my-12 flex-1 overflow-y-auto">
                        {comment.length > 0 ? (
                          <div className="flex flex-col gap-3">
                            {comment.map((c) => (
                              <div
                                key={c.id}
                                className={`w-full ${
                                  c.id_user == data?.user.id
                                    ? ""
                                    : "justify-end flex"
                                }`}
                              >
                                <div
                                  className={`flex flex-col gap-3 w-[75%] ${
                                    c.id_user == data?.user.id
                                      ? "bg-green-900/20 text-left rounded-r-lg"
                                      : "bg-blue-900/20 text-right rounded-l-md"
                                  } p-3`}
                                >
                                  {c.id_user == data?.user.id ? (
                                    <div className="flex justify-between gap-3">
                                      <p className="text-grayprimary font-bold">
                                        {c.id_user == data?.user.id
                                          ? "Tú"
                                          : c.name}
                                      </p>
                                      <p className="text-grayprimary font-bold">
                                        {new Date(
                                          c.created_at
                                        ).toLocaleDateString()}
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="flex justify-between gap-3">
                                      <p className="text-grayprimary font-bold">
                                        {new Date(
                                          c.created_at
                                        ).toLocaleDateString()}
                                      </p>
                                      <p className="text-grayprimary font-bold">
                                        {c.id_user == data?.user.id
                                          ? "Tú"
                                          : c.name}
                                      </p>
                                    </div>
                                  )}
                                  <p className="text-white text-sm">
                                    {c.comment}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-white text-2xl font-bold">
                              No hay observaciones
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col gap-3 w-full p-3">
                          <input
                            type="text"
                            placeholder="Escribe una observación"
                            className="w-full h-10 rounded-md px-2"
                            onChange={(e) => setNewComment(e.target.value)}
                            value={newComment}
                          />
                          <button
                            onClick={uploadComment}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Agregar observación
                          </button>
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </SimulatorCard>
      </main>
    </>
  );
};

export default simulatorComponent;
