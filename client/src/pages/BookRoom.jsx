import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { fetchRoom, fetchClients, bookRoom } from "../Store/action";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  InputLabel,
  MenuItem,
  Button,
  FormControl,
  Select,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "200px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function BookRoom() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const room = useSelector((state) => state.room);
  const clients = useSelector((state) => state.clients);
  const [client, setClient] = useState({});
  const [credit, setCredit] = useState(0);
  const [creditValue, setCreditValue] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  function clientHandleChange(e) {
    if (e.target.value !== "") {
      let temp = clients.filter((el) => el.id === e.target.value);

      setClient(temp[0]);
      setCredit(temp[0].credit);
    } else {
      setClient({});
    }
  }

  function handleBook() {
    if (room.isUsed) {
      setErrorMsg(`The meeting room was in use`);
    } else {
      if (creditValue > credit || creditValue == 0) {
        setErrorMsg(`Your credit is not enough to use this meetting room`);
      } else {
        dispatch(
          bookRoom({
            user: client,
            meetingRoomId: id,
            credit: creditValue,
          })
        );
        history.push("/");
      }
    }
  }

  useEffect(() => {
    dispatch(fetchRoom({ meetingRoomIds: id }));
    dispatch(fetchClients());
  }, []);

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <div>
          <img src={room.image} alt="" style={{ width: "500px" }} />
        </div>
        <div style={{ "margin-left": "20px" }}>
          <h1>DETAIL</h1>
          <h2>{room.name}</h2>
          <p>{room.description}</p>
          <h4>Status: {room.isUsed ? "Used" : "Open"}</h4>
          <h4 style={{ color: "red" }}>{errorMsg}</h4>
          <div style={{ width: "300px" }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Client
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={client.id}
                label="Age"
                onChange={clientHandleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {clients ? (
                  clients.map((el) => {
                    return <MenuItem value={el.id}>{el.name}</MenuItem>;
                  })
                ) : (
                  <p>loading..</p>
                )}
              </Select>
            </FormControl>
            {client.credit > 0 ? (
              <div>
                <TextField
                  id="outlined-basic"
                  label="Credit"
                  variant="outlined"
                  type="number"
                  onChange={(e) => setCreditValue(+e.target.value)}
                  min="1"
                  max={client.credit}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleBook()}
                >
                  Book
                </Button>
              </div>
            ) : (
              <p>Select client or the client's credit 0</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
