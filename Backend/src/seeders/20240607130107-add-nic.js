'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
	async up(queryInterface, Sequelize) {
		const nics = [];

		for (let i = 0; i < 50; i++) {
			nics.push({
				idNumber: faker.number.int({ min: 100000000, max: 999999999 }) + 'v',
				firstName: faker.person.firstName(),
				middleName: faker.person.middleName(),
				surname: faker.person.lastName(),
				dob: faker.date.between({ '1950-01-01': '2005-12-31' }),
				gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
				address1: faker.location.streetAddress(),
				address2: faker.location.secondaryAddress(),
				address3: faker.location.city(),
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
