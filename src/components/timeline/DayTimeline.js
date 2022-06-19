import React from "react";
import { useState, useEffect } from "react";
import api from "../../apis/api";

import { startOfDay } from "date-fns";

import {} from "@mui/lab";

import TasksList from "./TasksList";

function DayTimeline(props) {
  const [tasks, setTasks] = useState([]);
  const { date } = props;

  async function getTask() {
    try {
      const mytasks = await api.get(
        `/timeline/${date || startOfDay(new Date())}`
      );
      setTasks(mytasks.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTask();
  }, [date]);

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div>
      <TasksList all={tasks} />
    </div>
  );
}

export default DayTimeline;
