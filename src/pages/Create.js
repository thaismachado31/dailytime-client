import React from "react";
import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import TabTask from "../components/TabTask";
import TabEvent from "../components/TabEvent";
import useStyles from "../styles/styles";

function Create() {
  const classes = useStyles();

  const [state, setState] = useState(0);

  const handleChange = (event, newValue) => {
    setState(newValue);
  };
  return (
    <div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          sx={{
            ".MuiButtonBase-root": {
              textTransform: "none",
              fontSize: "17px",
            },
            marginTop: "20px",
            color: "#32747F",
            indicatorColor: "#83C5BE",
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#83C5BE",
            },
          }}
          textColor="#32747F"
          value={state}
          onChange={handleChange}
          aria-label="tarefas ou eventos"
          centered
        >
          <Tab className={classes.form} label="Nova tarefa" />
          <Tab className={classes.form} label="Novo evento" />
        </Tabs>
      </Box>
      {state === 0 && <TabTask />}
      {state === 1 && <TabEvent />}
    </div>
  );
}

export default Create;
