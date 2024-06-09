const { faker } = require('@faker-js/faker');
const { QueryTypes } = require('sequelize');

module.exports = {
	async up(queryInterface, Sequelize) {
		const licences = [];

		// Get all NIC idNumbers
		const nics = await queryInterface.sequelize.query(
			'SELECT "idNumber" FROM "NICs"',
			{
				type: QueryTypes.SELECT,
			}
		);

		// Shuffle the nics array
		nics.sort(() => Math.random() - 0.5);

		for (let i = 0; i < 30; i++) {
			// Use a unique NIC idNumber
			const uniqueNic = nics[i];

			licences.push({
				licenceNumber: faker.number.int({ min: 10000000, max: 99999999 }),
				expiryDate: faker.date.future(),
				nicNumber: uniqueNic.idNumber,
				spectaclesNeeded: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		await queryInterface.bulkInsert('DrLicences', licences, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('DrLicences', null, {});
	},
};
