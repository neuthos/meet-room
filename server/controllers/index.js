const { Client, ClientRoom, MeetingRoom } = require("../models");

class Controller {
  static async getRooms(req, res) {
    try {
      let rooms = await MeetingRoom.findAll();

      res.status(200).json({ rooms });
    } catch (err) {
      console.log(err);
      res.status(400).json({ err });
    }
  }

  static async getRoom(req, res) {
    try {
      const meetRoomId = +req.params.meetRoomId;

      let room = await MeetingRoom.findOne({ where: { id: meetRoomId } });
      res.status(200).json({ room });
    } catch (err) {
      res.status(400).json({ err });
    }
  }

  static async getClients(req, res) {
    try {
      let clients = await Client.findAll();
      res.status(200).json({ clients });
    } catch (err) {
      res.status(400).json({ err });
    }
  }

  static async usageReports(req, res) {
    try {
      const meetingRoomId = +req.params.meetingRoomId;
      let reports = await ClientRoom.findAll({
        where: { MeetingRoomId: meetingRoomId },
        include: ["Client", "MeetingRoom"],
      });

      res.status(200).json({ reports });
    } catch (err) {
      console.log(err);
      res.status(400).json({ err });
    }
  }

  static async bookRoom(req, res) {
    try {
      let { credit, user } = req.body;
      const meetingRoomId = req.params.meetingRoomId;

      let end = new Date();
      end.setHours(end.getHours() + +credit);

      const payload = {
        ClientId: user.id,
        MeetingRoomId: +meetingRoomId,
        rentTime: +credit,
        stoppedAt: end,
      };

      let temp = await ClientRoom.create(payload);

      let usedRoom = await MeetingRoom.update(
        { isUsed: true },
        { where: { id: +meetingRoomId } }
      );

      let time = +credit * 60 * 60 * 1000;

      if (usedRoom) {
        async function updateRoom() {
          let unusedRoom = await MeetingRoom.update(
            { isUsed: false },
            { where: { id: +meetingRoomId } }
          );

          let client = await Client.findOne({ where: { id: user.id } });

          let updateClient = await Client.update(
            {
              credit: client.credit - +credit,
            },
            { where: { id: user.id } }
          );
        }

        setTimeout(() => {
          updateRoom();
        }, time);
      }

      res.status(201).json({ message: "Meeting Room Booked", usedRoom });
    } catch (err) {
      console.log(err);
      res.status(400).json({ err });
    }
  }
}

module.exports = Controller;
