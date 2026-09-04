'use strict';

/**
 * Record what each offence cost on the fine itself.
 *
 * OffenceRecords linked a fine to an offence and nothing more, so the
 * per-offence breakdown of a fine could only be reconstructed by joining to
 * the current fee — which changes. FineRecords.totalFine preserved the total,
 * but not what any individual offence contributed to it.
 *
 * Backfilled from the fee in force on the fine's own date, which is exactly
 * the query the new OffenceFees table exists to make answerable.
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('OffenceRecords', 'feeAtIssue', {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: true,
		});
		await queryInterface.addColumn('OffenceRecords', 'scoreAtIssue', {
			type: Sequelize.DECIMAL(4, 2),
			allowNull: true,
		});

		await queryInterface.sequelize.query(`
			UPDATE "OffenceRecords" AS orec
			SET "feeAtIssue" = f.fee, "scoreAtIssue" = f.score
			FROM "FineRecords" AS fr, "OffenceFees" AS f
			WHERE orec."fineId" = fr."fineId"
			  AND f."offenceId" = orec."offenceId"
			  AND f.valid @> fr."fineDate"::date;
		`);

		// Any row the join missed — a fine predating every fee row — falls back
		// to the offence's current fee rather than being left null.
		await queryInterface.sequelize.query(`
			UPDATE "OffenceRecords" AS orec
			SET "feeAtIssue" = o.fee, "scoreAtIssue" = o.score
			FROM "Offences" AS o
			WHERE orec."offenceId" = o."offenceId"
			  AND orec."feeAtIssue" IS NULL;
		`);

		// Only now can they be NOT NULL: a fine without a recorded amount is
		// the thing this migration exists to prevent.
		await queryInterface.changeColumn('OffenceRecords', 'feeAtIssue', {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		});
		await queryInterface.changeColumn('OffenceRecords', 'scoreAtIssue', {
			type: Sequelize.DECIMAL(4, 2),
			allowNull: false,
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn('OffenceRecords', 'feeAtIssue');
		await queryInterface.removeColumn('OffenceRecords', 'scoreAtIssue');
	},
};
