const router = require("express").Router();
const Controller = require("../controllers/index");

router.get("/", Controller.getRooms);
router.get("/clients", Controller.getClients);
router.get("/detail/:meetRoomId", Controller.getRoom);

router.post("/book/:meetingRoomId", Controller.bookRoom);
router.get("/usage/:meetingRoomId", Controller.usageReports);
module.exports = router;
