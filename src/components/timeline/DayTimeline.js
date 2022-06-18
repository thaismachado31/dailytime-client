import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../apis/api";

import { format, startOfDay } from "date-fns";

import EachTask from "./eachTask";
import { Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";

import TasksList from "./TasksList";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

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
