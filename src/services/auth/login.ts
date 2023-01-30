import { signIn, SignInResponse } from "next-auth/react";

export const LOGIN = async (props: { email: string; password: string }) => {
  const res = (await signIn("credentials", {
    redirect: false,
    callbackUrl: "/",
    email: props.email,
    password: props.password,
  })) as SignInResponse;
  return res;
};
