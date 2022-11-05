import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase/supabase.utils";

interface ProptectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProptectedRouteProps> = ({
  children,
  redirectPath = "/auth/sign-in",
}) => {
  const navigate = useNavigate();
  const user = supabase.auth.user();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") return navigate(redirectPath);
    });
  }, []);

  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  return children ? <>children</> : <Outlet />;
};

export default ProtectedRoute;
