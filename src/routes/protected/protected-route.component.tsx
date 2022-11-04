import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProptectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProptectedRouteProps> = ({
  children,
  redirectPath = "/auth/sign-in",
}) => {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  return children ? <>children</> : <Outlet />;
};

export default ProtectedRoute;
