export const LOGIN = async (props: { email: string; password: string }) => {
  const res = await fetch(`${process.env.API_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });

  return res;
};
