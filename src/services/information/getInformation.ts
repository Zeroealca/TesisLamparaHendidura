export const GETALLINFORMATION = async () => {
  const res = await fetch(`${process.env.API_URL}information`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const GETINFORMATION = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}information/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
