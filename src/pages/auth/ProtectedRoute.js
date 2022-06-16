import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";

import { AuthContext } from "../../contexts/authContext";

function ProtectedRoute({ component: Component }) {
  const location = useLocation();
  const { loggedInUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loggedInUser.user._id) {
    return (
      <div>
        <Component />
        <NavBar />
      </div>
    );
  } else {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
}

export default ProtectedRoute;
