import Cookies from "universal-cookie";

const cookie = new Cookies();

export const setCookie = (key: string, value: any, expires?: Date) => {
  cookie.set(
    key,
    { ...value },
    {
      path: "/",
      expires,
    }
  );
};

export const getCookie = (key: string) => {
  return cookie.get(key);
};

export const deleteCookie = (key: string) => {
  cookie.remove(key, { path: "/" });
};
