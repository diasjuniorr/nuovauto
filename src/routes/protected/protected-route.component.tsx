import { Navigate, Outlet } from "react-router-dom";
import supabase from "../../utils/supabase/supabase.utils";

interface ProptectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProptectedRouteProps> = ({
  children,
  redirectPath = "/auth/sign-in",
}) => {
  const user = supabase.auth.user();

  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  return children ? <>children</> : <Outlet />;
};

export default ProtectedRoute;
