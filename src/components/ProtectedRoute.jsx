import { Navigate } from "react-router-dom";
import { useCheckUserAuthQuery } from "../rtkQuery/userAuthservice";

const ProtectedRoute = ({ element }) => {
  const { data, isLoading, error, isSuccess } = useCheckUserAuthQuery();

  if (data && isSuccess) {
    return element;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
