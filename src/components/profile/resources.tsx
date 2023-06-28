import { getID } from "src/utils/youtube";
import Icons, { ImageIcon, VideoIcon, PasteIcon } from "../../components/icons";
import Modal from "../modal";
import React, { ReactNode } from "react";
import useResource from "./useResource";

const Resource = () => {
  const {
    data,
    isOpen,
    onSubmit,
    setData,
    setIsOpen,
    setTitle,
    title,
    user,
    resources,
    isFullscreen,
    toggleFullscreen,
    imageFull,
    deteleResource,
  } = useResource();

  return (
    <>
      <h1 className="text-2xl font-bold text-left mb-10">Recursos</h1>
      <div className="flex items-start">
        {user.rol === "DOCENTE" ? (
          <Buttons
            setTitle={setTitle}
            setData={setData}
            setIsOpen={setIsOpen}
            title={title}
          />
        ) : null}
        {resources.length === 0 ? (
          <div className="ml-4 flex items-center justify-center w-full">
            <span className="font-bold text-lg">
              No hay recursos en estos momentos
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 ml-4">
            {resources.map((item, index) => {
              const isVideo = item.url.includes("youtube");
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 flex-col bg-blacktertiary p-3 rounded h-[336px] justify-between"
                >
                  {isVideo ? (
                    <iframe
                      src={item.url}
                      title={item.name}
                      className="w-full"
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay=1; mute=1"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      {isFullscreen ? (
                        <ImageFullScreen
                          toggleFullscreen={() => {
                            toggleFullscreen("");
                          }}
                          url={imageFull}
                        />
                      ) : null}
                      <img
                        src={item.url}
                        alt={item.name}
                        className="cursor-pointer  w-64 h-64 object-cover rounded-md"
                        onClick={() => {
                          toggleFullscreen(item.url);
                        }}
                      />
                    </>
                  )}
                  {user.rol === "DOCENTE" && (
                    <button
                      className="bg-red-500 rounded-md p-2 text-white font-bold w-24"
                      onClick={() => {
                        deteleResource(item.id_image, isVideo);
                      }}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isOpen ? (
        <Modal
          title={title}
          isOpen={isOpen}
          value={data}
          setIsOpen={setIsOpen}
          onSubmit={onSubmit}
          children={
            <Input
              id={title === "video" ? "text" : "image"}
              title={title === "video" ? "URL del video" : "Imagen"}
              type={title === "video" ? "text" : "file"}
              data={data}
              setData={setData}
            />
          }
        />
      ) : null}
    </>
  );
};

const ImageFullScreen = ({
  url,
  toggleFullscreen,
}: {
  url: string;
  toggleFullscreen: () => void;
}) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <img
        src={url}
        alt="img"
        className={`cursor-pointer absolute top-0 left-0 w-screen h-screen object-contain`}
        onClick={toggleFullscreen}
      />
    </>
  );
};

interface II {
  title: string;
  type: "text" | "file";
  id: string;
  data?: File | string;
  setData: (value?: File | string) => void;
}

interface IButtons {
  title: string;
  setIsOpen: (value: boolean) => void;
  setData: (value?: File | string) => void;
  setTitle: (value: string) => void;
}

interface IButton {
  Icon?: ReactNode;
  onClick?: () => void;
}

const Buttons = (props: IButtons) => {
  return (
    <div className="flex justify-center gap-4 flex-col">
      <Button
        onClick={() => {
          props.setTitle("video");
          props.setIsOpen(true);
          props.setData(undefined);
        }}
        Icon={<VideoIcon />}
      />
      <Button
        onClick={() => {
          props.setTitle("imagen");
          props.setIsOpen(true);
          props.setData(undefined);
        }}
        Icon={<ImageIcon />}
      />
    </div>
  );
};

const Button = (props: IButton) => {
  return (
    <button
      className="px-5 py-3 bg-gray-500 rounded-md flex items-center gap-3 self-start hover:bg-gray-600"
      onClick={props.onClick}
    >
      <span className="font-bold">Agregar</span>
      <Icons
        fill="#fff"
        width={25}
        height={25}
        viewBox="16 16"
        children={props.Icon}
      />
    </button>
  );
};

const Input = (props: II) => {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      props.setData(text);
    } catch (error) {
      console.error("Error al leer el portapapeles:", error);
      props.setData(undefined);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <label htmlFor={props.id} className="text-white">
        {props.title}
      </label>
      <div className="flex w-full items-center justify-center gap-2">
        <input
          type={props.type}
          id={props.id}
          value={props.type === "text" ? (props.data as string) : undefined}
          className="px-4 py-2 rounded-md bg-gray-500 w-full"
          accept={
            props.type === "file"
              ? "image/png, image/jpeg, image/jpg"
              : undefined
          }
          placeholder="https://www.youtube.com/watch?v=..."
          onChange={(e) => {
            if (props.type === "file")
              props.setData(e.target.files?.[0] ?? undefined);
            if (props.type === "text") props.setData(e.target.value);
          }}
        />
        {props.type === "text" ? (
          <button onClick={handlePaste}>
            <Icons
              children={<PasteIcon />}
              viewBox="16 16"
              fill="#fff"
              height={25}
              width={25}
            />
          </button>
        ) : null}
      </div>
      {props.type === "file" && !!props.data ? (
        <img
          src={URL.createObjectURL((props.data as File) ?? "")}
          alt="img"
          className="w-full"
        />
      ) : null}
      {props.type === "text" && !!props.data ? (
        <iframe
          src={`https://www.youtube.com/embed/${getID(props.data as string)}`}
          title="video"
          className="w-full"
        />
      ) : null}
    </div>
  );
};

export default Resource;
