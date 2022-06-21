import * as React from "react";

import { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Button,
  Stack,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Alert,
} from "@mui/material";

import { lightFormat, parseISO, isBefore } from "date-fns";
import api from "../apis/api";
import { useNavigate } from "react-router-dom";

import {
  TimePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import ShortTextIcon from "@mui/icons-material/ShortText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import useStyles from "../styles/styles";

import FormSelect from "./FormSelect";
import FormInput from "./FormInput";
import FormButtonCreate from "./FormButtonCreate";

function TabEvent() {
  const navigate = useNavigate();

  const classes = useStyles();

  const [state, setState] = useState({
    name: "",
    category: "",
    dateTime: new Date(),
    duration: "",
    description: "",
    timeReminder: "",
  });

  const [newDate, setNewDate] = useState(new Date());
  const [datetime, setDatetime] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );

  const [errors, setErrors] = useState({
    msg: null,
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
    { name: "Diário", value: "diario" },
    { name: "Semanal", value: "semanal" },
    { name: "Mensal", value: "mensal" },
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

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function dataFormat() {
    const date = lightFormat(new Date(newDate), "yyyy-MM-dd");
    const time = lightFormat(new Date(datetime), "HH:mm:ss:S");
    const finalDate = new Date(date + " " + time);
    setState({ ...state, dateTime: finalDate });
  }
  const handleChangeTime = (newDatetime) => setDatetime(newDatetime);

  const handleChangeDate = (newValue) => setNewDate(newValue);

  useEffect(() => {
    dataFormat();
  }, [newDate, datetime]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isBefore(new Date(state.dateTime), new Date())) {
      return setErrors({
        msg: "You cannot create an event for a past date.",
      });
    }
    if (!state.name || !state.dateTime || !state.duration || !state.category) {
      return setErrors({
        msg: "You have to fill in: name, date, time and duration to complete.",
      });
    }
    try {
      const response = await api.post("/event", state);
      setErrors({ msg: null });
      navigate(`/event/${response.data._id}`);
    } catch (err) {
      console.error(err.response.data);
      return setErrors({ ...err.response.data });
    }
  }

  return (
    <div style={{ height: "calc(100vh - 144px )", overflow: "scroll" }}>
      {errors.msg && <Alert severity="error">{errors.msg}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <FormInput
          id={`title-name-${state.name}`}
          multiline={false}
          title="nome do evento"
          variant="filled"
          size="small"
          name="name"
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
                value={datetime}
                onChange={handleChangeTime}
                renderInput={(params) => (
                  <TextField variant="standard" {...params} />
                )}
              />
            </Box>
            <Box className={classes.input}>
              <CalendarMonthIcon className={classes.icons} />
              <MobileDatePicker
                className={classes.picker}
                InputProps={{ disableUnderline: true }}
                inputFormat="dd/MM/yyyy"
                hiddenlabel="true"
                value={newDate}
                onChange={handleChangeDate}
                renderInput={(params) => (
                  <TextField variant="standard" {...params} />
                )}
              />
            </Box>
            {/* <Box className={classes.input}>
            <PersonAddAltOutlinedIcon className={classes.icons} />
            <TextField
              InputProps={{ disableUnderline: true }}
              id="input-invite"
              label="convidado"
              placeholder="convidado"
              variant="standard"
            />
          </Box> */}
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
          </Stack>
        </LocalizationProvider>
        <FormButtonCreate state={state} title="Criar evento" />
      </Box>
    </div>
  );
}

export default TabEvent;
