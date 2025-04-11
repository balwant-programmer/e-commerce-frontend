import React from "react";
import { Navigate } from "react-router-dom";
import { useCheckUserAuthQuery } from "../rtkQuery/userAuthservice";

const RedirectIfLoggedIn = ({ element }) => {
  const { data, isLoading, error, isSuccess } = useCheckUserAuthQuery();

  if (data && isSuccess) {
    return <Navigate to="/profile" />;
  }

  return element;
};

export default RedirectIfLoggedIn;
