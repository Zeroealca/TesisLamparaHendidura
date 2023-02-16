const ProfileImage = ({
  images,
}: {
  images: Array<{ id_image: string; name: string; url: string }>;
}) => {
  const deleteImage = async (id: string) => {
    await fetch(process.env.API_URL + `img/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      <h1 className="text-xl font-bold text-left mb-10">Mis imagenes</h1>
      <div className="flex flex-wrap gap-10 justify-center">
        {images.length > 0 ? (
          images.map((image, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-1"
            >
              <div className="w-56 h-56">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-fill rounded-md"
                />
              </div>
              <button
                onClick={() => deleteImage(image.id_image)}
                className="bg-red-500 rounded-md p-2 text-white font-bold"
              >
                Eliminar
              </button>
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
