import axios from "axios";
const mainUrl = "http://localhost:4000";

export function setRooms(payload) {
  return { type: "ROOMS/SETROOMS", payload };
}

export function setRoom(payload) {
  return { type: "ROOM/SETROOM", payload };
}

export function setClients(payload) {
  return { type: "CLIENTS/SETCLIENTS", payload };
}

export function setUsage(payload) {
  return { type: "USAGE/SETUSAGE", payload };
}

export function setLoading(payload) {
  return { type: "LOADING/SETLOADING", payload };
}

export function fetchRooms() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      let rooms = await axios({
        method: "GET",
        url: `${mainUrl}/`,
      });

      dispatch(setRooms(rooms.data.rooms));
    } catch (err) {
      console.log(err);
    }

    dispatch(setLoading(false));
  };
}

export function fetchRoom(payload) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      console.log(payload);
      let room = await axios({
        method: "GET",
        url: `${mainUrl}/detail/${payload.meetingRoomIds}`,
      });

      console.log(room, "ini satuan");
      dispatch(setRoom(room.data.room));
    } catch (err) {
      console.log(err.response);
    }

    dispatch(setLoading(false));
  };
}

export function fetchClients(payload) {
  return async (dispatch) => {
    try {
      const clients = await axios({
        method: "GET",
        url: `${mainUrl}/clients`,
      });
      console.log(clients);
      dispatch(setClients(clients.data.clients));
    } catch (err) {
      console.log(err);
    }
  };
}

export function bookRoom(payload) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const temp = await axios({
        method: "POST",
        url: `${mainUrl}/book/${payload.meetingRoomId}`,
        data: { credit: payload.credit, user: payload.user },
      });

      dispatch(fetchRooms());
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };
}

export function getDataUsage(payload) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      let usage = await axios({
        method: "GET",
        url: `${mainUrl}/usage/${payload.meetingRoomId}`,
      });
      console.log(usage);

      dispatch(setUsage(usage.data.reports));
    } catch (err) {
      console.log(err.response);
    }
    dispatch(setLoading(false));
  };
}
