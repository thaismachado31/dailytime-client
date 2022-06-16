import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../apis/api";

import { format } from "date-fns";

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

function DayTimeline() {
  const [tasks, setTasks] = useState([]);

  async function getTask() {
    try {
      const mytasks = await api.get(`/taskbydate/${"2022-06-14"}`);
      setTasks(mytasks.data);
    } catch (error) {
      console.error(error);
    }
  }

  // const dateAjust = format(tasks[0].dateTime, "dd-MM-yyyy");

  // function dataFormat() {
  //   const dateAjust = format(tasks[0].datetime, "dd-MM-yyyy'T'HH:mm")
  //   const dateString = newDate.toISOString();
  //   const timeString = datetime.toISOString();
  //   const lastDate = dateString.split("T")[0] + "T" + timeString.split("T")[1];
  //   const finalDate = parseISO(lastDate);
  //   console.log(finalDate);
  //   setState({ ...state, date: finalDate });
  // }

  useEffect(() => {
    getTask();
  }, []);

  console.log(tasks);
  return (
    <div
      style={{
        backgroundColor: "#EDE7E0CC",
        height: "100%",
        marginTop: "30px",
        marginBottom: 0,
      }}
    >
      <TasksList all={tasks} />
      {/* <Timeline align="left">
        <EachTask
          time="6:30"
          colorDot="secondary"
          link="/create"
          icon={<SportsTennisIcon />}
          taskName="Acordar"
          timeEnd="6:45"
          duration="15min"
        />
        <TimelineItem>
          <TimelineOppositeContent
            sx={{
              m: "auto 0",
              flex: 0.1,
              ".MuiTimelineOppositeContent-root": { width: "70px" },
            }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            9:30
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" sx={{ boxShadow: 3 }}>
              <Link to="/create" style={{ color: "white" }}>
                <SportsTennisIcon />
              </Link>
            </TimelineDot>
            <TimelineConnector
              sx={{
                ".MuiTimelineConnector-root": { backgroundColor: "primary" },
              }}
            />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              style={{ fontWeight: "bold", height: "18px", marginBottom: 0 }}
              display="block"
              component="span"
              variant="subtitle1"
            >
              Aula de tênis
            </Typography>
            <Typography variant="caption">9:30-10:30(1 hora)</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{
              m: "auto 0",
              flex: 0.1,
              ".MuiTimelineOppositeContent-root": { width: "10px" },
            }}
            align="left"
            variant="body2"
            color="text.secondary"
          >
            11:00
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" sx={{ boxShadow: 3 }}>
              <SportsTennisIcon />
            </TimelineDot>
            <TimelineConnector
              sx={{
                ".MuiTimelineConnector-root": { backgroundColor: "primary" },
              }}
            />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              style={{ fontWeight: "bold", height: "18px", marginBottom: 0 }}
              display="block"
              component="span"
              variant="subtitle1"
            >
              Dentista
            </Typography>
            <Typography variant="caption">11:00-12:00(1 hora)</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{
              m: "auto 0",
              flex: 0.1,
              ".MuiTimelineOppositeContent-root": {
                width: "80px",
              },
            }}
            align="left"
            variant="body2"
            color="text.secondary"
          >
            12:30
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" sx={{ boxShadow: 3 }}>
              <SportsTennisIcon />
            </TimelineDot>
            <TimelineConnector
              sx={{
                ".MuiTimelineConnector-root": { backgroundColor: "primary" },
              }}
            />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              style={{ fontWeight: "bold", height: "18px", marginBottom: 0 }}
              display="block"
              component="span"
              variant="subtitle1"
            >
              Almoço
            </Typography>
            <Typography variant="caption">12:30-13:00(30min)</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline> */}
    </div>
  );
}

export default DayTimeline;
