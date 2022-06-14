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
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import TimelapseIcon from "@mui/icons-material/Timelapse";

import api from "../apis/api";
import { useNavigate } from "react-router-dom";

import useStyles from "../styles/styles";
import { parseISO, isBefore } from "date-fns";

function TabTask() {
  const navigate = useNavigate();

  const classes = useStyles();

  const [state, setState] = useState({
    name: "",
    description: "",
    dateTime: new Date(),
    duration: "",
    timeReminder: "",
    recurrence: "",
  });

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

  function dataFormat() {
    const dateString = newDate.toISOString();
    const timeString = datetime.toISOString();
    const lastDate = dateString.split("T")[0] + "T" + timeString.split("T")[1];
    const finalDate = parseISO(lastDate);
    console.log(finalDate);
    setState({ ...state, dateTime: finalDate });
  }

  useEffect(() => {
    dataFormat();
  }, [newDate, datetime]);

  async function handleSubmit(event) {
    event.preventDefault();
    validadeInputs();
    try {
      const response = await api.post("/newtask", state);
      console.log(response);
      validadeInputs();
      navigate("/");
    } catch (err) {
      console.error(err.response.data);
      return setErrors({ ...err.response.data });
    }
  }

  function validadeInputs() {
    if (isBefore(new Date(), state.dateTime)) {
      return setErrors({
        msg: "Your date has to be after today.",
      });
    }
    if (!state.name && !state.dateTime && !state.duration) {
      return setErrors({
        msg: "You have to fill in: name, date, time and duration to complete.",
      });
    }
    return setErrors({ msg: null });
  }

  console.log(state);
  const removeBorderInput = {
    "&:after": {
      border: "none",
    },
    "&::before": {
      border: "none",
    },
    "&:hover:not(.Mui-disabled):before": {
      border: "none",
    },
  };

  return (
    <div>
      {errors.msg && <Alert severity="error">{errors.msg}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <TextField
          InputProps={{ disableUnderline: true }}
          sx={{ marginTop: "20px", marginBottom: "40px" }}
          fullWidth
          hiddenlabel="true"
          id="filled-hidden-label-small"
          placeholder="nome da tarefa"
          variant="filled"
          size="small"
          name="name"
          value={state.name}
          onChange={handleChange}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <Box className={classes.input}>
              <ShortTextIcon className={classes.icons} />
              <TextField
                InputProps={{ disableUnderline: true }}
                fullWidth
                id="input-description"
                hiddenlabel="true"
                placeholder="descrição"
                multiline
                variant="standard"
                name="description"
                value={state.description}
                onChange={handleChange}
                maxRows={2}
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
                onChange={(newDatetime) => setDatetime(newDatetime)}
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
                onChange={(newValue) => setNewDate(newValue)}
                renderInput={(params) => (
                  <TextField variant="standard" {...params} />
                )}
              />
            </Box>
            <Box className={classes.input}>
              <TimelapseIcon className={classes.icons} />
              <FormControl>
                <InputLabel id="demo-simple-select-label">duração</InputLabel>
                <Select
                  sx={removeBorderInput}
                  style={{ width: "140px" }}
                  variant="standard"
                  id="notification-alarm"
                  name="duration"
                  value={state.duration}
                  hiddenlabel="true"
                  onChange={handleChange}
                >
                  <MenuItem value={5}>5min </MenuItem>
                  <MenuItem value={15}>15min </MenuItem>
                  <MenuItem value={30}>30min </MenuItem>
                  <MenuItem value={60}>1 hora </MenuItem>
                  <MenuItem value={120}>2 horas </MenuItem>
                  <MenuItem value={180}>3 horas </MenuItem>
                  <MenuItem value={240}>4 horas </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className={classes.input}>
              <LoopIcon className={classes.icons} />
              <FormControl>
                <InputLabel id="demo-simple-select-label">repetir</InputLabel>
                <Select
                  sx={removeBorderInput}
                  style={{ width: "140px" }}
                  variant="standard"
                  id="week-recurrence"
                  value={state.recurrence}
                  name="recurrence"
                  label="recurrence"
                  onChange={handleChange}
                >
                  <MenuItem value={"-"}>-</MenuItem>
                  <MenuItem value={"diario"}>Diario</MenuItem>
                  <MenuItem value={"semanal"}>Semanal</MenuItem>
                  <MenuItem value={"mensal"}>Mensal</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className={classes.input}>
              <NotificationsNoneIcon className={classes.icons} />
              <FormControl>
                <InputLabel id="demo-simple-select-label">lembrete</InputLabel>
                <Select
                  sx={removeBorderInput}
                  style={{ width: "140px" }}
                  variant="standard"
                  id="notification-alarm"
                  name="timeReminder"
                  value={state.timeReminder}
                  hiddenlabel="true"
                  onChange={handleChange}
                >
                  <MenuItem value={0}>-</MenuItem>
                  <MenuItem value={5}>5min antes</MenuItem>
                  <MenuItem value={15}>15min antes</MenuItem>
                  <MenuItem value={30}>30min antes</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </LocalizationProvider>
        <div className={classes.divButton}>
          <Button
            className={classes.styleButton}
            sx={{
              width: "197px",
              height: "42px",
              borderRadius: "100px",
              backgroundColor:
                state.name && state.dateTime && state.duration
                  ? "#32747F"
                  : "#CDD4DB",
              padding: "10px",
              textTransform: "unset",
            }}
            variant="contained"
            type="submit"
            endIcon={<PlayArrowOutlinedIcon />}
          >
            Criar tarefa
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default TabTask;
