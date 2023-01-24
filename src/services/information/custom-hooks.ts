import { GETALLINFORMATION } from "./getInformation";
import { useEffect, useState } from "react";
import { InformationMenuProps } from "src/components/information/InformationMenu";
export const useGetAllInformation = () => {
    const [data, setData] = useState<InformationMenuProps[]>([]);
    useEffect(() => {
        const res = GETALLINFORMATION();
        res.then((res) => res.json()).then((res) => setData(res.data));
    }, []);
    return {
        data,
    };

}
