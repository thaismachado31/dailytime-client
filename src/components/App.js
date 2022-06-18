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
<<<<<<< HEAD
=======
import TaskDelete from "../pages/TaskDelete";
import NavBar from "./NavBar";
>>>>>>> ffbf4e6361185f1833c0a55c725d570100ddd41a

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <AuthContextComponent>
      <Routes>
        {/* <Route path="/" element={<ProtectedRoute component={Home} />} /> */}
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/userprofile/:_id"
          element={<ProtectedRoute component={UserProfile} />}
        />
        <Route
          path="/home"
          element={<ProtectedRoute component={SecondHome} />}
        />
        <Route path="/create" element={<ProtectedRoute component={Create} />} />
        <Route
          path="/event/:_id"
          element={<ProtectedRoute component={EventDetail} />}
        />
        <Route
          path="/task/:_id"
          element={<ProtectedRoute component={TaskDetail} />}
        />
        <Route
          path="/taskdelete/:_id/"
          element={<ProtectedRoute component={TaskDelete} />}
        />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;
