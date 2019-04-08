'use strict';

const { MEDICAL_CONSULTATION_TYPES, MEDICAL_CONSULTATION_STATES } = require('../../config/constants');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.createTable(
          'Hospitals',
          {
            id: {
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
              type: Sequelize.INTEGER
            },
            name: {
              allowNull: true,
              type: Sequelize.STRING
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
        ),
        queryInterface.createTable(
          'MedicalConsultations',
          {
            id: {
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
              type: Sequelize.INTEGER
            },
            hospitalId: {
              allowNull: false,
              type: Sequelize.INTEGER,
              references: {
                model: 'Hospitals',
                key: 'id'
              }
            },
            consultationType: {
              allowNull: false,
              type: Sequelize.STRING,
              validate: { isIn: [MEDICAL_CONSULTATION_TYPES] }
            },
            patientsQuantity: {
              type: Sequelize.INTEGER
            },
            doctorName: {
              allowNull: false,
              type: Sequelize.STRING
            },
            state: {
              allowNull: false,
              type: Sequelize.STRING,
              validate: { isIn: [MEDICAL_CONSULTATION_STATES] }
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
        ),
        queryInterface.createTable(
          'Patients',
          {
            id: {
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
              type: Sequelize.INTEGER
            },
            name: {
              allowNull: false,
              type: Sequelize.STRING
            },
            age: {
              allowNull: false,
              type: Sequelize.INTEGER
            },
            isSmoker: {
              type: Sequelize.BOOLEAN
            },
            hasDiet: {
              type: Sequelize.BOOLEAN
            },
            weightHeightRelation: {
              type: Sequelize.INTEGER
            },
            risk: {
              type: Sequelize.INTEGER
            },
            priority: {
              type: Sequelize.INTEGER
            },
            attentionState: {
              type: Sequelize.STRING
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
      Promise.all([
        queryInterface.dropTable('MedicalConsultants', { transaction: t }),
        queryInterface.dropTable('Hospitals', { transaction: t }),
        queryInterface.dropTable('Patients', { transaction: t })
      ])
    )
};
