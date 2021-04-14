const initialState = {
  rooms: [],
  room: {},
  clients: [],
  dataUsage: [],
  loading: false,
};

function reducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "ROOMS/SETROOMS":
      return { ...state, rooms: payload };
    case "ROOM/SETROOM":
      return { ...state, room: payload };
    case "CLIENTS/SETCLIENTS":
      return { ...state, clients: payload };
    case "USAGE/SETUSAGE":
      return { ...state, dataUsage: payload };
    case "LOADING/SETLOADING":
      return { ...state, loading: payload };
    default:
      return state;
  }
}

export default reducer;
