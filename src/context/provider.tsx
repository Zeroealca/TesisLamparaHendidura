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

  const getUser = (id: number) => {
    fetch(process.env.API_URL + `user/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
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
