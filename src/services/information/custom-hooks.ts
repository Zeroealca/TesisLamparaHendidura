import { GETALLINFORMATION, GETINFORMATION } from "./getInformation";
import { useEffect, useState } from "react";
import { InformationMenuProps } from "src/components/information/InformationMenu";
export const useGetAllInformation = () => {
  const [data, setData] = useState<InformationMenuProps[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [dataFilter, setDataFilter] = useState<InformationMenuProps[]>([]);

  useEffect(() => {
    const res = GETALLINFORMATION();
    res.then((res) => res.json()).then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    if (filter === "") {
      setDataFilter(data);
    } else {
      const dataFilter = data.filter((item) => {
        return item.name.toLowerCase().includes(filter.toLowerCase());
      });
      setDataFilter(dataFilter);
    }
  }, [filter, data]);

  return {
    data,
    dataFilter,
    setFilter,
  };
};

export interface INFORMATION {
  image: { name: string; url: string };
  Enfermedad: string;
  Tratamiento?: string[];
  Síntoma?: string[];
  Diagnostico?: string[];
  Sintomas_tempranos?: string[];
  Sintomas_avanzados?: string[];
}

export const useGetInformation = (id: string) => {
  const [data, setData] = useState<INFORMATION>();
  useEffect(() => {
    const res = GETINFORMATION(id);
    res.then((res) => res.json()).then((res) => setData(res.data));
  }, [id]);
  return {
    data,
  };
};
