import { useGetAllInformation } from "../../services/information/custom-hooks";
import InformationMenu from "../../components/information/InformationMenu";
import { useEffect } from "react";
const Informacion = () => {
  const { data } = useGetAllInformation();
  console.log(data);
  return (
    <main className="flex items-center justify-center">
      <div className="w-9/12 h-full mt-28 p-5 grid grid-cols-auto-fit gap-10 mb-10">
        {data?.map((item) => (
          <InformationMenu
            key={item.id_disease}
            id_disease={item.id_disease}
            name={item.name}
          />
        ))}
      </div>
    </main>
  );
};
export default Informacion;
