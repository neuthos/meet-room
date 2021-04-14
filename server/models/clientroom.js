"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClientRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClientRoom.belongsTo(models.Client);
      ClientRoom.belongsTo(models.MeetingRoom);
    }
  }
  ClientRoom.init(
    {
      ClientId: DataTypes.INTEGER,
      MeetingRoomId: DataTypes.INTEGER,
      rentTime: DataTypes.INTEGER,
      stoppedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ClientRoom",
    }
  );
  return ClientRoom;
};
