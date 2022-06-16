import React from "react";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";

function EachTask(props) {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{
          m: "auto 0",
          flex: 0.1,
          ".MuiTimelineOppositeContent-root": { width: "10px" },
        }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {props.time}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot color={props.colorDot} sx={{ boxShadow: 3 }}>
          <Link to={props.link} style={{ color: "white" }}>
            {props.icon}
          </Link>
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography
          style={{ fontWeight: "bold", height: "18px", marginBottom: 0 }}
          display="block"
          component="span"
          variant="subtitle1"
        >
          {props.taskName}
        </Typography>
        <Typography variant="caption">
          {props.time}-{props.timeEnd}({props.duration})
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default EachTask;
