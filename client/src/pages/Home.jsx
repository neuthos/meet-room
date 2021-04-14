import Card from "../components/Card";
import { Grid, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRooms } from "../Store/action";

export default function Home() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {rooms ? (
          rooms.map((el) => {
            return (
              <Grid item xs={4}>
                <Card room={el} />
              </Grid>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </Grid>
    </Container>
  );
}
