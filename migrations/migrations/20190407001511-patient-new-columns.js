'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.addColumn(
          'Patients',
          'yearsSmoker',
          {
            type: Sequelize.INTEGER
          },
          { transaction: t }
        )
      ])
    ),
  down: queryInterface =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([queryInterface.removeColumn('Patients', 'yearsSmoker', { transaction: t })])
    )
};
