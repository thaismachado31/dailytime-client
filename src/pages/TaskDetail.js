import * as React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { Button, Stack } from "@mui/material";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { format } from "date-fns";

import { AuthContext } from "../contexts/authContext";

import { Link } from "react-router-dom";

import api from "../apis/api";

function TaskDetail() {
  const [task, setTask] = useState({
    userId: "",
    name: "",
    description: "",
    icon: "",
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

        console.log(response.data);

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

  // const newYears = new Date(task.dateTime);
  // const formattedDate = format(newYears, "DD/MM/YYYY");
  // console.log(formattedDate);

  const informationsStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0.5rem 0 0 1rem",
    marginLeft: "1.2rem",
    marginTop: "2rem",
  };

  const iconsStyle = { marginRight: "1rem", color: "#32747F" };

  return (
    <div>
      {isOwner() && (
        <div>
          <h4
            style={{
              margin: "1.5rem",
              color: "#32747F",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            DETALHES:
          </h4>
          <div
            style={{
              height: "40px",
              width: "89%",
              marginLeft: "20px",
              borderRadius: "10px",
              backgroundColor: "#EBEDF1",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "0.5rem 0 0 1rem",
                // color: "#32747F",
              }}
            >
              {task.name}
            </div>
          </div>

          <div style={informationsStyle}>
            <DescriptionOutlinedIcon
              style={iconsStyle}
            ></DescriptionOutlinedIcon>
            {task.description}
          </div>

          <img style={informationsStyle} src={task.icon} alt={`Icon`} />

          <div style={informationsStyle}>
            <AccessTimeIcon style={iconsStyle}></AccessTimeIcon>
            {task.dateTime}
          </div>

          <div style={informationsStyle}>
            <CalendarMonthOutlinedIcon
              style={iconsStyle}
            ></CalendarMonthOutlinedIcon>
            {task.dateTime}
          </div>

          <div style={informationsStyle}>
            <NotificationsNoneOutlinedIcon
              style={iconsStyle}
            ></NotificationsNoneOutlinedIcon>
            {task.duration} min
          </div>

          {task.timeReminder > 0 ? (
            <div style={informationsStyle}>
              <VolumeUpOutlinedIcon style={iconsStyle}></VolumeUpOutlinedIcon>
              {task.timeReminder} min antes
            </div>
          ) : (
            " "
          )}
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
              href=""
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
