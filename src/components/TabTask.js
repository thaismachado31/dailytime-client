import * as React from "react";

import { useState, useEffect } from "react";
import { TextField, Box, Stack, Alert } from "@mui/material";

import {
  TimePicker,
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import ShortTextIcon from "@mui/icons-material/ShortText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LoopIcon from "@mui/icons-material/Loop";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import api from "../apis/api";
import { useNavigate } from "react-router-dom";

import useStyles from "../styles/styles";
import { lightFormat } from "date-fns";
import FormSelect from "./FormSelect";
import FormInput from "./FormInput";
import FormButtonCreate from "./FormButtonCreate";

function TabTask() {
  const navigate = useNavigate();

  const classes = useStyles();

  const [state, setState] = useState({
    name: "",
    category: "",
    description: "",
    dateTime: new Date(),
    duration: "",
    timeReminder: "",
    recurrence: "",
  });

  const alarmOp = [
    { name: "-", value: 0 },
    { name: "5min antes", value: 5 },
    { name: "10min antes", value: 10 },
    { name: "15min antes", value: 15 },
    { name: "30min antes", value: 30 },
  ];

  const categoryOp = [
    { name: "lazer", value: 0 },
    { name: "refeições", value: 1 },
    { name: "trabalho/estudo", value: 2 },
    { name: "cotidiano", value: 3 },
    { name: "transporte", value: 4 },
    { name: "reunião", value: 5 },
    { name: "outro", value: 6 },
  ];

  const recurrenceOp = [
    { name: "-", value: "-" },
    { name: "Diário", value: "daily" },
    { name: "Semanal", value: "weekly" },
    { name: "Mensal", value: "monthly" },
  ];

  const durationOp = [
    { name: "5min", value: 5 },
    { name: "15min", value: 15 },
    { name: "30min", value: 30 },
    { name: "1 hora", value: 60 },
    { name: "2 horas", value: 120 },
    { name: "3 horas", value: 180 },
    { name: "4 horas", value: 240 },
  ];

  const [newDate, setNewDate] = useState(new Date());
  const [datetime, setDatetime] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );

  const [errors, setErrors] = useState({
    msg: null,
  });

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  const handleChangeTime = (newDatetime) => setDatetime(newDatetime);

  const handleChangeDate = (newValue) => setNewDate(newValue);

  function dataFormat() {
    const date = lightFormat(new Date(newDate), "yyyy-MM-dd");
    const time = lightFormat(new Date(datetime), "HH:mm:ss:S");
    const finalDate = new Date(date + " " + time);
    setState({ ...state, dateTime: finalDate });
  }

  // function dailyRecurrency() {
  //   if (state.recurrence === "daily") {
  //     getDay(state.dateTime);
  //   }
  // }

  // function weeklyRecurrency() {
  //   if (state.recurrence === "weekly") {
  //     addWeeks(state.dateTime, 1);
  //     getDay(state.dateTime);
  //   }
  // }

  useEffect(() => {
    dataFormat();
  }, [newDate, datetime]);

  async function handleSubmit(event) {
    event.preventDefault();
    // if (isBefore(new Date(state.dateTime), new Date())) {
    //   return setErrors({
    //     msg: "Your date has to be after today.",
    //   });
    // }
    // if (!state.name || !state.duration || !state.category) {
    //   return setErrors({
    //     msg: "You have to fill in: name, category and duration to complete.",
    //   });
    // }
    try {
      const response = await api.post("/newtask", state);
      console.log(response);
      setErrors({ msg: null });
      navigate(`/task/${response.data._id}`);
    } catch (err) {
      console.error(err.response.data);
      return setErrors({ ...err.response.data });
    }
  }

  return (
    <div
      style={{
        height: "calc(100vh - 144px )",
        marginLeft: "20px",
        marginRight: "20px",
        overflow: "scroll",
      }}
    >
      {errors.msg && <Alert severity="error">{errors.msg}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <FormInput
          id={`title-name-${state.name}`}
          multiline={false}
          title="nome da tarefa"
          variant="filled"
          size="small"
          name="name"
          marginTop="20px"
          marginBottom="20px"
          value={state.name}
          onChange={handleChange}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <FormSelect
              label="categoria"
              icon={<CategoryOutlinedIcon className={classes.icons} />}
              name="category"
              value={state.category}
              onChange={handleChange}
              options={categoryOp}
            />

            <Box className={classes.input}>
              <ShortTextIcon className={classes.icons} />
              <FormInput
                id={`title-name-${state.description}`}
                title="descrição"
                variant="standard"
                name="description"
                value={state.description}
                onChange={handleChange}
                row={2}
              />
            </Box>
            <Box className={classes.input}>
              <AccessTimeIcon className={classes.icons} />
              <TimePicker
                className={classes.picker}
                InputProps={{ disableUnderline: true }}
                hiddenlabel="true"
                ampm={false}
                margin="normal"
                // name="dateTime"
                value={datetime}
                onChange={handleChangeTime}
                renderInput={(params) => (
                  <TextField variant="standard" {...params} />
                )}
              />
            </Box>
            <Box className={classes.input}>
              <CalendarMonthIcon className={classes.icons} />
              <DatePicker
                className={classes.picker}
                InputProps={{ disableUnderline: true }}
                inputFormat="dd/MM/yyyy"
                hiddenlabel="true"
                // name="date"
                value={newDate}
                onChange={handleChangeDate}
                renderInput={(params) => (
                  <TextField variant="standard" {...params} />
                )}
              />
            </Box>
            <FormSelect
              label="duração"
              icon={<TimelapseIcon className={classes.icons} />}
              name="duration"
              value={state.duration}
              onChange={handleChange}
              options={durationOp}
            />
            <FormSelect
              label="lembrete"
              icon={<NotificationsNoneIcon className={classes.icons} />}
              name="timeReminder"
              value={state.timeReminder}
              onChange={handleChange}
              options={alarmOp}
            />
            <FormSelect
              label="repetir"
              icon={<LoopIcon className={classes.icons} />}
              name="recurrence"
              value={state.recurrence}
              onChange={handleChange}
              options={recurrenceOp}
            />
          </Stack>
        </LocalizationProvider>
        <FormButtonCreate state={state} title="Criar tarefa" />
      </Box>
    </div>
  );
}

export default TabTask;
