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

// import FormSelect from "./FormSelect";
import { lightFormat, parseISO, isBefore } from "date-fns";
import api from "../apis/api";
import { useNavigate } from "react-router-dom";

import {
  TimePicker,
  LocalizationProvider,
  MobileDatePicker,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import ShortTextIcon from "@mui/icons-material/ShortText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AlarmOnOutlinedIcon from "@mui/icons-material/AlarmOnOutlined";

import useStyles from "../styles/styles";

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

  // const alarmOp = [
  //   "-",
  //   "5min antes",
  //   "10min antes",
  //   "15min antes",
  //   "30min antes",
  // ];

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
    // if (isBefore(state.dateTime, new Date())) {
    //   return setErrors({
    //     msg: "Your date has to be after today.",
    //   });
    // }
    // if (!state.name || !state.dateTime || !state.duration || !state.category) {
    //   return setErrors({
    //     msg: "You have to fill in: name, date, time and duration to complete.",
    //   });
    // }
    try {
      const response = await api.post("/event", state);
      setErrors({ msg: null });
      navigate(`/event/${response.data._id}`);
    } catch (err) {
      console.error(err.response.data);
      return setErrors({ ...err.response.data });
    }
  }

  const removeBorderInput = {
    "&:after": {
      border: "none",
    },
    "&:before": {
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
          placeholder="nome do evento"
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
                <InputLabel id="demo-simple-select-label">categoria</InputLabel>
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
                label="descrição"
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
                value={datetime}
                onChange={(newDatetime) => {
                  setDatetime(newDatetime);
                }}
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
                onChange={(newValue) => {
                  setNewDate(newValue);
                }}
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
              <NotificationsNoneIcon className={classes.icons} />
              <FormControl>
                <InputLabel id="demo-simple-select-label">lembrete</InputLabel>
                <Select
                  sx={removeBorderInput}
                  style={{
                    width: "140px",
                  }}
                  variant="standard"
                  labelId="notification"
                  id="notification-alarm"
                  name="timeReminder"
                  value={state.timeReminder}
                  hiddenlabel="true"
                  onChange={handleChange}
                >
                  <MenuItem value={0}>-</MenuItem>
                  <MenuItem value={5}>5min antes</MenuItem>
                  <MenuItem value={10}>10min antes</MenuItem>
                  <MenuItem value={30}>30min antes</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </LocalizationProvider>
        <div className={classes.divButton}>
          <Button
            className={classes.buttonStyle}
            sx={{
              width: "197px",
              height: "42px",
              borderRadius: "100px",
              backgroundColor: state.name && state.date ? "#32747F" : "#CDD4DB",
              padding: "10px",
              textTransform: "unset",
            }}
            variant="contained"
            type="submit"
            endIcon={<PlayArrowOutlinedIcon />}
          >
            Criar evento
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default TabEvent;
