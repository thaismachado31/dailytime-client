import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import mainTheme from "../styles/mainTheme";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import UserProfile from "../pages/UserProfile";
import Create from "../pages/Create";
import SecondHome from "../pages/SecondHome";
import EventDetail from "../pages/EventDetail";
import TaskDetail from "../pages/TaskDetail";
import UpdateTask from "../pages/UpdateTask";
import UpdateEvent from "../pages/UpdateEvent";
import TaskDelete from "../pages/TaskDelete";
import EventDelete from "../pages/EventDelete";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  const theme = createTheme(mainTheme);

  return (
    <ThemeProvider theme={theme}>
      <AuthContextComponent>
        <Routes>
          {/* <Route path="/" elemen={<ProtectedRoute component={Home} />} /> */}
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
          <Route
            path="/create"
            element={<ProtectedRoute component={Create} />}
          />
          <Route
            path="/event/:_id"
            element={<ProtectedRoute component={EventDetail} />}
          />
          <Route
            path="/eventdelete/:_id"
            element={<ProtectedRoute component={EventDelete} />}
          />
          <Route
            path="/task/:_id"
            element={<ProtectedRoute component={TaskDetail} />}
          />
          <Route
            path="/taskdelete/:_id"
            element={<ProtectedRoute component={TaskDelete} />}
          />
          <Route
            path="/updatetask/:_id"
            element={<ProtectedRoute component={UpdateTask} />}
          />
          <Route
            path="/updateevent/:_id"
            element={<ProtectedRoute component={UpdateEvent} />}
          />
        </Routes>
      </AuthContextComponent>
    </ThemeProvider>
  );
}

export default App;
