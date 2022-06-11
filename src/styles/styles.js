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
    backgroundColor: "#CDD4DB",
    padding: "10px",
  },
  icons: {
    color: "#32747F",
    marginRight: "20px",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

export default useStyles;