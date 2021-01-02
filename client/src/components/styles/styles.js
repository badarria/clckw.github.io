import { makeStyles } from "@material-ui/core/styles";

export const useAdminStyles = makeStyles({
  container: { overflowX: "hidden" },
});

export const useTableFormStyles = makeStyles({
  form: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-end",
  },
  fields: { display: "flex", maxWidth: "90%", alignItems: "flex-end" },
  buttons: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "stretch",
  },
});

export const useAutocompleteStyles = makeStyles({
  input: { padding: "3px 0 7px", fontSize: "14px" },
  root: { margin: "16px", minWidth: "130px" },
  label: { textTransform: "Capitalize" },
});

export const usePickerStyles = makeStyles({
  root: {
    margin: "16px",
    maxWidth: "140px",
    minWidth: "100px",
  },
  input: { fontSize: "14px" },
});

export const useSelectStyles = makeStyles({
  root: {
    margin: "16px",
    minWidth: "80px",
  },
  input: { fontSize: "14px" },
});

export const useFieldStyles = makeStyles({
  input: { fontSize: "14px" },
  fields: { margin: "16px" },
  idInput: {
    color: "lightgray",
    maxWidth: "40px",
    "&:hover": { cursor: "auto" },
  },
  label: { textTransform: "capitalize" },
  helperText: {
    position: "absolute",
    width: "100%",
    overflowWrap: "break-word",
    top: "100%",
  },
});

export const useTableStyles = makeStyles({
  wrap: {
    width: "fit-content",
    margin: "0 auto",
  },
  root: {
    width: "fit-content",
    margin: "0px auto 80px",
  },
  box: { margin: "0 0 16px" },
  table: {
    minWidth: "600px",
    width: "auto",
  },
  head: {
    textTransform: "capitalize",
    background: "#bfbfbf33",
  },
});

export const useLoaderStyles = makeStyles({
  backdrop: {
    zIndex: 1301,
    color: "#fff",
  },
});

export const useMasterListStyle = makeStyles({
  card: {
    width: "24%",
    margin: "24px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  content: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  rating: {
    margin: "16px 0",
    alignItems: "center",
    padding: "16px 0",
    display: "flex",
    flexDirection: "column",
  },
  listWrap: {
    display: "flex",
    margin: "0 auto 150px",
    padding: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  title: { width: "100%" },
});

export const useToastStyle = makeStyles({
  msgBox: { padding: "16px" },
});

export const useHomeStyle = makeStyles({
  container: { overflowX: "hidden" },
  wrap: { width: "70%", margin: "0 auto" },
  msgBox: { margin: "16px 0 16px" },
  title: { textAlign: "center", margin: "50px 0 0" },
});

export const useLoginFormStyles = makeStyles({
  button: { marginRight: "16px" },
  title: { padding: "16px 24px 16px" },
  dialog: {
    "&.MuiDialog-root": { margin: "0", padding: "0 24px 32px", zIndex: "1200" },
  },
  form: { display: "flex", flexDirection: "column", alignItems: "center" },
  content: { padding: "0px 24px 16px" },
  fields: { marginBottom: "16px" },
  btnWrap: { margin: "16px 0 16px" },
});

export const useNavStyles = makeStyles({
  root: {
    spaceBetween: "justifyContent",
  },
  title: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
  },
  buttons: {
    display: "flex",
    flexGrow: "1",
    justifyContent: "flex-end",
  },
});

export const useSearchFormStyles = makeStyles({
  container: {
    padding: "30px",
    flexWrap: "wrap",
    margin: "50px auto 0px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  wrap: {
    margin: "10px 0 0",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  btn: {
    margin: "10px",
  },
});
