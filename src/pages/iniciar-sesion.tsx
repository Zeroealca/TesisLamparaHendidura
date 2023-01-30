import React from "react";
import LoginComponent from "../components/auth/loginComponent";

const Login = () => {
  return <LoginComponent />;
};

export default Login;

Login.getLayout = function PageLayout(page: React.ReactNode) {
  return <>{page}</>;
};
