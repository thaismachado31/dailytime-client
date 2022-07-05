import WeekBar from "../components/weekbar/WeekBar";

function SecondHome() {
  const homeDiv = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: "5vh",
  };
  return (
    <div style={homeDiv} className="text-center">
      <WeekBar />
    </div>
  );
}

export default SecondHome;
