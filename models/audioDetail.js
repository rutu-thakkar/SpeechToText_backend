"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class audioDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  audioDetail.init(
    {
      audioFileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      audioFilePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "audioDetail",
    }
  );
  return audioDetail;
};
