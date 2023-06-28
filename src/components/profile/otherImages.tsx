import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Iimage } from "src/pages/mi-perfil";
import { useState, useEffect, useContext } from "react";
import UserContext from "src/context/context";

const OtherImage = ({
  images,
  setImages,
  rol,
  setParallel,
  parallel,
}: {
  images: Iimage[];
  setImages: (images: Iimage[]) => void;
  rol: string | undefined;
  setParallel: (id: string) => void;
  parallel: string;
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

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [imagesFilterd, setImagesFilterd] = useState<Iimage[]>([]);
  const { user } = useContext(UserContext);

  console.log({ user });

  useEffect(() => {
    setImagesFilterd(images);
  }, [images]);

  const filteredImages = images?.filter((image) => {
    switch (filter) {
      case "all":
        return image.name_user.toLowerCase().includes(search.toLowerCase());
      case "revised":
        return (
          image.name_user.toLowerCase().includes(search.toLowerCase()) &&
          image.isRevised
        );
      case "notRevised":
        return (
          image.name_user.toLowerCase().includes(search.toLowerCase()) &&
          !image.isRevised
        );
      default:
        return image.name_user.toLowerCase().includes(search.toLowerCase());
    }
  });

  useEffect(() => {
    setImagesFilterd(filteredImages);
  }, [filter, search]);

  return (
    <>
      <div className="flex items-center gap-5 mb-10">
        <h1 className="text-2xl font-bold text-left">Imágenes del</h1>
        {rol === "ESTUDIANTE" ? (
          <span className="text-2xl font-bold text-left">
            {
              user?.parallel_user?.find((p) => {
                return p.parallel_id.toString() == parallel;
              })?.parallel_name
            }
          </span>
        ) : (
          <select
            onChange={(e) => {
              setParallel(e.target.value);
            }}
          >
            <option value=""></option>
            {user.parallel_user?.map((parallel) => {
              return (
                <option value={parallel.parallel_id}>
                  {parallel.parallel_name}
                </option>
              );
            })}
          </select>
        )}
      </div>

      <div className="mb-4 w-full flex items-center justify-end">
        <input
          placeholder="Busca por nombre"
          className="px-4 py-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
                    Subido por:{" "}
                    <span className="font-normal text-base">
                      {image.name_user}
                    </span>
                  </span>
                  <span className="text-xl font-bold">
                    Estado:{" "}
                    <span className="font-normal text-base">
                      {image.isRevised ? "Revisado ✅" : "Pendiente ⌛"}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      const user_id = image.externalId.split("_")[1];
                      router.push(
                        {
                          pathname: "/simulador",
                          query: {
                            ...image,
                            comments: JSON.stringify(image.comments),
                            isMine: `${Number(user_id) === user?.id}`,
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

export default OtherImage;
