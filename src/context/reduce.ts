import { USER, IMAGE } from "./context";

export type userReducerProps = { type: "SET_USER"; payload: USER };

export default (state: USER, action: userReducerProps) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
