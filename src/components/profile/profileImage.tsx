import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Iimage } from "src/pages/mi-perfil";

const ProfileImage = ({
  images,
  setImages,
}: {
  images: Iimage[];
  setImages: (images: Iimage[]) => void;
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
  return (
    <>
      <h1 className="text-xl font-bold text-left mb-10">Mis imagenes</h1>
      <div className="grid grid-cols-auto-fit gap-10">
        {images?.length > 0 ? (
          images.map((image, index: number) => (
            <div key={index} className="flex flex-col gap-1 max-w-md">
              <div className="h-72 w-full">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    router.push(
                      {
                        pathname: "/simulador",
                        query: {
                          ...image,
                        },
                      },
                      "simulador"
                    )
                  }
                  className="bg-green-500 rounded-md p-2 text-white font-bold w-24"
                >
                  Usar
                </button>
                <button
                  onClick={() => deleteImage(image.id_image)}
                  className="bg-red-500 rounded-md p-2 text-white font-bold w-24"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1>No hay imagenes</h1>
        )}
      </div>
    </>
  );
};

export default ProfileImage;
