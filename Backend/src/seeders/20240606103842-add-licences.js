'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const drLicences = [];

		for (let i = 1; i <= 50; i++) {
			drLicences.push({
				licence_number: `${String(i).padStart(7, '0')}`,
				expire_date: new Date(2025, 11, 31), // Static future date
				nic: `${String(i).padStart(11, '0')}`,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		await queryInterface.bulkInsert('DrLicences', drLicences, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('DrLicences', null, {});
	},
};
