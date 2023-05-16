import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Iimage } from "src/pages/mi-perfil";
import { useState, useEffect, useContext } from "react";
import UserContext from "src/context/context";

const ProfileImage = ({
  images,
  setImages,
  rol,
}: {
  images: Iimage[];
  setImages: (images: Iimage[]) => void;
  rol: string | undefined;
}) => {
  const router = useRouter();
  const deleteImage = async (id: string) => {
    const res = fetch(process.env.API_URL + `img/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast
      .promise(res, {
        pending: "Eliminando imagen",
        success: "Imagen eliminada",
        error: "Error al eliminar la imagen",
      })
      .then(() => {
        setImages(images.filter((image) => image.id_image !== id));
      });
  };

  const [filter, setFilter] = useState("all");
  const [imagesFilterd, setImagesFilterd] = useState<Iimage[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setImagesFilterd(images);
  }, [images?.length]);

  const filteredImages = images.filter((image) => {
    switch (filter) {
      case "all":
        return image;
      case "revised":
        return image.isRevised;
      case "notRevised":
        return !image.isRevised;
      default:
        return image;
    }
  });

  useEffect(() => {
    setImagesFilterd(filteredImages);
  }, [filter]);

  return (
    <>
      <h1 className="text-2xl font-bold text-left mb-10">Mis imágenes</h1>

      <div className="mb-4 w-full flex items-center justify-end">
        <select
          className="ml-4 px-3 py-2"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="revised">Revisadas</option>
          <option value="notRevised">No revisadas</option>
        </select>
      </div>

      <div className="grid grid-cols-auto-fit gap-2">
        {imagesFilterd?.length ? (
          imagesFilterd.map((image, index: number) => {
            const date = new Date(image.created_at);
            const formattedDate = date.toLocaleString("es-ES", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            });
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-4 bg-blacktertiary p-3 rounded justify-between"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="h-32 w-32 object-cover rounded-md"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold">
                    Subido el:{" "}
                    <span className="font-normal text-base">
                      {formattedDate}
                    </span>
                  </span>
                  <span className="text-xl font-bold">
                    Estado:
                    <span className="font-normal text-base">
                      {image.isRevised ? "Revisado ✅" : "Pendiente ⌛"}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      router.push(
                        {
                          pathname: "/simulador",
                          query: {
                            ...image,
                            comments: JSON.stringify(image.comments),
                            isMine: "true",
                          },
                        },
                        "simulador"
                      );
                    }}
                    className="bg-green-500 rounded-md p-2 text-white font-bold w-24"
                  >
                    Usar
                  </button>
                  {rol === "DOCENTE" && (
                    <button
                      onClick={() => deleteImage(image.id_image)}
                      className="bg-red-500 rounded-md p-2 text-white font-bold w-24"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <h1>No hay imagenes</h1>
        )}
      </div>
    </>
  );
};

export default ProfileImage;
