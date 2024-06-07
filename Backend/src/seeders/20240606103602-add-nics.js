'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const nics = [];

		for (let i = 1; i <= 50; i++) {
			nics.push({
				id_number: `${String(i).padStart(11, '0')}`,
				firstname: `Firstname${i}`,
				middlename: `Middlename${i}`,
				surname: `Surname${i}`,
				DOB: new Date(1990, i % 12, (i % 28) + 1), // Static date for DOB
				gender: i % 2 === 0 ? 'Male' : 'Female',
				add_1: `Address1-${i}`,
				add_2: `Address2-${i}`,
				add_3: `City${i}`,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		await queryInterface.bulkInsert('NICs', nics, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('NICs', null, {});
	},
};
