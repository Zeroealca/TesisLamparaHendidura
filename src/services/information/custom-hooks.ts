import { GETALLINFORMATION } from "./getInformation";
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
