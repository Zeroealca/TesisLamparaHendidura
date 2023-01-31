import { USER, IMAGE } from "./context";

export type userReducerProps =
  | { type: "SET_USER"; payload: USER }
  | { type: "SET_IMAGES"; payload: IMAGE[] }
  | { type: "SET_IMAGE"; payload: IMAGE };

export default (state: USER, action: userReducerProps) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload,
      };
    case "SET_IMAGE":
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    default:
      return state;
  }
};
