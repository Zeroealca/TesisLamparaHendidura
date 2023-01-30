import React from "react";
import RegisterComponent from "../components/auth/registerComponent";

const Register = () => {
  return <RegisterComponent />;
};

export default Register;

Register.getLayout = function PageLayout(page: React.ReactNode) {
  return <>{page}</>;
};
