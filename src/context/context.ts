import { createContext } from "react";

export interface USER {
  id?: number;
  name?: string;
  email?: string;
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
