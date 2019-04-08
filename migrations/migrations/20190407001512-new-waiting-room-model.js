'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.createTable(
          'WaitingRooms',
          {
            id: {
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
              type: Sequelize.INTEGER
            },
            patientId: {
              allowNull: false,
              type: Sequelize.INTEGER
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          },
          { transaction: t }
        )
      ])
    ),
  down: queryInterface =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([queryInterface.dropTable('WaitingRooms', { transaction: t })])
    )
};
