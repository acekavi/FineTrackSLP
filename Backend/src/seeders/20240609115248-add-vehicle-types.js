'use strict';

const { QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
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
		const vehicleTypesArray = []; // Array to hold vehicle types

		// Get all DrLicences licenceNumbers
		const licences = await queryInterface.sequelize.query(
			'SELECT "licenceNumber" FROM "DrLicences"',
			{
				type: QueryTypes.SELECT,
			}
		);

		for (let licence of licences) {
			// Randomly select multiple vehicle types
			const numberOfVehicleTypes =
				Math.floor(Math.random() * vehicleTypes.length) + 1;
			const selectedVehicleTypes = [];

			for (let i = 0; i < numberOfVehicleTypes; i++) {
				let randomIndex = Math.floor(Math.random() * vehicleTypes.length);
				if (!selectedVehicleTypes.includes(vehicleTypes[randomIndex])) {
					selectedVehicleTypes.push(vehicleTypes[randomIndex]);
				} else {
					i--; // If the vehicle type is already selected, repeat the iteration
				}
			}

			// Add to vehicleTypesArray
			vehicleTypesArray.push({
				licenceNumber: licence.licenceNumber,
				types: Sequelize.literal(
					`ARRAY[${selectedVehicleTypes.map((vt) => `'${vt}'`).join(',')}]::"enum_VehicleTypes_types"[]`
				),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		// Insert into VehicleTypes table
		await queryInterface.bulkInsert('VehicleTypes', vehicleTypesArray, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('VehicleTypes', null, {});
	},
};
