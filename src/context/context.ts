import { createContext } from "react";

export interface USER {
  id?: number;
  name?: string;
  email?: string;
  images: IMAGE[];
}

export interface IMAGE {
  url: string;
  name: string;
}

export type userContextType = {
  user: USER;
};

const UserContext = createContext<userContextType>({} as userContextType);

export default UserContext;
