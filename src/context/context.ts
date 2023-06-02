import { createContext } from "react";

export interface USER {
  id?: number;
  name?: string;
  email?: string;
  rol?: string;
  parallel_name?: string;
  parallel_id?: number;
}

export interface IMAGE {
  id_image: string;
  url: string;
  name: string;
}

export type userContextType = {
  user: USER;
  setUser: (user: USER) => void;
};

const UserContext = createContext<userContextType>({} as userContextType);

export default UserContext;
