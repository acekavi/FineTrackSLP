const { faker } = require('@faker-js/faker');
const { QueryTypes } = require('sequelize');

module.exports = {
	async up(queryInterface, Sequelize) {
		const licences = [];
		const vehicleTypesArray = []; // Array to hold vehicle types
		const vehicleTypes = [
			'A1',
			'A',
			'B1',
			'B',
			'C1',
			'C',
			'CE',
			'D1',
			'D',
			'DE',
			'G1',
			'G',
			'J',
		]; // Define vehicle types

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

			// Randomly select multiple vehicle types
			const numberOfVehicleTypes =
				Math.floor(Math.random() * vehicleTypes.length) + 1; // Random number of vehicle types
			const selectedVehicleTypes = [];

			for (let i = 0; i < numberOfVehicleTypes; i++) {
				let randomIndex = Math.floor(Math.random() * vehicleTypes.length);
				if (!selectedVehicleTypes.includes(vehicleTypes[randomIndex])) {
					selectedVehicleTypes.push(vehicleTypes[randomIndex]);
				} else {
					i--;
				}
			}

			const licenceNumber = faker.number.int({ min: 10000000, max: 99999999 });

			licences.push({
				licenceNumber: licenceNumber,
				expiryDate: faker.date.future(),
				nicNumber: uniqueNic.idNumber,
				spectaclesNeeded: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			// Add to vehicleTypesArray
			vehicleTypesArray.push({
				licenceNumber: licenceNumber,
				vehicleType: selectedVehicleTypes,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		// Insert into DrLicences and VehicleTypes tables
		await queryInterface.bulkInsert('DrLicences', licences, {});
		await queryInterface.bulkInsert('VehicleTypes', vehicleTypesArray, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('DrLicences', null, {});
		await queryInterface.bulkDelete('VehicleTypes', null, {});
	},
};
