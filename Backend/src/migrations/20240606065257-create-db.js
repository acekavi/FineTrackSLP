'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('NICs', {
			idNumber: {
				type: Sequelize.CHAR(12),
				allowNull: false,
				primaryKey: true,
			},
			firstName: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			middleName: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			surname: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			dob: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			gender: {
				type: Sequelize.ENUM('Male', 'Female', 'Other'),
				allowNull: false,
			},
			address1: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			address2: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			address3: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		await queryInterface.createTable('DrLicences', {
			licenceNumber: {
				type: Sequelize.STRING(8),
				allowNull: false,
				primaryKey: true,
			},
			expiryDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			nicNumber: {
				type: Sequelize.CHAR(12),
				allowNull: false,
				unique: true,
				references: {
					model: 'NICs',
					key: 'idNumber',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			spectaclesNeeded: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		await queryInterface.createTable('Citizens', {
			nicNumber: {
				type: Sequelize.CHAR(12),
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'NICs',
					key: 'idNumber',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			mobile: {
				type: Sequelize.STRING(15),
				allowNull: false,
			},
			username: {
				type: Sequelize.STRING(15),
				unique: true,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING(60),
				allowNull: false,
			},
			earnedScore: {
				type: Sequelize.DECIMAL(4, 2),
				allowNull: true,
				defaultValue: 0,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		await queryInterface.createTable('Evidences', {
			fineId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			evidenceLink: {
				type: Sequelize.STRING(512),
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		await queryInterface.createTable('Feedbacks', {
			nicNumber: {
				type: Sequelize.CHAR(12),
				allowNull: false,
				references: {
					model: 'Citizens',
					key: 'nicNumber',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			feedback: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		await queryInterface.createTable('IfDrivers', {
			fineId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			vehicle: {
				type: Sequelize.CHAR(10),
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		await queryInterface.createTable('Offences', {
			offenceId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			offenceType: {
				type: Sequelize.ENUM('Driver', 'Pedestrian'),
				allowNull: false,
				defaultValue: 'Driver',
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			score: {
				type: Sequelize.DECIMAL(4, 2),
				allowNull: false,
			},
			enabled: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			fee: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		await queryInterface.createTable('Stations', {
			stationId: {
				type: Sequelize.CHAR(8),
				allowNull: false,
				primaryKey: true,
			},
			username: {
				type: Sequelize.STRING(15),
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING(60),
				allowNull: false,
			},
			location: {
				type: Sequelize.STRING(512),
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		await queryInterface.createTable('Officers', {
			officerId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: Sequelize.STRING(15),
				unique: true,
				allowNull: false,
			},
			nicNumber: {
				type: Sequelize.CHAR(12),
				allowNull: false,
				references: {
					model: 'NICs',
					key: 'idNumber',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			stationId: {
				type: Sequelize.CHAR(8),
				allowNull: false,
				references: {
					model: 'Stations',
					key: 'stationId',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			password: {
				type: Sequelize.STRING(60),
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		await queryInterface.createTable('FineRecords', {
			fineId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			nicNumber: {
				type: Sequelize.CHAR(12),
				allowNull: false,
				references: {
					model: 'Citizens',
					key: 'nicNumber',
				},
			},
			totalFine: {
				type: Sequelize.DECIMAL(12, 2),
				allowNull: false,
			},
			totalScore: {
				type: Sequelize.DECIMAL(4, 2),
				allowNull: false,
			},
			fineDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			fineTime: {
				type: Sequelize.TIME,
				allowNull: false,
			},
			locationName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			locationLink: {
				type: Sequelize.STRING(512),
				allowNull: false,
			},
			isDriver: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			officerId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Officers',
					key: 'officerId',
				},
			},
			isPaid: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			payReferenceId: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		await queryInterface.createTable('OffenceRecords', {
			fineId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'FineRecords',
					key: 'fineId',
				},
			},
			offenceId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Offences',
					key: 'offenceId',
				},
			},
			offenceDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});

		await queryInterface.createTable('VehicleTypes', {
			licenceNumber: {
				type: Sequelize.STRING(8),
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'DrLicences',
					key: 'licenceNumber',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			types: {
				type: Sequelize.ARRAY(
					Sequelize.ENUM(
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
						'J'
					)
				),
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('OffenceRecords');
		await queryInterface.dropTable('FineRecords');
		await queryInterface.dropTable('Officers');
		await queryInterface.dropTable('Stations');
		await queryInterface.dropTable('Offences');
		await queryInterface.dropTable('IfDrivers');
		await queryInterface.dropTable('Feedbacks');
		await queryInterface.dropTable('Evidences');
		await queryInterface.dropTable('DrLicences');
		await queryInterface.dropTable('Citizens');
		await queryInterface.dropTable('NICs');
		await queryInterface.dropTable('VehicleTypes');
	},
};
