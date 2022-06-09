import React from "react";
import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import TabTask from "../components/TabTask";
import TabEvent from "../components/TabEvent";
import useStyles from "../styles/styles";

function Create() {
  const classes = useStyles();

  const [state, setState] = useState({
    value: 1,
  });

  const handleChange = (event) => {
    setState(event.target.value);
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
          className={classes.tab}
          textColor="#83C5BE"
          indicatorColor="#83C5BE"
          value={state.value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab className={classes.form} label="Nova tarefa" />
          <Tab className={classes.form} label="Novo evento" />
        </Tabs>
      </Box>
      <TabTask value={state.value} index={0}>
        Nova tarefa
      </TabTask>
      <TabEvent value={state.value} index={1}>
        Novo Evento
      </TabEvent>
    </div>
  );
}

export default Create;
