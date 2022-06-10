import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import api from "../apis/api";

function TaskDetail() {
  const [task, setTask] = useState({
    name: "",
    description: "",
    icon: "",
    color: "",
    dateTime: "",
    duration: "",
    reminder: "",
    timeReminder: "",
  });

  const { _id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/task/${_id}`)
      .then((response) => {
        console.log(response);
        setTask({ ...response.data });
        console.log(task);
      })
      .catch((err) => console.error(err));
  }, [_id]);

  return (
    <div>
      teste
      {task.name}
    </div>
  );
}

export default TaskDetail;
