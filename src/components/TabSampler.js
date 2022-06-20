import * as React from "react";

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

import useStyles from "../styles/styles";
import FormSelect from "./FormSelect";
import FormInput from "./FormInput";
import FormButtonCreate from "./FormButtonCreate";

function TabSampler(props) {
  const classes = useStyles();

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

  const {
    tabState,
    onSubmit,
    error,
    title,
    button,
    onChange,
    onChangeTime,
    onChangeDate,
    time,
    date,
  } = props;
  return (
    <div>
      {error.msg && <Alert severity="error">{error.msg}</Alert>}

      <Box component="form" onSubmit={onSubmit} sx={{ p: 3 }}>
        <FormInput
          id={`title-name-${tabState.name}`}
          multiline={false}
          title={title}
          variant="filled"
          size="small"
          name="name"
          value={tabState.name}
          onChange={onChange}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <FormSelect
              label="categoria"
              icon={<CategoryOutlinedIcon className={classes.icons} />}
              name="category"
              value={tabState.category}
              onChange={onChange}
              options={categoryOp}
            />

            <Box className={classes.input}>
              <ShortTextIcon className={classes.icons} />
              <FormInput
                id={`title-name-${tabState.description}`}
                title="descrição"
                variant="standard"
                name="description"
                value={tabState.description}
                onChange={onChange}
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
                value={time}
                onChange={onChangeTime}
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
                value={date}
                onChange={onChangeDate}
                renderInput={(params) => (
                  <TextField variant="standard" {...params} />
                )}
              />
            </Box>
            <FormSelect
              label="duração"
              icon={<TimelapseIcon className={classes.icons} />}
              name="duration"
              value={tabState.duration}
              onChange={onChange}
              options={durationOp}
            />
            <FormSelect
              label="lembrete"
              icon={<NotificationsNoneIcon className={classes.icons} />}
              name="timeReminder"
              value={tabState.timeReminder}
              onChange={onChange}
              options={alarmOp}
            />
            <FormSelect
              label="repetir"
              icon={<LoopIcon className={classes.icons} />}
              name="recurrence"
              value={tabState.recurrence}
              onChange={onChange}
              options={recurrenceOp}
            />
          </Stack>
        </LocalizationProvider>
        <div className={classes.divButton}>
          <FormButtonCreate state={tabState} title={button} />
        </div>
      </Box>
    </div>
  );
}

export default TabSampler;
