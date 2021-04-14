import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchRoom, getDataUsage } from "../Store/action";
import Table from "../components/Table";
import { Container } from "@material-ui/core";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room);
  const usages = useSelector((state) => state.dataUsage);

  useEffect(() => {
    dispatch(fetchRoom({ meetingRoomIds: id }));
    dispatch(getDataUsage({ meetingRoomId: id }));
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
        </div>
      </div>
      <Table usages={usages} />
    </Container>
  );
}
