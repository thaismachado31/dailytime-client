import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  tab: {
    marginTop: "20px",
  },
  form: {
    color: "#32747F",
  },
  divButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  buttonStyle: {
    borderRadius: "100px",
    padding: "10px",
  },
  icons: {
    color: "#32747F",
    marginRight: "20px",
  },
  input: {
    border: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    margin: "20px",
  },
}));

export default useStyles;
