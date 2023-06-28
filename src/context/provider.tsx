import { useReducer, useEffect } from "react";
import UserReduce from "./reduce";
import { initialState } from "./inititalState";
import UserContext from "./context";
import { useSession } from "next-auth/react";
import { USER } from "./context";

const UserProvider = (props: any) => {
  const [state, dispatch] = useReducer(UserReduce, initialState);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      getUser(session?.user?.id);
    }
  }, [session]);

  const getUser = async (id: number) => {
    const res = await fetch(process.env.API_URL + `user/${id}`, {
      method: "GET",
    });
    if (res.status === 200) {
      const data = await res.json();
      setUser(data);
    }
  };

  const setUser = (user: USER) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  return (
    <UserContext.Provider
      value={{
        user: state,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
