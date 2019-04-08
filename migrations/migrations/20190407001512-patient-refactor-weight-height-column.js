'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.removeColumn('Patients', 'weightHeightRelation', { transaction: t }),
        queryInterface.addColumn(
          'Patients',
          'weight',
          {
            type: Sequelize.INTEGER
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'Patients',
          'height',
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
        queryInterface.removeColumn('Patients', 'weight', { transaction: t }),
        queryInterface.removeColumn('Patients', 'height', { transaction: t })
      ])
    )
};
