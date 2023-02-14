import React from "react";
import RecoveryComponent from "../../components/auth/changeLostPasswordComponent";

const Recovery = () => {
  return <RecoveryComponent />;
};

export default Recovery;

Recovery.getLayout = function PageLayout(page: React.ReactNode) {
  return <>{page}</>;
};
