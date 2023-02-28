import { useGetAllInformation } from "../../services/information/custom-hooks";
import InformationMenu from "../../components/information/InformationMenu";

const Informacion = () => {
  const { dataFilter, setFilter } = useGetAllInformation();

  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-5 text-white">
        Todas las enfermedades
      </h1>

      <div className="flex items-center justify-center">
        <input
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          className="py-2 px-5 rounded-lg max-w-md w-full"
          placeholder="Buscar enfermedad"
        />
      </div>

      <div className="flex items-center justify-center">
        <div
          className={`h-full p-5 grid grid-cols-auto-fit gap-10 mb-10 ${
            dataFilter?.length === 1 ? "w-1/4" : "w-9/12"
          }`}
        >
          {dataFilter?.map((item) => (
            <InformationMenu
              key={item.id_disease}
              id_disease={item.id_disease}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
export default Informacion;
