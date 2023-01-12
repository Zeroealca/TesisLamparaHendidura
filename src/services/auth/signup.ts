export const SIGNUP = async (props: {
  email: string;
  password: string;
  name: string;
}) => {
  const res = await fetch(`${process.env.API_URL}auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });

  return res;
};
