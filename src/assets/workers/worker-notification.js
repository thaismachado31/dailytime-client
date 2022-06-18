//fibo.worker.js
// eslint-disable-next-line import/no-anonymous-default-export
//import { differenceInMinutes } from "date-fns";

export default () => {
  // eslint-disable-next-line no-restricted-globals
  self.onmessage = (message) => {
    const tasklist = JSON.parse(message.data);

    // console.log(JSON.stringify(alerts));
    setInterval(() => {
      // postMessage(arr);
      tasklist.map((task) => {
        const dif = new Date(task.dateTime).getTime() - new Date().getTime();
        console.log("dif", dif / (1000 * 60));
        if (dif / (1000 * 60) <= task?.timeReminder && !task.notified) {
          postMessage(JSON.stringify(task));
          task.notified = true;
          return task;
        }
      });
    }, 5000);
  };
};
