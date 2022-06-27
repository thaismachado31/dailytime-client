import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import { AuthContext } from "../../contexts/authContext";
import WorkerBuilder from "../../assets/workers/workerBuilder";
import workerNotification from "../../assets/workers/worker-notification";
import api from "../../apis/api";
import Alert from "@mui/material/Alert";

const instance = new WorkerBuilder(workerNotification);

function ProtectedRoute({ component: Component }) {
  const location = useLocation();
  const { loggedInUser, loading } = useContext(AuthContext);
  const [alerts, setAlerts] = useState();

  instance.onmessage = (message) => {
    if (message) {
      setAlerts(JSON.parse(message.data));
    }
  };

  useEffect(() => {
    (async function getTask() {
      try {
        const mytasks = await api.get(`/taskbydate/${new Date()}`);

        const workerTasks = mytasks?.data?.map((task) => {
          return {
            _id: task._id,
            userId: task.userId,
            dateTime: task.dateTime,
            timeReminder: task.timeReminder,
            notified: false,
          };
        });
        instance.postMessage(JSON.stringify(workerTasks));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loggedInUser.user._id) {
    return (
      <div>
        {alerts && (
          <Alert onClose={() => setAlerts("")} severity="success">
            Voce tem um tarefa que começa em {alerts.timeReminder} minutos ou
            menos
          </Alert>
        )}
        <Component />
        <NavBar />
      </div>
    );
  } else {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
}

export default ProtectedRoute;
