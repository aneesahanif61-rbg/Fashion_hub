import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/react";
import Loader from "./Loader";

// Only signed-in users can see the pages inside this route
const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // Clerk is still checking the login
  if (!isLoaded) return <Loader />;

  // Not signed in: go to the sign in page
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
};

export default ProtectedRoute;


//ye karo //