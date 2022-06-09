import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  styleButton: {
    borderRadius: "100px",
    backgroundColor: "#CDD4DB",
    padding: "10px",
  },
  divButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
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
  form: {
    color: "#32747F",
  },
  tab: {
    marginTop: "20px",
  },
}));

export default useStyles;
