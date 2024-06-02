'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FineRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fine_ID: {
        type: Sequelize.INTEGER
      },
      ID: {
        type: Sequelize.STRING
      },
      total_fine: {
        type: Sequelize.DECIMAL
      },
      total_score: {
        type: Sequelize.DECIMAL
      },
      fine_date: {
        type: Sequelize.DATE
      },
      fine_time: {
        type: Sequelize.TIME
      },
      location_name: {
        type: Sequelize.STRING
      },
      location_link: {
        type: Sequelize.STRING
      },
      isDriver: {
        type: Sequelize.BOOLEAN
      },
      officer_ID: {
        type: Sequelize.INTEGER
      },
      is_payed: {
        type: Sequelize.BOOLEAN
      },
      pay_reference_id: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('FineRecords');
  }
};