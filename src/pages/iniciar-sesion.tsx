import React from "react";
import LoginComponent from "../components/auth/loginComponent";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const Login = () => {
  return <LoginComponent />;
};

export default Login;

Login.getLayout = function PageLayout(page: React.ReactNode) {
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
