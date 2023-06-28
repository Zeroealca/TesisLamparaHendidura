import { createContext } from "react";

export interface USER {
  id?: string;
  name?: string;
  email?: string;
  rol?: string;
  parallel_user?: PARALLEL_USER[];
  parallel?: PARALLEL;
}

export interface PARALLEL_USER {
  id: number;
  id_parallel: number;
  id_user: number;
  parallel: PARALLEL;
}

export interface PARALLEL {
  id: number;
  name: string;
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
