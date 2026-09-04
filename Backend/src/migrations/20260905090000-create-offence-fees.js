'use strict';

/**
 * Effective-dated offence fees.
 *
 * The fee lived on the Offences row, so raising a penalty meant an UPDATE —
 * which silently rewrote what every fine already issued was worth. Referencing
 * an offence by id fixed the naming problem but not the temporal one: there
 * was no way to say what an offence cost *on the day it was issued*.
 *
 * Each row here is one fee for one offence over one validity period. The
 * exclusion constraint is what makes it trustworthy: two rows for the same
 * offence may not have overlapping validity, enforced in the index rather than
 * by an application check that two concurrent writers can both pass.
 *
 * `btree_gist` is required because GiST cannot compare a plain integer for
 * equality on its own.
 *
 * One limit worth naming: this records when a rule was in force, not when the
 * database learned of it. A gazette published late still needs a correction,
 * and that is a second time axis this table does not carry.
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS btree_gist;');

		await queryInterface.createTable('OffenceFees', {
			offenceFeeId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			offenceId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Offences', key: 'offenceId' },
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			fee: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			score: {
				type: Sequelize.DECIMAL(4, 2),
				allowNull: false,
			},
			// Where the change came from — a gazette number, a circular. A fee
			// change is a legal act, and a row asserting one without saying on
			// whose authority is not evidence of anything.
			source: {
				type: Sequelize.STRING(120),
				allowNull: true,
			},
			validFrom: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			// NULL means "still in force". A half-open range excludes its upper
			// bound, so the day a new fee starts is never also the last day of
			// the old one.
			validTo: {
				type: Sequelize.DATEONLY,
				allowNull: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
		});

		// A generated range column so the constraint has something to exclude
		// on, kept in step with the two date columns by the database rather
		// than by whoever writes the next INSERT.
		await queryInterface.sequelize.query(`
			ALTER TABLE "OffenceFees"
			ADD COLUMN valid daterange
			GENERATED ALWAYS AS (daterange("validFrom", "validTo", '[)')) STORED;
		`);

		await queryInterface.sequelize.query(`
			ALTER TABLE "OffenceFees"
			ADD CONSTRAINT offence_fees_no_overlap
			EXCLUDE USING gist ("offenceId" WITH =, valid WITH &&);
		`);

		// Every existing offence keeps its current fee, open-ended and dated
		// from the beginning of time — the honest statement, since the old
		// schema never recorded when any of them started.
		await queryInterface.sequelize.query(`
			INSERT INTO "OffenceFees" ("offenceId", fee, score, source, "validFrom", "validTo", "createdAt", "updatedAt")
			SELECT "offenceId", fee, score, 'migrated from Offences.fee', DATE '1970-01-01', NULL, NOW(), NOW()
			FROM "Offences";
		`);
	},

	async down(queryInterface) {
		await queryInterface.dropTable('OffenceFees');
	},
};
