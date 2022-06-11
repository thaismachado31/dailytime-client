import * as React from "react";

import { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Stack,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";

import {
  TimePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import ShortTextIcon from "@mui/icons-material/ShortText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LoopIcon from "@mui/icons-material/Loop";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

import useStyles from "../styles/styles";

function TabTask(props) {
  const { children, value, index, ...other } = props;

  const classes = useStyles();

  const [datetime, setDatetime] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );

  const [newDate, setNewDate] = useState(new Date());

  const [repeat, setRepeat] = useState("");

  const [alarm, setAlarm] = useState("");

  const handleChangeRepeat = (event) => {
    setRepeat(event.target.value);
  };

  const handleChangeAlarm = (event) => {
    setAlarm(event.target.value);
  };

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
    <Box sx={{ p: 3 }}>
      <TextField
        InputProps={{ disableUnderline: true }}
        sx={{ margin: "15px 0" }}
        fullWidth
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder="nome da tarefa"
        variant="filled"
        size="small"
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={2}>
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
              maxRows={2}
            />
          </Box>
          <Box className={classes.input}>
            <AccessTimeIcon className={classes.icons} />
            <TimePicker
              className={classes.picker}
              InputProps={{ disableUnderline: true }}
              hiddenLabel
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
              hiddenLabel
              value={newDate}
              onChange={(newDate) => {
                setNewDate(newDate);
              }}
              renderInput={(params) => (
                <TextField variant="standard" {...params} />
              )}
            />
          </Box>
          <Box className={classes.input}>
            <LoopIcon className={classes.icons} />
            <FormControl>
              <InputLabel id="demo-simple-select-label">repetir</InputLabel>
              <Select
                sx={removeBorderInput}
                style={{ width: "140px" }}
                variant="standard"
                labelId="week-recurrence"
                id="week-recurrence"
                value={repeat}
                label="recurrence"
                onChange={handleChangeRepeat}
              >
                <MenuItem value={"vazio"}>-</MenuItem>
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
                labelId="notification"
                id="notification-alarm"
                value={alarm}
                label="alarm"
                onChange={handleChangeAlarm}
              >
                <MenuItem value={"vazio"}>-</MenuItem>
                <MenuItem value={"diario"}>5min antes</MenuItem>
                <MenuItem value={"semanal"}>10min antes</MenuItem>
                <MenuItem value={"mensal"}>30min antes</MenuItem>
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
            backgroundColor: "#CDD4DB",
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
  );
}

export default TabTask;
