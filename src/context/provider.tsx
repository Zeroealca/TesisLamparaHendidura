import { useReducer, useEffect } from "react";
import UserReduce from "./reduce";
import { initialState } from "./inititalState";
import UserContext from "./context";
import { useSession } from "next-auth/react";

const UserProvider = (props: any) => {
  const [state, dispatch] = useReducer(UserReduce, initialState);
  const { data: session } = useSession();

  useEffect(() => {
    dispatch({
      type: "SET_USER",
      payload: {
        id: session?.user?.id,
        name: session?.user?.name,
        email: session?.user?.email,
      },
    });
  }, [session]);

  return (
    <UserContext.Provider
      value={{
        user: state,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
