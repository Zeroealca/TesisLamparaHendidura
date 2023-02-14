const ProfileImage = (images: any) => (
  <>
    <h1 className="text-xl font-bold text-left mb-10">Mis imagenes</h1>
    <div className="flex flex-wrap gap-3">
      {images.lenght > 0 ? (
        images.map((image: any, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1"
          >
            <img
              src={image.url}
              alt={image.name}
              className="w-32 h-32 object-cover rounded-md"
            />
            <button className="bg-red-500 rounded-md p-2 text-white font-bold">
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

export default ProfileImage;
