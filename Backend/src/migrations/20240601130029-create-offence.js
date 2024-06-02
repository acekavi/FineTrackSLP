'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Offences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      offence_ID: {
        type: Sequelize.INTEGER
      },
      offence_description: {
        type: Sequelize.TEXT
      },
      score: {
        type: Sequelize.DECIMAL
      },
      enable_stat: {
        type: Sequelize.BOOLEAN
      },
      fee: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Offences');
  }
};