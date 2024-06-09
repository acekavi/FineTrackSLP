'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Define offences to insert
		const offences = [
			{
				offenceType: 'Driver',
				description: 'Speeding in a residential area',
				score: 45,
				enabled: true,
				fee: 1500.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				offenceType: 'Driver',
				description: 'Running a red light',
				score: 50,
				enabled: true,
				fee: 2000.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				offenceType: 'Driver',
				description: 'Driving under the influence of alcohol',
				score: 80,
				enabled: true,
				fee: 5000.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				offenceType: 'Driver',
				description: 'Reckless driving',
				score: 70,
				enabled: true,
				fee: 3000.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				offenceType: 'Driver',
				description: 'Failure to yield to pedestrians',
				score: 30,
				enabled: true,
				fee: 1200.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				offenceType: 'Pedestrian',
				description: 'Jaywalking',
				score: 10,
				enabled: true,
				fee: 1100.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				offenceType: 'Pedestrian',
				description: 'Crossing the street against the signal',
				score: 15,
				enabled: true,
				fee: 1300.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				offenceType: 'Pedestrian',
				description: 'Walking on a highway',
				score: 20,
				enabled: true,
				fee: 1400.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				offenceType: 'Driver',
				description: 'Using a mobile phone while driving',
				score: 25,
				enabled: true,
				fee: 1600.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				offenceType: 'Driver',
				description: 'Driving without a valid licence',
				score: 90,
				enabled: true,
				fee: 5500.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		// Insert into Offences table
		await queryInterface.bulkInsert('Offences', offences, {});
	},

	async down(queryInterface, Sequelize) {
		// Delete all entries from Offences table
		await queryInterface.bulkDelete('Offences', null, {});
	},
};
