import React from "react";
import RegisterComponent from "../components/auth/registerComponent";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const Register = () => {
  return <RegisterComponent />;
};

export default Register;

Register.getLayout = function PageLayout(page: React.ReactNode) {
  return <>{page}</>;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { p = "/" } = query;
  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
