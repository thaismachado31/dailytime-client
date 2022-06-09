import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import TabTask from "../components/TabTask";
import useStyles from "../styles/styles";

function Create() {
  const classes = useStyles();

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
          value={0}
          //   onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab className={classes.form} label="Nova tarefa" />
          <Tab className={classes.form} label="Novo evento" />
        </Tabs>
      </Box>
      <TabTask value={0} index={0}>
        Nova tarefa
      </TabTask>
      {/* <TabPanel value={value} index={1}>
        Novo Evento
      </TabPanel> */}
    </div>
  );
}

export default Create;
