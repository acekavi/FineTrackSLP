'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Nics', {
			id_number: {
				type: Sequelize.CHAR(12),
				allowNull: false,
				primaryKey: true,
			},
			firstname: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			middlename: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			surname: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			DOB: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			gender: {
				type: Sequelize.STRING(6),
				allowNull: false,
			},
			add_1: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			add_2: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			add_3: {
				type: Sequelize.STRING(50),
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
			licence_number: {
				type: Sequelize.STRING(8),
				allowNull: false,
				primaryKey: true,
			},
			expire_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			nic: {
				type: Sequelize.STRING(12),
				allowNull: false,
				unique: true,
				references: {
					model: 'Nics',
					key: 'id_number',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
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
			nic: {
				type: Sequelize.CHAR(12),
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'Nics',
					key: 'id_number',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			mobile: {
				type: Sequelize.INTEGER,
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
			earned_score: {
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

		await queryInterface.createTable('Evidence', {
			fine_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			evi_link: {
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
			nic: {
				type: Sequelize.CHAR(12),
				allowNull: false,
				references: {
					model: 'Citizens',
					key: 'nic',
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
			fine_ID: {
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
			offence_ID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			offence_description: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			score: {
				type: Sequelize.DECIMAL(4, 2),
				allowNull: false,
			},
			enable_stat: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
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

		await queryInterface.createTable('OffenceRecords', {
			fine_ID: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			offence_ID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Offences',
					key: 'offence_ID',
				},
			},
			offence_date: {
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

		await queryInterface.createTable('Stations', {
			station_ID: {
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
			officer_ID: {
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
			nic: {
				type: Sequelize.CHAR(12),
				allowNull: false,
				references: {
					model: 'Nics',
					key: 'id_number',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			station_ID: {
				type: Sequelize.CHAR(8),
				allowNull: false,
				references: {
					model: 'Stations',
					key: 'station_ID',
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
			fine_ID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			nic: {
				type: Sequelize.CHAR(12),
				allowNull: false,
				references: {
					model: 'Citizens',
					key: 'nic',
				},
			},
			total_fine: {
				type: Sequelize.DECIMAL(12, 2),
				allowNull: false,
			},
			total_score: {
				type: Sequelize.DECIMAL(4, 2),
				allowNull: false,
			},
			fine_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			fine_time: {
				type: Sequelize.TIME,
				allowNull: false,
			},
			location_name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			location_link: {
				type: Sequelize.STRING(512),
				allowNull: false,
			},
			isDriver: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			officer_ID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Officers',
					key: 'officer_ID',
				},
			},
			is_payed: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			pay_reference_id: {
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
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Stations');
		await queryInterface.dropTable('Officers');
		await queryInterface.dropTable('OffenceRecords');
		await queryInterface.dropTable('Offences');
		await queryInterface.dropTable('IfDrivers');
		await queryInterface.dropTable('FineRecords');
		await queryInterface.dropTable('Feedbacks');
		await queryInterface.dropTable('Evidence');
		await queryInterface.dropTable('DrLicences');
		await queryInterface.dropTable('Citizens');
		await queryInterface.dropTable('Nics');
	},
};
