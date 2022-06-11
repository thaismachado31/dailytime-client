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

import FormSelect from "./FormSelect";

import {
  TimePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import ShortTextIcon from "@mui/icons-material/ShortText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

import useStyles from "../styles/styles";

function TabEvent(props) {
  const { children, value, index, ...other } = props;

  const classes = useStyles();

  const alarmOp = [
    "-",
    "5min antes",
    "10min antes",
    "15min antes",
    "30min antes",
  ];

  const [datetime, setDatetime] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );

  const [newDate, setNewDate] = useState(new Date());

  const [alarm, setAlarm] = useState("");

  const handleChangeAlarm = (event) => {
    setAlarm(event.target.value);
  };

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
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <TextField
            InputProps={{ disableUnderline: true }}
            sx={{ margin: "15px 0" }}
            fullWidth
            hiddenLabel
            id="filled-hidden-label-small"
            placeholder="nome do evento"
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
                <PersonAddAltOutlinedIcon className={classes.icons} />
                <TextField
                  InputProps={{ disableUnderline: true }}
                  id="input-invite"
                  label="convidado"
                  placeholder="convidado"
                  variant="standard"
                />
              </Box>
              <FormSelect
                label="lembrete"
                icon={<NotificationsNoneIcon className={classes.icons} />}
                value={alarm}
                onChange={handleChangeAlarm}
                name="alarm"
                options={alarmOp}
              ></FormSelect>
              {/* <Box className={classes.input}>
                <NotificationsNoneIcon className={classes.icons} />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    lembrete
                  </InputLabel>
                  <Select
                    sx={removeBorderInput}
                    style={{
                      width: "140px",
                    }}
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
              </Box> */}
            </Stack>
          </LocalizationProvider>
          <div className={classes.divButton}>
            <Button
              className={classes.buttonStyle}
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
              Criar evento
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
}

export default TabEvent;
