import * as React from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import api from "../apis/api";
import { useNavigate } from "react-router-dom";

import useStyles from "../styles/styles";
import { lightFormat } from "date-fns";

function UpdateTask() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    category: "",
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

  const { _id } = useParams();

  useEffect(() => {
    async function taskDetails() {
      try {
        const response = await api.get(`/task/${_id}`);

        console.log(response.data);

        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    taskDetails();
  }, [_id]);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function dataFormat() {
    const date = lightFormat(new Date(newDate), "yyyy-MM-dd");
    const time = lightFormat(new Date(datetime), "HH:mm:ss:S");
    const finalDate = new Date(date + " " + time);
    setState({ ...state, dateTime: finalDate });
  }

  useEffect(() => {
    dataFormat();
  }, [newDate, datetime]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.patch(`/task/${_id}`, state);
      console.log(response);

      setErrors({ msg: null });

      navigate(`/task/${_id}`);
    } catch (err) {
      console.error(err.response.data);
      return setErrors({ ...err.response.data });
    }
  }

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

  const classes = useStyles();

  const theme = createTheme({
    palette: {
      primary: {
        light: "#b5f8f1",
        main: "#83C5BE",
        dark: "#53948e",
      },
      secondary: {
        light: "#63a2ae",
        main: "#32747F",
        dark: "#004753",
      },
      warning: {
        main: "#E29478",
      },
      info: {
        main: "#FFB672",
      },
      grey: {
        50: "#FFFFFF",
        100: "#EBEDF1",
        200: "#CDD4DB",
        300: "#ADB7C2",
        400: "#8D9AAA",
        500: "#768597",
        600: "#5E7185",
        700: "#516274",
        800: "#333D49",
        900: "#212932",
      },
    },
    typography: {
      fontFamily: [
        "Quicksand",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    button: {
      fontWeight: 500,
      fontSize: "14px",
      textTransform: "unset",
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
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
                <CategoryOutlinedIcon className={classes.icons} />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    categoria
                  </InputLabel>
                  <Select
                    sx={removeBorderInput}
                    style={{ width: "140px" }}
                    variant="standard"
                    id="label-category"
                    value={state.category}
                    name="category"
                    label="categoria"
                    onChange={handleChange}
                  >
                    <MenuItem value={0}>lazer</MenuItem>
                    <MenuItem value={1}>refeições</MenuItem>
                    <MenuItem value={2}>trabalho/estudo</MenuItem>
                    <MenuItem value={3}>cotidiano</MenuItem>
                    <MenuItem value={4}>transporte</MenuItem>
                    <MenuItem value={5}>reunião</MenuItem>
                    <MenuItem value={6}>outro</MenuItem>
                  </Select>
                </FormControl>
              </Box>
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
                  <InputLabel id="demo-simple-select-label">
                    lembrete
                  </InputLabel>
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
              Atualizar tarefa
            </Button>
          </div>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default UpdateTask;
