'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.addColumn(
          'Patients',
          'type',
          {
            type: Sequelize.STRING
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'Patients',
          'clinicHistoryNumber',
          {
            type: Sequelize.INTEGER
          },
          { transaction: t }
        )
      ])
    ),
  down: queryInterface =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.removeColumn('Patients', 'type', { transaction: t }),
        queryInterface.removeColumn('Patients', 'clinicHistoryNumber', { transaction: t })
      ])
    )
};
