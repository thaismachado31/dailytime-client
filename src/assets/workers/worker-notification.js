//fibo.worker.js
// eslint-disable-next-line import/no-anonymous-default-export
//import { differenceInMinutes } from "date-fns";

export default () => {
  // eslint-disable-next-line no-restricted-globals
  self.onmessage = (message) => {
    const tasklist = JSON.parse(message.data);

    setInterval(() => {
      tasklist.map((task) => {
        let dif = new Date(task.dateTime).getTime() - new Date().getTime();
        dif = dif / (1000 * 60);
        if (dif <= task?.timeReminder && dif > 0 && !task.notified) {
          postMessage(JSON.stringify(task));
          task.notified = true;
          return task;
        }
      });
    }, 5000);
  };
};
