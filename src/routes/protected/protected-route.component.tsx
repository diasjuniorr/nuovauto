import { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user/user.context";

interface ProptectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProptectedRouteProps> = ({
  children,
  redirectPath = "/auth/sign-in",
}) => {
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  return children ? <>children</> : <Outlet />;
};

export default ProtectedRoute;
