"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("audioDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      audioFileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      audioFilePath: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      duration: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("audioDetails");
  },
};
