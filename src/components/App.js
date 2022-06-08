import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import UserProfile from "../pages/UserProfile";
import Create from "../pages/Create";
import SecondHome from "../pages/SecondHome";
import EventDetail from "../pages/UserProfile";
import TaskDetail from "../pages/TaskDetail";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <AuthContextComponent>
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/userprofile"
          element={<ProtectedRoute component={UserProfile} />}
        />
        <Route
          path="/secondhome"
          element={<ProtectedRoute component={SecondHome} />}
        />
        <Route path="/create" element={<ProtectedRoute component={Create} />} />
        <Route
          path="/eventDetail"
          element={<ProtectedRoute component={EventDetail} />}
        />
        <Route
          path="/taskDetail"
          element={<ProtectedRoute component={TaskDetail} />}
        />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;
