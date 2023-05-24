import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import userContext from "src/context/context";
import { getID } from "src/utils/youtube";

interface IResource {
  id_image: string;
  name: string;
  url: string;
  externalId: string;
}

const useResource = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState<File | string>();
  const { user } = useContext(userContext);
  const [resources, setResources] = useState<IResource[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageFull, setImageFull] = useState("");

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, []);

  useEffect(() => {
    const getResources = async () => {
      const res = await fetch(process.env.API_URL + "resources");
      const data = await res.json();
      if (data.data) {
        setResources(data.data);
      }
    };
    getResources();
  }, []);

  const toggleFullscreen = (image: string) => {
    setIsFullscreen(!isFullscreen);
    setImageFull(image);
  };

  const deteleResource = async (id: string, isVideo: boolean) => {
    const res = fetch(process.env.API_URL + `resources/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isVideo, id }),
    });
    toast
      .promise(res, {
        pending: "Eliminando recurso",
        success: "Recurso eliminado",
        error: "Error al eliminar el recurso",
      })
      .then((response) => {
        new Promise((resolve, reject) => {
          resolve(response.json());
        }).then((data: any) => {
          if (data.data) {
            const restResources = resources.filter(
              (resource) => resource.id_image !== id
            );
            setResources(restResources);
          }
        });
      });
  };

  const onSubmit = async () => {
    const fd = new FormData();

    if (title === "video") {
      fd.append("video", getID(data as string));
    }
    if (title === "imagen") {
      fd.append("file", data as File);
    }

    const res = fetch(process.env.API_URL + "resources", {
      method: "POST",
      body: fd,
    });

    toast
      .promise(res, {
        pending: "Subiendo recurso",
        success: "Recurso subido",
        error: "Error al subir el recurso",
      })
      .then((response) => {
        new Promise((resolve, reject) => {
          resolve(response.json());
        }).then((data: any) => {
          if (data.data) {
            setResources(data.data);
            setIsOpen(false);
            setData(undefined);
          }
        });
      });
  };

  return {
    isOpen,
    setIsOpen,
    title,
    setTitle,
    data,
    setData,
    onSubmit,
    user,
    resources,
    isFullscreen,
    setIsFullscreen,
    toggleFullscreen,
    imageFull,
    setImageFull,
    deteleResource,
  };
};

export default useResource;
