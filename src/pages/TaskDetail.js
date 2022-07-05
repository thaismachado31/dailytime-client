import * as React from "react";
import { Button, Stack } from "@mui/material";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import EqualDetails from "../components/EqualDetails";

import { AuthContext } from "../contexts/authContext";

import api from "../apis/api";

function TaskDetail() {
  const [task, setTask] = useState({
    userId: "",
    category: "",
    name: "",
    description: "",
    color: "",
    dateTime: "",
    duration: 0,
    reminder: "",
    timeReminder: 0,
    address: "",
  });

  const { _id } = useParams();
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function taskDetails() {
      try {
        const response = await api.get(`/task/${_id}`);
        setTask({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    taskDetails();
  }, [_id]);

  function isOwner() {
    return task.userId === loggedInUser.user._id;
  }

  return (
    <div>
      {isOwner() && (
        <div>
          <EqualDetails
            key={task._id}
            name={task.name}
            description={task.description}
            dateTime={task.dateTime}
            duration={task.duration}
            timeReminder={task.timeReminder}
            category={task.category}
          />

          <Stack justifyContent="center" direction="row" spacing={2} mt={3}>
            <Button
              sx={{
                width: "10rem",
                height: "2.7rem",
                borderRadius: "100px",
                backgroundColor: "#32747F",
                padding: "10px",
                textTransform: "unset",
              }}
              variant="contained"
              href={`/updatetask/${_id}`}
            >
              Editar
            </Button>
            <Button
              sx={{
                width: "10rem",
                height: "2.7rem",
                borderRadius: "100px",
                padding: "10px",
                textTransform: "unset",
              }}
              variant="contained"
              href={`/taskdelete/${_id}`}
              color="error"
            >
              Deletar
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
}

export default TaskDetail;
