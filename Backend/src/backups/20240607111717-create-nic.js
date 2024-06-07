'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('NICs', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_number: {
				type: Sequelize.CHAR(12),
			},
			firstname: {
				type: Sequelize.STRING(50),
			},
			middlename: {
				type: Sequelize.STRING(50),
			},
			surname: {
				type: Sequelize.STRING(50),
			},
			DOB: {
				type: Sequelize.DATE,
			},
			gender: {
				type: Sequelize.STRING(6),
			},
			add_1: {
				type: Sequelize.STRING(100),
			},
			add_2: {
				type: Sequelize.STRING(100),
			},
			add_3: {
				type: Sequelize.STRING(100),
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
		await queryInterface.dropTable('NICs');
	},
};
